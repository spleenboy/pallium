import React, { Component, PropTypes } from 'react';

import styles from './CollectionField.css';
import InputField from './InputField';
import CollectionFieldItem from './CollectionFieldItem';

import Button from '../../../ui/Button';
import Icon from '../../../ui/Icon';

export default class CollectionField extends InputField {
  asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  handleAdd(start, e) {
    let value = this.asArray(this.props.value);
    value.splice(start, 0, {});
    this.props.onValueChange(this.props.definition, value, e);
  }

  handleRemove(start, e) {
    let value = this.asArray(this.props.value);
    value.splice(start, 1);
    this.props.onValueChange(this.props.definition, value, e);
  }

  handleItemChange(index, definition, value, e) {
    let items = this.asArray(this.props.value);
    items[index] = value;
    this.props.onValueChange(this.props.definition, items, e);
  }


  render() {
    const {
      name,
      hint,
      label,
      itemName,
      fields
    } = this.props.definition;
    const values = this.asArray(this.props.value);
    const level = this.props.level || 0;

    const items = values.map((value, i) => {
      return (
        <CollectionFieldItem
          key={i}
          level={level + 1}
          definition={this.props.definition}
          value={value} 
          onRemove={this.handleRemove.bind(this, i)}
          onValueChange={this.handleItemChange.bind(this, i)}
        />
      );
    });

    return (
      <div className={styles.collection}>
        <div className={styles.header}>{label}</div>
        <div className={styles.items}>{items}</div>
        <div className={styles.add}>
          <Button onClick={this.handleAdd.bind(this, values.length)}>
            New {itemName} <Icon>add</Icon>
          </Button>
        </div>
      </div>
    );
  }
}
