import vkeys from 'vkeys';

export default class Shortcuts {
  constructor(parent = null) {
    this.parent = parent || window;
    this.callbacks = [];
  }


  register(keys, callback, options = {}) {
    this.callbacks.push(new Shortcut(keys, callback, options));
  }


  keydown(e) {
    if (!this.callbacks) {
      return;
    }

    const pressed = vkeys[e.which || e.keyCode];
    this.callbacks.forEach((sc) => {
      return sc.activate(e, pressed);
    });
  }


  start() {
    if (this.listener) {
      return;
    }
    this.listener = this.keydown.bind(this);
    this.parent.addEventListener('keydown', this.listener);
  }


  stop() {
    this.parent.removeEventListener('keydown', this.listener);
    this.listener = null;
  }
}


export class Shortcut {
  constructor(keys, callback, timeout = 1000) {
    this.keys = keys.split(/ +/);
    this.callback = callback;
    this.sequence = 0;
    this.lastpress = 0;
    this.timeout = timeout;
  }

  // Has this shortcut been activated?
  activate(e, pressed) {
    const active = pressed === this.keys[this.sequence];
    this.sequence++;

    // A match!
    if (active && this.sequence === this.keys.length) {
      this.reset();
      this.halt(e);
      this.callback(e, pressed);
    }

    // Reset the sequence if we're at the end of not active
    if (!active || this.sequence >= this.keys.length) {
      this.reset();
      return false;
    }

    // Reset if we've exceeded the time limit
    const now = +new Date;
    if (now - this.lastpress > this.timeout) {
      this.reset();
      return false;
    }

    this.lastpress = now;
    return false;
  }


  halt(e) {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }


  reset() {
    this.sequence = 0;
    this.lastpress = 0;
  }
}
