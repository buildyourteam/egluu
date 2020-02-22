import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  NotFound,
  RootPage,
  ProjectPage,
  PeoplePage,
  ProjectPageDetail,
  PeoplePageDetail,
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RootPage} />
        <Route path="/project/:projectId" component={ProjectPageDetail} />
        <Route path="/people/:userId" component={PeoplePageDetail} />
        <Route exact path="/project" component={ProjectPage} />
        <Route exact path="/people" component={PeoplePage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
