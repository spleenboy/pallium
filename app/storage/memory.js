import _ from 'lodash';

import Local from './Local';

const key = 'pallium';
const local = new Local();

export function remember(store) {
  return next => action => {
    const result = next(action);
    if (action.type.startsWith('projects.')) {
      local.set([key, 'projectList'], result);
      console.log('Saved project list to localStorage', key, result);
    }
    return result;
  }
}

export function recall(state) {
  const recalled = local.get(key)
  const newState = Object.assign({}, state, recalled);
  console.log('Merged state with localStorage', state, recalled, newState);
  return newState;
}
