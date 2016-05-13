import React, { Component, PropTypes } from 'react';

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


  handleNewItemValueChange(def, value, validation) {
    this.setState({value});
  }


  handleNewItemCreate(definition) {
    this.setState({
      value: definition.value || definition.defaultValue || null,
      definition
    })
  }


  renderInput() {
    let buttons, badges, field;

    buttons = this.props.definition.fields.map((definition, i) => {
      return (
        <Button key={i} onClick={this.handleNewItemCreate.bind(this, definition)}>
          {definition.label} <Icon name="add"/>
        </Button>
      );
    });

    if (Array.isArray(this.props.value)) {
      badges = this.props.value.map((item, i) => {
        // @todo: Pick the appropriate field type for editing
        if (typeof item === 'object') {
          item = JSON.stringify(item, false, 2);
        }
        return (
          <button className={parentStyles.badge} key={i} onClick={this.handleRemove.bind(this, i)} title="Delete">
            <Icon name="delete_forever"/>
            {item}
          </button>
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
