import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import {
//   Root,
//   ProjectList,
//   Profile,
//   ProjectDetail,
//   ProjectCreate,
//   ProjectUpdate,
//   PeopleList,
//   LoginPage,
//   RegisterPage,
// } from "./pages";
import { AlertModal } from "./components";
import { useLoginAuth } from "./hook/auth/useLogin";
import "antd/dist/antd.css";

const Root = lazy(() => import("./pages/rootTs"));
const ProjectList = lazy(() => import("./pages/project/projectListTs"));
const ProjectDetail = lazy(() => import("./pages/project/projectDetailTs"));
const ProjectCreate = lazy(() => import("./pages/project/createProjectTs"));
const ProjectUpdate = lazy(() => import("./pages/project/updateProjectTs"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterTs"));
const Profile = lazy(() => import("./pages/Profile"));
const LoginPage = lazy(() => import("./pages/auth/LoginTs"));
const PeopleList = lazy(() => import("./pages/PeopleList"));

function App() {
  useLoginAuth();
  return (
    <Router basename={"/egluu"}>
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "0",
              paddingBottom: "75",
              position: "relative",
            }}
          >
            <iframe
              src="https://giphy.com/embed/hWZBZjMMuMl7sWe0x8"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        }
      >
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/" component={Root} />
          <Route path="/projects" component={ProjectList} />
          <Route path="/createProject" component={ProjectCreate} />
          <Route path="/projectDetail/:id" component={ProjectDetail} />
          <Route path="/projectUpdate/:id" component={ProjectUpdate} />
          <Route path="/peoples" component={PeopleList} />
          <Route path="/profile/:userId" component={Profile} />
        </Switch>
        <AlertModal />
      </Suspense>
    </Router>
  );
}

export default App;
