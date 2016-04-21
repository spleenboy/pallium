import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Container.css';


export default class Container extends Component {
  render() {
    return (
      <div className={styles.container}>
          {this.props.children}
      </div>
    );
  }
}
