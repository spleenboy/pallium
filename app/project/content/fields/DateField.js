import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import strtotime from 'strtotime';

import InputField from './InputField';
import styles from './InputField.css';

export default class DateField extends InputField {
  formattedValue() {
    const value = this.props.value || this.props.definition.defaultValue;
    const date = strtotime(value);
    const m = moment(date);
    return m.isValid() ? m.format('YYYY-MM-DD') : '';
  }
}
