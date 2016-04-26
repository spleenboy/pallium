import * as Actions from './ProjectActions';
import ContentReducerMethods from './content/ContentReducerMethods.js';

const initialState = false;
const methods = {};

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    const result = Object.assign({}, state);
    return methods[action.type](result, action);
  }
  return state;
}

Object.assign(methods, ContentReducerMethods);

methods[Actions.CLEAR_PROJECT] = function(state, action) {
  return initialState;
}

methods[Actions.OPENED_PROJECT] = function(state, action) {
  return action.project;
}

methods[Actions.OPEN_PROJECT] = function(state, action) {
  return Object.assign({}, state);
}

methods[Actions.CLONE_PROJECT] = function(state, action) {
  return Object.assign({}, state);
}
