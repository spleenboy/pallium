import fs from 'fs-extra';
import Transport, { ENCODING } from '../../storage/Transport';
import Content from './Content';

export const SET_CONTENT = 'set.content';
export const CLEAR_CONTENT = 'clear.content';

export function update(contentType, data) {
  const content = new Content(contentType, data);
  return {
    type: SET_CONTENT,
    content: content.toJson(),
  };
}

export function create(contentType) {
  const content = new Content(contentType);
  return {
    type: SET_CONTENT,
    content: content.toJson(),
  }
}


export function open(contentType, path) {

  const transport = new Transport(
    contentType.storage.format,
    contentType.storage.contentKey
  );

  return dispatch => {
    const Toast = require('../../toast/ToastActions');
    dispatch(Toast.thinking(true));

    fs.readFile(path, ENCODING, (err, data) => {
      dispatch(Toast.thinking(false));
      values = transport.import(data);
      dispatch(update(contentType, values));
    });
  }
}


export function clear() {
  return {
    type: CLEAR_CONTENT,
  };
}
