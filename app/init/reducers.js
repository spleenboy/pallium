import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import projectList from '../project/projectListReducer';
import project from '../project/projectReducer';

const reducers = {
  routing,
  projectList,
  project,
};

export default combineReducers(reducers);
