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

export function confirm(text, callback = null) {
  const message = {
    type: 'confirm',
    text,
    callback
  };
  return {
    type: ADD,
    message,
  }
}

export function error(e, text = null) {
  const message = {
    type: 'error',
    text: text || e.message,
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
