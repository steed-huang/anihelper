import currentToolReducer from "./currentTool";
import userNameReducer from "./userName";
import showLoginReducer from "./showLogin";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  name: userNameReducer,
  tool: currentToolReducer,
  login: showLoginReducer,
});

export default allReducers;
