import React, { Component } from 'react';
import styles from './Header.css';


export default class Container extends Component {
  render() {
    return (
      <header className={styles.header}>
        {this.props.children}
      </header>
    );
  }
}
