import currentToolReducer from "./currentTool";
import { combineReducers } from "redux";

const allReducers = combineReducers({ tool: currentToolReducer });

export default allReducers;
