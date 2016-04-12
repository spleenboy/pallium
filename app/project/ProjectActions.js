export const OPEN_PROJECT = 'open.project';
export const CLONE_PROJECT = 'clone.project';

// Opens a project from the file system
export function open(path) {
  return {
    type: OPEN_PROJECT,
    path,
  }
}

// Downloads a project from a git remote
export function clone(path) {
  return {
    type: CLONE_PROJECT,
    path,
  }
}
