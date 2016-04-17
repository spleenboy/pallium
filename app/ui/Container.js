import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Container.css';


export default class Container extends Component {
  render() {
    const containerCns = [
      styles.container, 
      'mdl-layout',
      'mdl-js-layout',
    ];

    const contentCns = [
      styles.body,
      'mdl-layout__content',
    ];

    return (
      <div className={containerCns.join(' ')}>
          <Header />
          <main className={contentCns.join(' ')}>
            {this.props.children}
          </main>
          <Footer />
      </div>
    );
  }
}
