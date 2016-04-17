import React, { Component } from 'react';
import styles from './DrawerItem.css';

export default class Drawer extends Component {
  render() {
    const cns = [styles.item, "mdl-navigation__link"];
    return (
      <div className={cns.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}
