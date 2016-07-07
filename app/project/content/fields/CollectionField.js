import React, { Component, PropTypes } from 'react';

import styles from './CollectionField.css';
import InputField from './InputField';
import CollectionFieldItem from './CollectionFieldItem';

import Button from '../../../ui/Button';
import Icon from '../../../ui/Icon';
import SortableList from '../../../ui/SortableList'

export default class CollectionField extends InputField {
  asArray(value) {
    return Array.isArray(value) ? value : [];
  }


  handleSort(oldIndex, newIndex) {
    const items = this.asArray(this.props.value);
    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
    this.props.onValueChange(this.props.definition, items);
  }


  handleAdd(start, definition, e) {
    let value = this.asArray(this.props.value);
    const item = {};
    definition.fields.forEach(field => {
      item[field.name] = field.value || field.defaultValue || null;
    });
    value.splice(start, 0, item);
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


  pickDefinition(item) {
    const keys = Object.keys(item || {});
    const defs = this.props.definition.definitions;
    return defs.find(def => {
      const names = def.fields.map(field => field.name);
      return names.length === keys.length &&
             names.every((el, i) => el === keys[i]);
    });
  }


  render() {
    const {
      name,
      hint,
      label,
      definitions
    } = this.props.definition;
    const values = this.asArray(this.props.value);
    const level = this.props.level || 0;

    const items = values.map((value, i) => {
      const def = this.pickDefinition(value);
      if (!def) return null;
      return (
        <CollectionFieldItem
          key={i}
          level={level + 1}
          definition={def}
          value={value} 
          onRemove={this.handleRemove.bind(this, i)}
          onValueChange={this.handleItemChange.bind(this, i)}
        />
      );
    });

    const buttons = definitions.map((def, i) => {
      return (
        <Button className={styles.newItemButton} key={i} onClick={this.handleAdd.bind(this, values.length, def)}>
          {def.label} <Icon name="add"/>
        </Button>
      );
    });

    return (
      <div className={styles.collection}>
        <div className={styles.header}>{label}</div>
        <div className={styles.items}>
          <SortableList onChange={this.handleSort.bind(this)} items={items}/>
        </div>
        <div className={styles.buttons}>{buttons}</div>
      </div>
    );
  }
}
