import _ from 'lodash';

import Local from './Local';

const key = 'pallium';
const local = new Local();

export function remember(store) {
  return next => action => {
    const result = next(action);
    if (action.type.startsWith('projects.')) {
      try {
        const state = store.getState();
        local.set(key, {projectList: state.projectList});
        console.log('Saved project list to local storage', key, state.projectList);
      } catch (e) {
        console.error("Error saving state to local storage", e);
      }
    }
    return result;
  }
}

export function recall(state) {
  const recalled = local.get(key)
  const newState = Object.assign({}, state, recalled);
  console.log('Merged state with local storage', state, recalled, newState);
  return newState;
}
