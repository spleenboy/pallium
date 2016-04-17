import React, { Component, PropTypes } from 'react';
import styles from './Drawer.css';

export default class Drawer extends Component {
  static propTypes = {
    title: PropTypes.node,
  }

  render() {
    const cns = [styles.drawer, "mdl-layout__drawer"];
    return (
      <div className={cns.join(' ')}>
        <div className="mdl-layout__title">{this.props.title}</div>
        <nav className="mdl-navigation">
          {this.props.children}
        </nav>
      </div>
    );
  }
}
