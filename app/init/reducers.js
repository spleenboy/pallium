import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import toast from '../toast/toastReducer';
import projectList from '../project/projectListReducer';
import project from '../project/projectReducer';

const reducers = {
  routing,
  toast,
  projectList,
  project,
};

export default combineReducers(reducers);
