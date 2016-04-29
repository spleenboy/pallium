import React, { Component, PropTypes } from 'react';

import styles from './CollectionFieldItem.css';
import Fields from './index';
import InputField from './InputField';
import Button from '../../../ui/Button';
import Icon from '../../../ui/Icon';

export default class CollectionFieldItem extends InputField {
  handleRemove(e) {
    this.props.onRemove(e);
  }

  // Handle an individual field-level value change and then
  // bubble up the value change to the CollectionField container
  handleFieldValueChange(definition, value, e) {
    const values = this.props.value || {};
    values[definition.name] = value;
    this.props.onValueChange(this.props.definition, values, e);
  }

  render() {
    const {
      itemName,
      fields
    } = this.props.definition;

    const values = this.props.value || {};
    const level = this.props.level || 1;
    const levelStyle = styles['level' + level];

    const inputs = fields.map((def, i) => {
      let Field = (def.type in Fields) ? Fields[def.type] : Fields['default'];
      return (
        <Field
          key={i}
          level={level}
          definition={def}
          value={values[def.name]}
          onValueChange={this.handleFieldValueChange.bind(this)}
        />
      );
    });

    return (
      <div className={`${styles.item} ${levelStyle}`}>
        <div className={styles.header}>
          <Button onClick={this.handleRemove.bind(this)}><Icon>delete</Icon></Button>
        </div>
        <div className={styles.inputs}>{inputs}</div>
      </div>
    );
  }
}
