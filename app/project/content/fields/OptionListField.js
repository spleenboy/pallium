import React, { Component, PropTypes } from 'react';

import InputField from './InputField';
import Icon from '../../../ui/Icon';
import styles from './OptionListField.css';

export default class OptionListField extends InputField {
  componentDidMount() {
    const {options, value, defaultValue} = this.props.definition;
    let initialValue = value || defaultValue || options && options.length && options[0].value;
    this.props.onValueChange(this.props.definition, initialValue);
  }


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


  handleValueChange(value, checked, e) {
    let newValue;
    if (checked) {
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
      const isChecked = checked(option.value);
      const css = isChecked ? styles.checked : styles.unchecked;

      let icon;
      if (type === 'radio') {
        icon = isChecked ? "radio_button_checked" : "radio_button_unchecked";
      } else if (type === 'checkbox') {
        icon = isChecked ? "check_box": "check_box_outline_blank";
      }

      return (
        <div className={`${styles.option} ${css}`} key={i}>
          <button
            key={i}
            onClick={this.handleValueChange.bind(this, option.value, !isChecked)}
          >
            <Icon name={icon} size="2rem" />
            <div className={styles.label}>{option.label ? option.label : option.value}</div>
          </button>
        </div>
      );
    });
    return (
      <div className={`${styles.optionList} ${mode} ${type}`} onClick={this.handleFocus.bind(this)}>
        {this.renderHeader()}
        <div className={styles.heading}>{label}</div>
        {optionList}
        {this.renderValidation()}
      </div>
    );
  }
}
