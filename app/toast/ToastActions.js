export const THINK = 'toast.think';
export const ERROR = 'toast.error';

export function error(e, message = null) {
  return {
    type: ERROR,
    error: e,
    message,
  }
}

export function thinking(done = true) {
  return {
    type: THINK,
    done,
  };
}
