import React, { Component, PropTypes } from 'react';

import styles from './SortableList.css';

export default class SortableList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onSortStart: PropTypes.func,
    onSortStop: PropTypes.func,
  }


  constructor(props) {
    super(props);
    this.state = {
      sortIndex: -1,
    }
  }


  handleDragOver(i, e) {
    e.dataTransfer.dropEffect = 'move';
  }


  handleDragDrop(i, e) {
    e.dataTransfer.dropEffect = 'move';
    this.setState({sortIndex: -1});
  }


  handleDragStart(sortItem, sortIndex, e) {
    this.setState({sortIndex});
    this.props.onSortStart && this.props.onSortStart(sortItem, sortIndex, e);
  }


  handleDragEnd(sortItem, sortIndex, e) {
    this.setState({sortIndex: -1});
  }


  render() {
    const items = this.props.items.map((item, i) => {
      const style = this.state.sortIndex === i ? styles.dragging : styles.item;
      return (
        <div key={i} className={styles.item}>
          <div
            onDragOver={this.handleDragOver.bind(this, i)}
            onDragDrop={this.handleDragDrop.bind(this, i)}
            className={styles.droppable}></div>
          <div
            className={styles.draggable}
            onDragStart={this.handleDragStart.bind(this, item, i)}
            onDragEnd={this.handleDragEnd.bind(this, item, i)}
            draggable={true}
          >
            {item}
          </div>
        </div>
      );
    });

    let sortState = this.state.sortIndex >= 0 ? styles.sorting : styles.waiting;

    return (
      <div className={`${styles.sortable} ${sortState}`}>
        {items}
        <div
          onDragOver={this.handleDragOver.bind(this, this.props.items.length + 1)}
          onDragDrop={this.handleDragDrop.bind(this, this.props.items.length + 1)}
          className={styles.droppable}></div>
      </div>
    );
  }
}
