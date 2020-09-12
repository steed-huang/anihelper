import { takeLatest, select, delay, race, put, call, all } from "redux-saga/effects";
import {
  toggleLogin,
  requestUpdateName,
  requestUpdateNameSuccess,
  requestUpdateNameError,
  requestUpdateFavouritesSuccess,
  requestUpdateSchedule,
  requestUpdateScheduleSuccess,
  requestUpdateScheduleError,
  requestUpdateAnimeList,
  requestUpdateAnimeListSuccess,
  requestUpdateAnimeListError,
  requestUpdateRec,
  requestUpdateRecSuccess,
  requestUpdateRecError,
  requestUpdateRecTotal,
  requestUpdateRecProgress,
} from "../Actions";

// state selectors
const weeklySchedule = (state) => state.schedule;
const userData = (state) => state.userdata;
const userName = (state) => state.name.username;

function* updateNameAsync(action) {
  try {
    yield put(requestUpdateName());

    // api call | if the username is not valid throw error (10s timeout)
    const { user_data } = yield race({
      user_data: fetch("https://api.jikan.moe/v3/user/" + action.payload).then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      }),
      timeout: delay(10000),
    });

    // successful action, close popup
    yield put(requestUpdateFavouritesSuccess(user_data.favorites.anime));
    yield put(requestUpdateNameSuccess(action.payload));
    yield put(toggleLogin());
  } catch (e) {
    // unsuccessful
    yield put(requestUpdateNameError());
  }
}

function* updateScheduleAsync() {
  try {
    const scheduleState = yield select(weeklySchedule);
    const curDate = new Date().getDay();

    // only get schedule from api if the date has changed (or first time)
    if (scheduleState.date !== curDate) {
      yield put(requestUpdateSchedule());

      // api call to get schedule for week (15s timeout)
      const { week_schedule } = yield race({
        week_schedule: fetch("https://api.jikan.moe/v3/schedule").then((res) => res.json()),
        timeout: delay(15000),
      });

      if (week_schedule) {
        // destructure days
        const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = week_schedule;

        // storing in new object (capitalized for map in sched)
        const days = {
          Sunday: sunday,
          Monday: monday,
          Tuesday: tuesday,
          Wednesday: wednesday,
          Thursday: thursday,
          Friday: friday,
          Saturday: saturday,
        };

        // successfully got schedule
        yield put(requestUpdateScheduleSuccess({ days, date: curDate }));
      } else throw new Error();
    }
  } catch (e) {
    // unsuccessful
    yield put(requestUpdateScheduleError());
  }
}

function* updateAnimeListAsync() {
  try {
    // selecting redux state
    const userNameState = yield select(userName);
    const userDataState = yield select(userData);

    // only need to fetch once (or if username has changed)
    if (
      !userDataState.watching ||
      (userDataState.username && userNameState !== userDataState.username)
    ) {
      yield put(requestUpdateAnimeList());

      // api call to get user animelist (15s timeout)
      const { list } = yield race({
        list: yield fetch(
          "https://api.jikan.moe/v3/user/" + userNameState + "/animelist"
        ).then((res) => res.json()),
        timeout: delay(15000),
      });

      if (list) {
        // arrays for completed and watched
        let watching = [];
        let completed = [];

        // sort into each array
        list.anime.forEach((anime) => {
          if (anime.watching_status === 2) {
            completed.push(anime);
          } else if (anime.watching_status === 1) {
            watching.push(anime);
          }
        });

        // successfully got animelist
        yield put(requestUpdateAnimeListSuccess({ watching, completed, userNameState }));
      } else throw new Error();
    }
  } catch (e) {
    // unsuccessful
    yield put(requestUpdateAnimeListError());
  }
}

function* updateRecAsync() {
  try {
    yield put(requestUpdateRec());

    // update user anime list if not already
    yield call(updateAnimeListAsync);

    // destructuring different lists from userdata
    const { watching, completed, favourites } = yield select(userData);

    // sort (non favourites) by highest rated (descending score)
    let all_shows = [...watching, ...completed];
    all_shows.sort((a, b) => {
      return b.score - a.score;
    });

    // slice the ids of the top ten shows
    let top_shows = all_shows.slice(0, 15);
    top_shows = top_shows.map((show) => show.mal_id);

    // add favourite shows to top shows if not already included
    favourites.forEach((show) => {
      if (!top_shows.includes(show.mal_id)) top_shows.push(show.mal_id);
    });

    // update total request count
    let fetch_count = top_shows.length;
    yield put(requestUpdateRecTotal(fetch_count));

    let recommended = [];
    // fetch the top three recommended for each top show
    for (let i = 0; i < fetch_count; i++) {
      // fetch shows recommended anime and slice top three
      const cur_rec = yield fetch(
        "https://api.jikan.moe/v3/anime/" + top_shows[i] + "/recommendations"
      )
        .then((res) => res.json())
        .then((res) => res.recommendations.slice(0, 3));

      // add fetched recommended anime to array
      recommended = [...recommended, ...cur_rec];

      // update progress
      yield put(requestUpdateRecProgress(i + 1));

      // 500ms delay to avoid rate limit :(
      yield delay(500);
    }

    // remove duplicates
    recommended = recommended.filter(
      (show, index, self) => self.findIndex((s) => s.mal_id === show.mal_id) === index
    );

    // remove if already in list of completed/watchig
    recommended = recommended.filter((show) => !all_shows.some((s) => s.mal_id === show.mal_id));

    // successful determined recommended
    yield put(requestUpdateRecSuccess(recommended));
  } catch (e) {
    // unsuccessful
    yield put(requestUpdateRecError());
  }
}

function* watchAll() {
  yield all([
    // watch updatename
    takeLatest("FETCH_UPDATENAME", updateNameAsync),

    // watch updateschedule
    takeLatest("FETCH_UPDATESCHEDULE", updateScheduleAsync),

    // watch updateanimelist
    takeLatest("FETCH_UPDATEANIMELIST", updateAnimeListAsync),

    // watch updaterecommendations
    takeLatest("FETCH_UPDATEREC", updateRecAsync),
  ]);
}

export default watchAll;
