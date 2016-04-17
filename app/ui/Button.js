import React, { Component, PropTypes } from 'react';
import Material from './Material';
import styles from './Button.css';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.material = new Material([
      styles.button,
      'mdl-button',
      'mdl-js-button',
      'mdl-js-ripple-effect'
    ],
    {
      'fab': 'mdl-button--fab',
      'raised': 'mdl-button--raised',
      'colored': 'mdl-button--colored',
      'primary': 'mdl-button--primary',
      'accent': 'mdl-button-accent',
    });
  }

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    const style = this.material.className(this.props);
    return (
      <button
        className={style}
        disabled={!!this.props.disabled}
        onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </button>
    );
  }
}
