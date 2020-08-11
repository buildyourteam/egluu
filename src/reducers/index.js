
import { combineReducers } from "redux";
import temporaryRedux from "./temporary";
import loginRedux from "./login";
import profileRedux from "./profile";
import projectRedux from './project'

export default combineReducers({
  temproray: temporaryRedux,
  login: loginRedux,
  profile: profileRedux,
  project: projectRedux
});
