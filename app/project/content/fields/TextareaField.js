import React, { Component, PropTypes } from 'react';

import styles from './TextareaField.css';
import InputField from './InputField';
import autosize from 'autosize';

export default class Textareafield extends InputField {
  componentDidMount() {
    autosize(this.refs.input);
  }

  componentWillUnmount() {
    autosize.destroy(this.refs.input);
  }

  renderInput() {
    const {
      name,
      attributes
    } = this.props.definition;

    return (
      <textarea ref="input" className={styles.textarea} name={name} id={name} value={this.props.value} {...attributes} onChange={this.handleValueChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)}/>
    );
  }
}
