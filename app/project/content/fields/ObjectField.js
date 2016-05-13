import React, { Component, PropTypes } from 'react';

import styles from './ObjectField.css';
import InputField from './InputField';
import Field from './Field';

export default class ObjectField extends InputField {
  handleItemChange(key, definition, value, validation) {
    const item = this.props.value || {};
    item[key] = value;
    this.props.onValueChange(this.props.definition, item);
  }


  render() {
    const {
      name,
      hint,
      label,
      fields
    } = this.props.definition;
    const values = this.props.value || {};
    const level = this.props.level || 0;

    const inputs = fields.map((def, i) => {
      const value = def.value || values[def.name] || def.defaultValue || null;
      return (
        <Field
          key={i}
          level={level + 1}
          definition={def}
          value={value} 
          onValueChange={this.handleItemChange.bind(this, def.name)}
        />
      );
    });

    return (
      <div className={styles.object}>
        <div className={styles.header}>{label}</div>
        <div className={styles.inputs}>{inputs}</div>
      </div>
    );
  }
}
