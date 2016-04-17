import React, { Component, PropTypes } from 'react';
import styles from './Toaster.css';

export default class Toaster extends Component {
  static propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    return (
      <div className={styles.toaster}>{this.props.text}</div>
    );
  }
}
