import React, { Component } from 'react';
import styles from './Icon.css';


export default class Icon extends Component {
  static propTypes = {
    size: React.PropTypes.string,
  }

  render() {
    const cns = [
      styles.icon,
      'material-icons',
    ];
    let style = {};

    if (this.props.size) {
      style.fontSize = this.props.size;
    }

    return (
      <i className={cns.join(' ')} style={style}>{this.props.children}</i>
    );
  }
}
