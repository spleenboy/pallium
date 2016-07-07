import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import parentStyles from './ArrayField.css';
import styles from './ObjectArrayField.css';
import ArrayField from './ArrayField';
import Field from './Field';

import SortableList from '../../../ui/SortableList';
import Button from '../../../ui/Button';
import Icon from '../../../ui/Icon';

export default class ObjectArrayField extends ArrayField {
  constructor(props) {
    super(props);
    this.state.definition = null;
    this.state.value = null;
  }

  handleAdd() {
    const values = Array.isArray(this.props.value) ? this.props.value : [];
    values.push(this.state.value);
    this.props.onValueChange(this.props.definition, values);
    this.setState({definition: null, value: null});
  }


  handleCancelAdd(e) {
    this.setState({
        definition: null,
        value: null,
    });
  }


  handleItemValueChange(index, def, value, validation) {
    const values = Array.isArray(this.props.value) ? this.props.value : [];
    values[index] = value;
    this.props.onValueChange(this.props.definition, values);
  }


  handleNewItemValueChange(def, value, validation) {
    this.setState({value});
  }


  handleNewItemCreate(definition) {
    this.setState({
      value: definition.value || definition.defaultValue || null,
      definition
    })
  }


  pickFieldDefinition(item) {
    const isObject = _.isObject(item);
    const keys = isObject ? Object.keys(item) : [];
    const defs = this.props.definition.fields;
    return defs.find(def => {
      if (!def.fields && !keys.length) {
        // We're dealing with a simple value, so a guess can't be made well.
        // Just return the first non-complex field definition.
        return true;
      }

      if (!def.fields) return false;

      const objectNames = def.fields.map(field => field.name);
      return objectNames.length === keys.length &&
             objectNames.every((el, i) => el === keys[i]);
    });
  }


  renderInput() {
    let buttons, badges, field;

    buttons = this.props.definition.fields.map((definition, i) => {
      return (
        <Button className={styles.newItemButton} key={i} onClick={this.handleNewItemCreate.bind(this, definition)}>
          {definition.label} <Icon name="add"/>
        </Button>
      );
    });

    if (Array.isArray(this.props.value)) {
      badges = this.props.value.map((item, i) => {
        const fieldDefinition = this.pickFieldDefinition(item);
        let itemField = item;
        let itemTitle = '';

        if (fieldDefinition) {
          itemTitle = fieldDefinition.label || fieldDefinition.name || '';
          itemField = (
            <Field
              definition={fieldDefinition}
              value={item}
              onValueChange={this.handleItemValueChange.bind(this, i)}
            />
          );
        } else if (_.isObject(item)) {
          itemTitle = 'Object';
          itemField = JSON.stringify(item, false, 2);
        }

        return (
          <div className={styles.item}>
            <div className={styles.header}>
              <Button
                mode="warning"
                className={styles.badge}
                key={i}
                onClick={this.handleRemove.bind(this, i)}
                title="Delete"
              >
                <Icon name="delete_forever"/>
              </Button>
              <div className={styles.title}>{itemTitle}</div>
            </div>
            {itemField}
          </div>
        );
      });
    }

    if (this.state.definition) {
        field = (
          <div className={styles.newItem}>
            <Field
              definition={this.state.definition}
              value={this.state.value}
              onValueChange={this.handleNewItemValueChange.bind(this)}
            />
            <div className={styles.buttons}>
              <Button className={styles.cancel} onClick={this.handleCancelAdd.bind(this)} title="Cancel">Cancel</Button>
              <Button mode="secondary" onClick={this.handleAdd.bind(this)} title="Add">Add {this.state.definition.label} <Icon name="add"/></Button>
            </div>
          </div>
        );
    }

    return (
      <div className={parentStyles.input}>
        <div className={parentStyles.badges}>
          <SortableList onChange={this.handleSort.bind(this)} items={badges}/>
        </div>
        {field}
        {buttons}
      </div>
    );
  }
}
