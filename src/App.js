import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Root, ProjectDetail } from './pages';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route path='/projectDetail/:id' component={ProjectDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
