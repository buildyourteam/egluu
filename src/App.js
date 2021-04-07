import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Root,
  ProjectList,
  Profile,
  Register,
  Login,
  ProjectDetail,
  ProjectCreate,
  ProjectUpdate,
  PeopleList,
  LoginPage,
  RegisterPage,
} from "./pages";
import { AlertModal } from "./components";
import { useLoginAuth } from "./hook/auth/useLogin";
import "antd/dist/antd.css";

function App() {
  useLoginAuth();
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route exact path="/" component={Root} />
        {/* <Route exact path="/" component={Root} />
        <Route path="/projects" component={ProjectList} />
        <Route path="/peoples" component={PeopleList} />
        <Route path="/createProject" component={ProjectCreate} />
        <Route path="/projectDetail/:id" component={ProjectDetail} />
        <Route path="/projectUpdate/:id" component={ProjectUpdate} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:userId" component={Profile} /> */}
      </Switch>
      <AlertModal />
    </Router>
  );
}

export default App;
