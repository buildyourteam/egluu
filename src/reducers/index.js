import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Default from "./Default";
import Project from "./Project";
import People from "./People";

const PersistConfig = {
  key: "Default",
  storage,
  whitelist: [""] // only navigation will be persisted
};

const PersistConfigProject = {
  key: "Project",
  storage,
  whitelist: [""] // only navigation will be persisted
};

const PersistConfigPeople = {
  key: "People",
  storage,
  whitelist: [""] // only navigation will be persisted
};

export default combineReducers({
  Default: persistReducer(PersistConfig, Default),
  Project: persistReducer(PersistConfigProject, Project),
  People: persistReducer(PersistConfigPeople, People)
});
