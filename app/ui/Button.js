import React, { Component, PropTypes } from 'react';
import styles from './Button.css';

export default class Button extends Component {
  handleClick(e) {
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    const {className, mode, ...props} = this.props;
    const style = styles[mode] || '';
    return (
      <button
        className={`${styles.button} ${className || ''} ${style}`}
        onClick={this.handleClick.bind(this)}
        {...props}>
        {this.props.children}
      </button>
    );
  }
}
