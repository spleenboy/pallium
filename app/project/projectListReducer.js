import * as Actions from './ProjectListActions';
const MAX_ITEMS = 10;
const initialState = [];
const methods = {};

methods[Actions.LOAD] = function(state, action) {
  return action.projectList || initialState;
}

methods[Actions.ADD] = function(state, action) {
  let result = state ? Array.from(state) : [];
  const existing = result.findIndex(project => project.path === action.path);

  if (existing >= 0) {
    result.splice(existing, 1);
  }

  let {title, description, icon} = action.project;

  const added = {
    title,
    description,
    icon,
    path: action.path
  };

  const deleteCount = (result.length + 1) - MAX_ITEMS;

  result.splice(0, deleteCount, added);

  return result;
}

methods[Actions.REMOVE] = function(state, action) {
  let result = state ? Array.from(state) : [];
  const existing = result.findIndex(project => project.path === action.path);

  if (existing >= 0) {
    result.splice(existing, 1);
  }

  return result;
}

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    return methods[action.type](state, action);
  }
  return state;
}
