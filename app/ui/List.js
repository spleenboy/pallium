import React, { Component, PropTypes } from 'react';
import styles from './List.css';

export default class List extends Component {
  render() {
    const cn = `${styles.list} mdl-list`;
    return (
      <ul className={cn}>
        {this.props.children}
      </ul>
    );
  }
}
