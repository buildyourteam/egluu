import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Root, ProjectList, Profile, Register, Login, ProjectDetail, CreateProject } from "./pages";
import { useLoginAuth } from './hook/auth/useLogin';

function App() {
  useLoginAuth();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route path="/projects" component={ProjectList} />
        <Route path='/createProject' component={CreateProject} />
        <Route path='/projectDetail/:id' component={ProjectDetail} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
