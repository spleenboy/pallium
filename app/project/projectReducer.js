import * as Actions from './ProjectActions';
const initialState = false;
const methods = {};

methods[Actions.OPEN] = function(state, action) {

}

methods[Actions.CLONE] = function(state, action) {

}

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    return methods[action.type](state, action);
  }
  return state;
}
