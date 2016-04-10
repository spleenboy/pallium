import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as reducers from '.';

reducers.routing = routing;
export default combineReducers(reducers);
