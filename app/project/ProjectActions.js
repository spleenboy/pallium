export const OPEN_PROJECT = 'open.project';
export const OPENED_PROJECT = 'opened.project';
export const CLONE_PROJECT = 'clone.project';
export const THINK = 'think';

export function thinking(done = true) {
  return {
    type: THINK,
    done,
  };
}

export function opened(project) {
  return {
    type: OPENED_PROJECT,
    project,
  }
}

// Opens a project from the file system
export function open(path) {
  return (dispatch) => {
    // @todo: call a file opener... Read the file then call 'opened' with data
    dispatch(thinking(false));
    dispatch(opened({}));
  }
}

// Downloads a project from a git remote
export function clone(path) {
  return {
    type: CLONE_PROJECT,
    path,
  }
}
