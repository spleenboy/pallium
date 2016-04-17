import React, { Component, PropTypes } from 'react';
import MuiButton from 'muicss/lib/react/button';
import styles from './Button.css';

export default class Button extends Component {
  static propTypes = {
    name: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.boolean,
    onClick: PropTypes.func,
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    return (
      <MuiButton
        className={styles.button}
        onClick={this.handleClick.bind(this)}
        {...this.props}>{this.props.children}</MuiButton>
    );
  }
}
