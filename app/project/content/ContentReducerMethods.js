import * as Actions from './ContentActions';
import Content from './Content';

const methods = {};

methods[Actions.CREATE_CONTENT] = function(state, action) {
  state.content = new Content(action.contentType);
  return state;
}

methods[Actions.OPENED_CONTENT] = function(state, action) {
  state.content = new Content(action.contentType, action.data);
  return state;
}

methods[Actions.CLEAR_CONTENT] = function(state, action) {
  state.content = null;
  return state;
}
