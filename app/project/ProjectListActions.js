export const LOAD = 'projects.load';
export const ADD = 'projects.add';
export const REMOVE = 'projects.remove';

export function load(projectList) {
  return {
    type: LOAD,
    projectList
  }
}

export function add(project, path) {
  return {
    type: ADD,
    project,
    path
  }
}

export function remove(project, path) {
  return {
    type: REMOVE,
    project,
    path
  }
}
