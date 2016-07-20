import React, { Component, PropTypes } from 'react';

import InputField from './InputField';
import styles from './InputField.css';

export default class NumberField extends InputField {
  rawInputValue() {
    const value = parseInt(this.refs.input.value);
    return isNaN(value) ? null : value;
  }
}
