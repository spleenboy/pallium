import path from 'path';
import fs from 'fs-extra';

import * as Toast from  '../../toast/ToastActions';
import Content from '../content/Content';
import Transport from '../../storage/Transport';

export const SAVE_CONTENT = 'save.content';
export const SET_CONTENT_LIST = 'set.contentList';


export function contentListIndexPath(project, contentType) {
  let filename = `${contentType.handle}.index.json`;
  return path.join(project.path, project.indexDirectory, filename);
}


/**
 * Here we go. This method Saves the content and updates the content list index
**/
export function saveContent(project, contentType, data, id) {
  return dispatch => {
    const content = new Content(contentType, data, id);
    const savepath = content.fullpath(project.path, project.directory);
    const contentData = content.toJson();

    contentData.path = savepath;
    delete contentData['values'];

    // Update content list first
    const contentList = contentType.contentList;
    const contentListIndex = contentList.findIndex(c => c.id === content.id);
    const oldContentData = contentListIndex >= 0 ? contentList[contentListIndex] : null;
    if (contentListIndex < 0) {
      contentList.push(contentData);
    } else {
      contentList[contentListIndex] = contentData;
    }
    dispatch(saveContentList(contentList));

    // Save the content
    const transport = new Transport(contentType.storage.format, contentType.storage.contentKey);
    const output = transport.export(data);
    if (oldContentData && oldContentData.path !== savepath) {
      // The file moved
      fs.unlink(oldContentData.path);
    }
    fs.outputFile(savepath, output, err => {
      dispatch(Toast.error(err, "Error saving content"));
    });
}


export function saveContentList(project, contentType) {
  let indexpath = contentListIndexPath(project, contentType);
  return dispatch => {
    fs.outputJson(indexpath, contentType.contentList || []);
    dispatch(setContentList(contentType.contentList));
  }
}


export function setContentList(contentList) {
  return {
    type: SET_CONTENT_LIST,
    contentList
  };
}


export function loadContentList(project, contentType) {
  let indexpath = contentListIndexPath(project, contentType);
  return dispatch => {
    fs.ensureFile(indexpath, err => {
      if (err) {
        return;
      }
      fs.readJson(indexpath, (err, data) => {
        if (err) {
          return;
        }
        dispatch(setContentList(data));
      });
    });
  };
}
