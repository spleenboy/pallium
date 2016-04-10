import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import project from '../project/projectReducer';

const reducers = {
  routing,
  project,
};

export default combineReducers(reducers);
