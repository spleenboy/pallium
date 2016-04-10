import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import projectReducer from '../project/projectReducer';

const reducers = {
  routing,
  projectReducer,
};
export default combineReducers(reducers);
