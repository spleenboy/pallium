import Transport from '../storage/Transport';
import fs from 'fs-extra';

export const OPEN_PROJECT = 'open.project';
export const OPENED_PROJECT = 'opened.project';
export const CLONE_PROJECT = 'clone.project';

export function error(e) {
  console.error(e);
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

    const Toast = require('../toast/ToastActions');
    const ProjectList = require('./ProjectListActions');

    dispatch(Toast.thinking(true));
    fs.readJson(path, (err, project) => {

      dispatch(Toast.thinking(false));

      if (!err) {
        dispatch(opened(project));
        dispatch(ProjectList.add(project, path));
      } else {
        dispatch(Toast.error(err));
      }
    });
  }
}

// Downloads a project from a git remote
export function clone(path) {
  return {
    type: CLONE_PROJECT,
    path,
  }
}
