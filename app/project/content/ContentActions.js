const {shell} = require('electron');

import fs from 'fs-extra';
import path from 'path';

import * as ToastActions from  '../../toast/ToastActions';

import Transport, { ENCODING } from '../../storage/Transport';
import ContentIndex from './ContentIndex';
import Content from './Content';
import prune from '../../storage/prune';

export const SET_CONTENT = 'set.content';
export const UPDATE_CONTENT = 'update.content';
export const CLEAR_CONTENT = 'clear.content';
export const TRASH_CONTENT = 'trash.content';
export const RESTORE_CONTENT = 'restore.content';

export const SET_CONTENT_TYPE = 'set.contentType';
export const CLEAR_CONTENT_TYPE = 'clear.contentType';
export const SET_CONTENT_LIST = 'set.contentList';


export function updateContent(key, value) {
  return {
    type: UPDATE_CONTENT,
    key, value
  }
}


export function setContent(project, data, _id = null) {
  const content = new Content(project, data, _id);
  return {
    type: SET_CONTENT,
    content: content.toJson(),
  };
}


export function createContent(project) {
  const content = new Content(project);
  return {
    type: SET_CONTENT,
    content: content.toJson(),
  }
}


export function restoreContent(_id) {
  return {
    type: RESTORE_CONTENT,
    _id
  }
}


export function deleteContent(project, data, _id) {
  return dispatch => {
    const content = new Content(project, data, _id);
    const index = new ContentIndex(project);

    index.remove(_id)
    .then(num => {
      process.nextTick(() => {
        fs.access(content.fullpath, fs.W_OK, (err) => {
          !err && shell.moveItemToTrash(content.fullpath);
        });
        prune(project.path);
      });

      dispatch(trashContent(project, data, _id));
      dispatch(loadList(project, project.contentType.settings.handle));

      const undo = function() {
        dispatch(restoreContent(_id));
      }

      dispatch(ToastActions.confirm(
        "Deleted",
        `"${content.title}" has been deleted.`,
        {"Undo": undo}
      ));
    });
  }
}


export function openContent(project, fullpath, _id) {
  return dispatch => {
    dispatch(ToastActions.thinking(true));
    const transport = new Transport(
      project.contentType.storage.format,
      project.contentType.storage.contentKey
    );

    fs.readFile(fullpath, ENCODING, (err, data) => {
      dispatch(ToastActions.thinking(false));
      const values = transport.import(data);
      dispatch(setContent(project, values, _id));
    });
  }
}


export function trashContent(project, data, _id) {
  const content = new Content(project, data, _id);
  return {
    type: TRASH_CONTENT,
    content: content.toJson(),
  }
}


export function clearContent() {
  return {
    type: CLEAR_CONTENT,
  };
}

/**
 * Here we go. This method saves content to the content list index
**/
export function saveContent(project, data, _id = null) {
  return dispatch => {
    const index = new ContentIndex(project);
    const content = new Content(project, data, _id);
    const contentType = project.contentType;
    const contentData = content.toJson();

    // Save the index
    index.save(contentData)
    .then(({doc, oldDoc}) => {

      // Delete the old file
      if (oldDoc && oldDoc.fullpath !== doc.fullpath) {
        fs.unlink(oldDoc.fullpath);
      }

      dispatch(loadList(project, doc.contentType));

      // Save the new content file
      const transport = new Transport(contentType.storage.format, contentType.storage.contentKey);
      const output = transport.export(data);

      fs.outputFile(doc.fullpath, output, err => {
        if (err) {
          dispatch(ToastActions.error(err, "Error saving content"));
        }
      });
    });
  };
}


export function setList(contentList) {
  return {
    type: SET_CONTENT_LIST,
    contentList
  };
}


export function loadList(project, handle) {
  return dispatch => {
    const index = new ContentIndex(project);
    index.find({
      contentType: handle
    })
    .then(docs => {
      dispatch(setList(docs));

      const single = !project.contentType.settings.plural;

      // If there's no plural for the content type, select the first item
      // or create a new one.
      if (single && docs.length) {
        dispatch(openContent(project, docs[0].fullpath, docs[0]._id));
      } else if (single) {
        dispatch(createContent(project));
      }
    });
  }
}


export function clearContentType() {
  return {
    type: CLEAR_CONTENT_TYPE
  };
}


export function setContentType(contentType) {
  return {
    type: SET_CONTENT_TYPE,
    contentType,
  }
}

export function selectContentType(project, handle) {
  const contentType = project.contentTypes.find(ct => ct.settings.handle === handle);
  return dispatch => {
    project.contentType = contentType;
    dispatch(setContentType(contentType));
    dispatch(loadList(project, handle));
  };
}
