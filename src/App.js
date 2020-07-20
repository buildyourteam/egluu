import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Root, ProjectList, Register, Login } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route path="/projects" component={ProjectList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
