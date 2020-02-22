import { all } from 'redux-saga/effects';
import Root from './Root';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import PeopelInfoDetail from './Peopel';
import PeopleInfoList from './PeopleInfoList';

export default function* rootSaga() {
  yield all([Root()]);
  yield all([ProjectList()]);
  yield all([ProjectDetail()]);
  yield all([PeopelInfoDetail()]);
  yield all([PeopleInfoList()]);
}
