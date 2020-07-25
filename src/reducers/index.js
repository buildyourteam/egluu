import { combineReducers } from 'redux';
import temporaryRedux from './temporary'
import loginRedux from './login'
import projectRedux from './project'

export default combineReducers({
    temproray: temporaryRedux,
    login: loginRedux,
    project: projectRedux
});