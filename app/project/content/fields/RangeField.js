import React, { Component, PropTypes } from 'react';

import styles from './RangeField.css';
import InputField from './InputField';

export default class RangeField extends InputField {
  renderHeader() {
    return (
      <div className={styles.range}>{this.props.value}</div>
    );
  }
}
