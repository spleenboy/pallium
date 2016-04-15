import React, { Component, PropTypes } from 'react';
import MuiButton from 'muicss/lib/react/button';
import styles from './Button.css';

export default class Button extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
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
    const props = {variant, color, size, disabled} = this.props;
    return (
      <MuiButton
        className={styles.button}
        onClick={this.props.handleClick.bind(this)}
        {...props}>{this.props.children}</MuiButton>
    );
  }
}
