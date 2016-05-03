import React, { Component } from 'react';
import styles from './Icon.css';


export default class Icon extends Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    size: React.PropTypes.string,
    className: React.PropTypes.string,
  }

  render() {
    const cns = [
      styles.icon,
    ];

    if (this.props.className) {
      cns.push(this.props.className);
    }

    let style = {};

    if (this.props.size) {
      style.fontSize = this.props.size;
    }

    return (
      <em className={cns.join(' ')} style={style}>{this.props.name}</em>
    );
  }
}
