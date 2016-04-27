import React, { Component, PropTypes } from 'react';

import styles from './TextareaField.css';
import InputField from './InputField';

export default class Textareafield extends InputField {
  renderInput() {
    const {
      name,
      rows,
      attributes
    } = this.props.definition;

    return (
      <textarea ref="input" className={styles.textarea} rows={rows ? rows : 4} name={name} id={name} value={this.props.value} {...attributes} onChange={this.handleValueChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)}/>
    );
  }
}
