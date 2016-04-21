export const SELECT_CONTENT_TYPE = 'select.contentType';
export const CLEAR_CONTENT_TYPE = 'clear.contentType';

export function clearContentType() {
  return {
    type: CLEAR_CONTENT_TYPE
  };
}

export function selectContentType(handle) {
  return {
    type: SELECT_CONTENT_TYPE,
    handle,
  }
}
