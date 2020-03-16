import { combineReducers } from "redux";
import sensor from "./sensor";
import user from "./user";

const appReducer = combineReducers({
  sensor,
  user
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
