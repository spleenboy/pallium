export const OPEN_CONTENT = 'open.content';

export function openContent(path) {
  return {
    type: OPEN_CONTENT,
    path,
  }
}
