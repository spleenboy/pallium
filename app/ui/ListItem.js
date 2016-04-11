import React, { Component, PropTypes } from 'react';
import Panel from 'muicss/lib/react/panel';
import styles from './ListItem.css';

export default class ListItem extends Component {
  render() {
    return (
      <Panel className={styles.item}>
        {this.props.children}
      </Panel>
    );
  }
}
