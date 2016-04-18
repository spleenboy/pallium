import React, { Component, PropTypes } from 'react';
import styles from './Drawer.css';

export default class Drawer extends Component {
  static propTypes = {
    title: PropTypes.node,
  }

  render() {
    const cns = [styles.drawer];
    return (
      <div className={cns.join(' ')}>
        <div className={styles.title}>{this.props.title}</div>
        {this.props.children}
      </div>
    );
  }
}
