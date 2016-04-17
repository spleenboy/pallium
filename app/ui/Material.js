export default class Material {
  constructor(styles = [], flags = {}) {
    this.styles = styles;
    this.flags = flags;
  }

  className(props) {
    const cn = this.styles;
    const flags = Object.keys(this.flags);
    flags.forEach(flag => {
      if (props[flag]) {
        cn.push(this.flags[flag]);
      }
    });
    return cn.join(' ');
  }
}
