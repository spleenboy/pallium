import * as Actions from './ContentTypeActions';

const methods = {};

methods[Actions.SET_CONTENT_LIST] = function(state, action) {
  state.contentType.contentList = action.contentList;
  return state;
}

methods[Actions.CLEAR_CONTENT_TYPE] = function(state, action) {
  state.contentType = null;
  return state;
}

methods[Actions.SELECT_CONTENT_TYPE] = function(state, action) {
  state.contentType = state.contentTypes.find(ct => ct.settings.handle === action.handle);
  return state;
}

export default methods;
