import { takeLatest, select, put, call, all } from "redux-saga/effects";
import {
  toggleLogin,
  requestUpdateName,
  requestUpdateNameSuccess,
  requestUpdateNameError,
  requestUpdateSchedule,
  requestUpdateScheduleSuccess,
  requestUpdateScheduleError,
} from "../Actions";

// state selectors
const weeklySchedule = (state) => state.schedule;

function* updateNameAsync(action) {
  try {
    yield put(requestUpdateName());

    // api call | if the username is not valid throw error
    yield call(() => {
      return fetch("https://api.jikan.moe/v3/user/" + action.payload).then((res) => {
        if (!res.ok) throw new Error();
      });
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

      // api call to get schedule for week
      const week_schedule = yield fetch("https://api.jikan.moe/v3/schedule").then((res) =>
        res.json()
      );

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
    }
  } catch (e) {
    // unsuccessful
    yield put(requestUpdateScheduleError());
  }
}

function* watchAll() {
  yield all([
    // watch updatename
    takeLatest("FETCH_UPDATENAME", updateNameAsync),

    // watch updateschedule
    takeLatest("FETCH_UPDATESCHEDULE", updateScheduleAsync),
  ]);
}

export default watchAll;
