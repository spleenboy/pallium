import * as Actions from './ContentActions';

const methods = {};

methods[Actions.SET_CONTENT] = function(state, action) {
  state.content = action.content;
  return state;
}

methods[Actions.CLEAR_CONTENT] = function(state, action) {
  state.content = null;
  return state;
}

export default methods;
