import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  NotFound,
  BasicPage,
  ProjectPage,
  PeoplePage,
  ProjectPageDetail
} from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BasicPage} />
        <Route path="/project/:projectId" component={ProjectPageDetail} />
        <Route exact path="/project" component={ProjectPage} />
        <Route exact path="/people" component={PeoplePage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
