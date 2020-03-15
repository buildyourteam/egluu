import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  NotFound,
  RootPage,
  ProjectPage,
  PeoplePage,
  ProjectPageDetail,
  PeoplePageDetail,
  MakeProject,
  MakeProfile,
  LoginPage,
  RegisterPage
} from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RootPage} />
        <Route path="/projects/:projectId" component={ProjectPageDetail} />
        <Route path="/profile/:userId" component={PeoplePageDetail} />
        <Route exact path="/project" component={ProjectPage} />
        <Route exact path="/people" component={PeoplePage} />
        <Route exact path="/makeproject" component={MakeProject} />
        <Route exact path="/makeprofile" component={MakeProfile} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
