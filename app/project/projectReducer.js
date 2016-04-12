import * as Actions from './ProjectActions';
import ContentTypeReducerMethods from './ContentTypeReducerMethods.js'

const initialState = false;
const methods = {};

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    return methods[action.type](state, action);
  }
  return state;
}

Object.assign(methods, ContentTypeReducerMethods);

methods[Actions.OPEN_PROJECT] = function(state, action) {

}

methods[Actions.CLONE_PROJECT] = function(state, action) {

}
