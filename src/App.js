import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Root } from './pages';

function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route path="/" component={Root} />

      </Switch>
    </Router>
    </div>
  );
}

export default App;
