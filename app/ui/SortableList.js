import React, { Component, PropTypes } from 'react';

import styles from './SortableList.css';

export default class SortableList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  }


  render() {
    const items = this.props.items.map((item, i) => {
      return (
        <div className={styles.item}>
          {item}
        </div>
      );
    });

    return (
      <div className={styles.sortable}>
        {items}
      </div>
    );
  }
}
