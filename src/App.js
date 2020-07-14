import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Root, ProjectList } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route path="/projects" component={ProjectList} />
      </Switch>
    </Router>
  );
}

export default App;
