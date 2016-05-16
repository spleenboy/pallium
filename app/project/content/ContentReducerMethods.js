import * as Actions from './ContentActions';
import Content from './Content';

const methods = {};

methods[Actions.SET_SEARCH_QUERY] = function(state, action) {
  state.query = action.query;
  return state;
}

methods[Actions.SET_SEARCH_RESULTS] = function(state, action) {
  state.queryResults = action.results;
  return state;
}

methods[Actions.SET_CONTENT] = function(state, action) {
  state.contentType.content = action.content;
  return state;
}

methods[Actions.UPDATE_CONTENT] = function(state, action) {
  const project = state;
  const contentValues = project.contentType.content.values;
  const _id = project.contentType.content._id;

  contentValues[action.key] = action.value;

  const content = new Content(project, contentValues, _id);
  content.dirty = true;

  state.contentType.content = content.toJson();

  return state;
}

methods[Actions.TRASH_CONTENT] = function(state, action) {
  state.contentType.content = null;

  if (!state.trash) {
    state.trash = {};
  }

  state.trash[action.content._id] = action.content;

  return state;
}

methods[Actions.RESTORE_CONTENT] = function(state, action) {
  const restored = state.trash[action._id];

  if (restored) {
    state.contentType = state.contentTypes.find(ct => ct.settings.handle === restored.contentType);
    state.contentType.content = restored;
    delete state.trash[action._id];
  }

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
