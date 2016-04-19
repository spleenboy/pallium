export const SAVE = 'projects.save';
export const LOAD = 'projects.load';
export const ADD = 'projects.add';
export const REMOVE = 'projects.remove';

export function load() {
  return {
    type: LOAD,
  }
}

export function add(project, path) {
  return {
    type: ADD,
    project,
    path
  }
}

export function remove(project) {
  return {
    type: REMOVE,
    project,
    path
  }
}
