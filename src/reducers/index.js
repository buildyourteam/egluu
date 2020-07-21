import { combineReducers } from 'redux';
import temporaryRedux from './temporary'
import loginRedux from './login'

export default combineReducers({
    temproray: temporaryRedux,
    login: loginRedux
});