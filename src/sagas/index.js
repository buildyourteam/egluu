import { all } from "redux-saga/effects";
import Root from "./Root";
import ProjectDetail from "./ProjectDetail";
import PeopleDetail from "./PeopleDetail";
import ProjectList from "./ProjectList";
import PeopleList from "./PeopleList";
import MakeProject from "./MakeProejct";
import MakeProfile from "./MakeProfile";
import Login from "./Login";

export default function* rootSaga() {
  yield all([
    Root(),
    ProjectDetail(),
    PeopleDetail(),
    ProjectList(),
    PeopleList(),
    MakeProject(),
    Login()
  ]);
}
