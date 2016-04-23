import Transport, { ENCODING } from '../../storage/Transport';
import fs from 'fs-extra';

export const CREATE_CONTENT = 'create.content';
export const OPENED_CONTENT = 'opened.content';
export const CLEAR_CONTENT = 'clear.content';

export function create(contentType) {
  return {
    type: CREATE_CONTENT,
    contentType
  }
}


export function opened(contentType, data) {
  return {
    type: OPENED_CONTENT,
    contentType,
    data,
  };
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
      dispatch(opened(contentType, values));
    });
  }
}


export function clear() {
  return {
    type: CLEAR_CONTENT,
  };
}
