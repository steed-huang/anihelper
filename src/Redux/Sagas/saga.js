import { takeLatest, put, call } from "redux-saga/effects";
import {
  toggleLogin,
  requestUpdateName,
  requestUpdateNameSuccess,
  requestUpdateNameError,
} from "../Actions";

function* updateNameAsync(action) {
  try {
    yield put(requestUpdateName());

    // api call | if the username is not valid throw error
    yield call(() => {
      return fetch("https://api.jikan.moe/v3/user/" + action.payload).then((res) => {
        if (!res.ok) throw new Error();
      });
    });

    // otherwise complete action and close popup
    yield put(requestUpdateNameSuccess(action.payload));
    yield put(toggleLogin());
  } catch (e) {
    yield put(requestUpdateNameError());
  }
}

export function* watchUpdateName() {
  yield takeLatest("FETCH_UPDATENAME", updateNameAsync);
}
