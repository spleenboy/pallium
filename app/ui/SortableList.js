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
    e.target.classList.add(styles.active);
    e.preventDefault();
  }


  handleDragLeave(i, e) {
    e.dataTransfer.dropEffect = 'none';
    e.target.classList.remove(styles.active);
  }


  handleDragDrop(newIndex, e) {
    e.target.classList.remove(styles.active);
    const oldIndex = this.state.sortIndex;

    // If you're moving from the top, the slots shift up by one number
    if (oldIndex === 0 && newIndex > 0) {
      newIndex--;
    }

    this.props.onChange && this.props.onChange(oldIndex, newIndex);
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
    if (!this.props.items) {
      return null;
    }

    if (this.props.items.length < 2) {
      return (
        <div>{this.props.items}</div>
      );
    }

    const dropzone = (ctx, index, key) => {
      return (
        <div
          key={key}
          onDragOver={ctx.handleDragOver.bind(ctx, index)}
          onDragLeave={ctx.handleDragLeave.bind(ctx, index)}
          onDrop={ctx.handleDragDrop.bind(ctx, index)}
          className={styles.droppable}></div>
      );
    };


    let items = [];
    this.props.items.forEach((item, i) => {
      const style = this.state.sortIndex === i ? styles.dragging : styles.item;
      items.push(dropzone(this, i, items.length))
      items.push(
        <div key={items.length} className={styles.item}>
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
    items.push(dropzone(this, this.props.items.length, items.length));

    let sortState = this.state.sortIndex >= 0 ? styles.sorting : styles.waiting;

    return (
      <div className={`${styles.sortable} ${sortState}`}>
        {items}
      </div>
    );
  }
}
