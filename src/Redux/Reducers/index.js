import weeklyScheduleReducer from "./weeklySchedule";
import userNameReducer from "./userName";
import userDataReducer from "./userData";
import showLoginReducer from "./showLogin";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  name: userNameReducer,
  userdata: userDataReducer,
  schedule: weeklyScheduleReducer,
  login: showLoginReducer,
});

export default allReducers;
