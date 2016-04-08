import React, { Component } from 'react';
import styles from './Icon.css';


export default class Icon extends Component {
  static get propTypes() {
    return {
      name: React.PropTypes.string.isRequired,
      color: React.PropTypes.string,
      size: React.PropTypes.string,
    };
  }

  render() {
    let css = styles.icon;
    let style = {};

    if (this.props.color) {
      css += ` mui--text-${this.props.color}`;
    }

    if (this.props.size) {
      style.fontSize = this.props.size;
    }

    return (
      <i className={css} style={style}>{this.props.name}</i>
    );
  }
}
