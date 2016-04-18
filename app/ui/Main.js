import React, { Component } from 'react';
import styles from './Main.css';

export default class Main extends Component {
  render() {
    const cns = [styles.main];
    return (
      <main className={cns.join(' ')}>
        {this.props.children}
      </main>
    );
  }
}
