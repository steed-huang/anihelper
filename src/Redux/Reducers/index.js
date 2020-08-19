import weeklyScheduleReducer from "./weeklySchedule";
import userNameReducer from "./userName";
import showLoginReducer from "./showLogin";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  name: userNameReducer,
  tool: weeklyScheduleReducer,
  login: showLoginReducer,
});

export default allReducers;
