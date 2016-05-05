import React, { Component, PropTypes } from 'react';
import styles from './Button.css';

export default class Button extends Component {
  render() {
    const {className, mode, ...props} = this.props;
    const style = styles[mode] || '';
    return (
      <button className={`${styles.button} ${className} ${style}`} {...props}>
        {this.props.children}
      </button>
    );
  }
}
