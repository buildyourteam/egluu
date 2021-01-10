import { combineReducers } from "redux";
import temporaryRedux from "./temporary";
import loginRedux from "./login";
import profileRedux from "./profile";
import projectRedux from "./project";
import alertRedux from "./alert";

const rootReducer = combineReducers({
  temproray: temporaryRedux,
  login: loginRedux,
  profile: profileRedux,
  project: projectRedux,
  alert: alertRedux,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
