import Transport from '../storage/Transport';
import fs from 'fs-extra';
import _ from 'lodash';

import traverse from '../util/traverse';

export const OPEN_PROJECT = 'project.open';
export const OPENED_PROJECT = 'project.opened';
export const CLONE_PROJECT = 'project.clone';
export const CLEAR_PROJECT = 'project.clear';

export function error(e) {
  console.error(e);
}

export function clear() {
  return {
    type: CLEAR_PROJECT
  };
}

export function opened(project) {
  return {
    type: OPENED_PROJECT,
    project,
  }
}

// Replaces {"reference": "referenceId"} values
// with the specified reference
function dereference(project) {
  if (!project.references) {
    return project;
  }

  const copy = Object.assign({}, project);
  const refs = copy.references;

  traverse(project, (val, keyPath) => {
    const refId = val && val.reference;
    if (refId && refId in refs) {
      _.set(copy, keyPath, _.clone(refs[refId]));
    }
  });

  return copy;
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
        project.path = path;
        project = dereference(project);
        dispatch(opened(project));
        dispatch(ProjectList.add(project, path));
      } else {
        dispatch(Toast.error("File Error", "There's a problem with your project file: " + err.message, err));
        dispatch(ProjectList.remove(project, path));
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
