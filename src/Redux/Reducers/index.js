import weeklyScheduleReducer from "./weeklySchedule";
import userNameReducer from "./userName";
import userDataReducer from "./userData";
import showLoginReducer from "./showLogin";
import recReducer from "./recommendations";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  name: userNameReducer,
  userdata: userDataReducer,
  schedule: weeklyScheduleReducer,
  login: showLoginReducer,
  recommend: recReducer,
});

export default allReducers;
