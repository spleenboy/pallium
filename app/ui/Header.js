import React, { Component } from 'react';
import AppBar from 'muicss/lib/react/appbar';
import Icon from './Icon';
import styles from './Header.css';


export default class Container extends Component {
  render() {
    return (
      <AppBar className={styles.ppBar}>
        <h1>Pallium</h1>
      </AppBar>
    );
  }
}
