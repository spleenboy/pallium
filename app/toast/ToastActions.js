export const CLEAR = 'toast.clear';
export const ADD = 'toast.add';
export const DISMISS = 'toast.dismiss';
export const THINK = 'toast.think';

export function clear() {
  return {
    type: CLEAR
  }
}

export function dismiss(index) {
  return {
    type: DISMISS,
    index,
  }
}

export function confirm(title, text, callback = null) {
  const message = {
    type: 'confirm',
    title,
    text,
    callback
  };
  return {
    type: ADD,
    message,
  }
}

export function error(title, text, e) {
  const message = {
    type: 'error',
    title,
    text,
    error: e,
  }
  return {
    type: ADD,
    message,
  }
}

export function thinking(done = true) {
  return {
    type: THINK,
    done,
  };
}
