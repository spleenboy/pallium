import React, { Component, PropTypes } from 'react';
import styles from './List.css';

export default class List extends Component {
  render() {
    return (
      <div className={styles.list}>
        {this.props.children}
      </div>
    );
  }
}
