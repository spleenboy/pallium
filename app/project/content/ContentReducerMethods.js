import * as Actions from './ContentActions';

const methods = {};

methods[Actions.SET_CONTENT] = function(state, action) {
  state.contentType.content = action.content;
  return state;
}

methods[Actions.CLEAR_CONTENT] = function(state, action) {
  state.contentType.content = null;
  return state;
}

methods[Actions.SET_CONTENT_LIST] = function(state, action) {
  state.contentType.contentList = action.contentList;
  return state;
}

methods[Actions.CLEAR_CONTENT_TYPE] = function(state, action) {
  state.contentType = null;
  return state;
}

methods[Actions.SET_CONTENT_TYPE] = function(state, action) {
  state.contentType = action.contentType
  return state;
}

export default methods;
