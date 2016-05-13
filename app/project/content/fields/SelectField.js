import React, { Component, PropTypes } from 'react';

import InputField from './InputField';
import styles from './SelectField.css';

export default class SelectField extends InputField {
  onComponentDidMount() {
    this.props.onValueChange(this.props.definition, this.props.value);
  }


  renderInput() {
    const {options, name, attributes} = this.props.definition;

    const optionList = options.map((option, i) => {
      return (
        <option key={i} value={option.value}>{option.label ? option.label : option.value}</option>
      );
    });
    return (
      <select
        ref="input"
        name={name}
        id={name}
        className={styles.selectField}
        value={this.props.value}
        onChange={this.handleValueChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        {...attributes}
      >
        {optionList}
      </select>
    );
  }
}
