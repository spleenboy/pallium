import React, { Component, PropTypes } from 'react';

import styles from './Shrug.css';

export default class Shrug extends Component {
  render() {
    return (
      <div className={styles.shrug}>¯\_(ツ)_/¯</div>
    );
  }
}
