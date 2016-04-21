import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Container.css';


export default class Container extends Component {
  render() {
    const cns = [
      styles.container, 
      'mdl-layout',
      'mdl-js-layout',
    ];

    return (
      <div className={cns.join(' ')}>
          {this.props.children}
      </div>
    );
  }
}
