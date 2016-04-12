export const SELECT_CONTENT_TYPE = 'select.contentType';

export function selectContentType(handle) {
  return {
    type: SELECT_CONTENT_TYPE,
    handle,
  }
}
