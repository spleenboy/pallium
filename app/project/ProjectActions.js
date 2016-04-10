export const OPEN = 'project.open';
export const CLONE = 'project.clone';

// Opens a project from the file system
export function open(path) {
  return {
    type: OPEN,
    path,
  }
}

// Downloads a project from a git remote
export function clone(path) {
  return {
    type: CLONE,
    path,
  }
}
