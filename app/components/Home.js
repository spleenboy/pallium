import React, { Component } from 'react';
import Container from './Container';
import { Link } from 'react-router';
import Icon from './Icon';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <Container>
        Welcome <Icon name="home" size="48px" color="accent"/>
      </Container>
    );
  }
}
