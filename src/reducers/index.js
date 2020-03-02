import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Project from './Project';
import People from './People';
import Link from './Link';

const PersistConfigProject = {
  key: 'Project',
  storage,
  whitelist: [''], // only navigation will be persisted
};

const PersistConfigPeople = {
  key: 'People',
  storage,
  whitelist: [''], // only navigation will be persisted
};

const PersistConfigLink = {
  key: 'Link',
  storage,
  whitelist: ['link'], // only navigation will be persisted
};

export default combineReducers({
  Project: persistReducer(PersistConfigProject, Project),
  People: persistReducer(PersistConfigPeople, People),
  Link: persistReducer(PersistConfigLink, Link),
});
