import _ from 'lodash';
import ProjectListActions from '../project/ProjectListActions';

export const key = 'pallium';

export function remember(store) {
  return next => action => {
    const result = next(action);
    if (action.type.startsWith('projects.')) {
      localStorage[key] = Object.assign(
        localStorage[key] || {},
        {'projectList': result}
      );
      console.log('Saved project list to localStorage', key, result);
    }
    return result;
  }
}

export function recall(state) {
  const recalled = JSON.parse(localStorage[key] || "{}");
  const newState = Object.assign({}, state, recalled);
  console.log('Merged state with localStorage', state, recalled, newState);
  return newState;
}
