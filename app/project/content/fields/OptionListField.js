import React, { Component, PropTypes } from 'react';

import InputField from './InputField';
import styles from './OptionListField.css';

export default class OptionListField extends InputField {
  isMultiple() {
    const {options, type} = this.props.definition;
    return type === 'checkbox' && options.length > 1;
  }


  formattedValue() {
    const value = this.props.value;

    if (!this.isMultiple()) {
      return value ? value.toString() : '';
    }

    if (Array.isArray(value)) {
      return value.filter(item => item !== null);
    }

    if (value === null) {
      return [];
    }

    return [value];
  }


  addValue(value) {
    let oldValue = this.formattedValue();
    if (!this.isMultiple()) {
      return value;
    } else if (oldValue.includes(value)) {
      return oldValue;
    } else {
      oldValue.push(value);
      return oldValue;
    }
  }


  removeValue(value) {
    let oldValue = this.formattedValue();
    if (!this.isMultiple()) {
      return null;
    } else {
      return oldValue.filter(item => item !== value);
    }
  }


  handleValueChange(value, e) {
    let newValue;
    if (e.currentTarget.checked) {
      newValue = this.addValue(value);
    } else {
      newValue = this.removeValue(value);
    }
    this.props.onValueChange && this.props.onValueChange(this.props.definition, newValue, e);
  }


  render() {
    const {options, type, name, attributes, label} = this.props.definition;
    const value = this.formattedValue();
    let mode = this.state.active ? styles.active : styles.inactive;

    const checked = (optionValue) => {
      if (Array.isArray(value)) {
        return value.includes(optionValue);
      } else {
        return value === optionValue;
      }
    }

    const optionList = options.map((option, i) => {
      return (
        <label className={styles.option} key={i}>
            <input
                type={type}
                name={name}
                className={styles.input}
                onChange={this.handleValueChange.bind(this, option.value)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                value={option.value}
                checked={checked(option.value)}
            />
            <div className={styles.label}>{option.label}</div>
        </label>
      );
    });
    return (
      <div className={`${styles.optionList} ${mode} ${type}`} onClick={this.handleFocus.bind(this)}>
        {optionList}
        <div className={styles.heading}>{label}</div>
      </div>
    );
  }
}
