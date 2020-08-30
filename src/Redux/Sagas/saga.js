import { takeLatest, select, delay, race, put, call, all } from "redux-saga/effects";
import {
  toggleLogin,
  requestUpdateName,
  requestUpdateNameSuccess,
  requestUpdateNameError,
  requestUpdateSchedule,
  requestUpdateScheduleSuccess,
  requestUpdateScheduleError,
  requestUpdateAnimeList,
  requestUpdateAnimeListSuccess,
  requestUpdateAnimeListError,
} from "../Actions";

// state selectors
const weeklySchedule = (state) => state.schedule;
const userData = (state) => state.userdata;
const userName = (state) => state.name.username;

function* updateNameAsync(action) {
  try {
    yield put(requestUpdateName());

    // api call | if the username is not valid throw error (10s timeout)
    yield race({
      user: fetch("https://api.jikan.moe/v3/user/" + action.payload).then((res) => {
        if (!res.ok) throw new Error();
      }),
      timeout: delay(10000),
    });

    // successful action, close popup
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
    const userNameState = yield select(userName);

    // fail request if there is no username
    if (!userNameState) {
      throw new Error();
    } else {
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
    }
  } catch (e) {
    // unsuccessful
    yield put(requestUpdateAnimeListError());
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
  ]);
}

export default watchAll;
