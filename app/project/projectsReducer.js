import Actions from './ProjectsActions';
const initialState = [];
const methods = {};

methods[Actions.OPEN] = function(state, action) {
  return [];
}

export function handle(state = initialState, action) {
  if (action.type in methods) {
    return methods[action.type](state, action);
  }
  return state;
}
