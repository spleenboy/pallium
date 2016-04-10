import React, { Component } from 'react';
import MuiContainer from 'muicss/lib/react/container';
import Header from './Header';
import Footer from './Footer';
import styles from './Container.css';


export default class Container extends Component {
  render() {
    return (
      <MuiContainer fluid={true} className={styles.container}>
          <Header />
          <MuiContainer className={styles.body}>
            {this.props.children}
          </MuiContainer>
          <Footer />
      </MuiContainer>
    );
  }
}
