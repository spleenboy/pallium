import React, { Component, PropTypes } from 'react';

import styles from './InputField.css';

export default class Inputfield extends Component {
  static get PropTypes() {
    return {
      definition: PropTypes.object.isRequired,
      onValueChange: PropTypes.func.isRequired,
    }
  }


  handleValueChange(e) {
    this.props.onValueChange && this.props.onValueChange(this.props.definition, e.value, e);
  }


  render() {
    const {
      name,
      type,
      label,
      defaultValue,
      value,
      hint,
      attributes
    } = this.props.definition;

    const calculatedValue = typeof value !== 'undefined' ? value : defaultValue;

    return (
      <div className={styles.inputField}>
        <input className={styles.input} name={name} id={name} type={type} value={calculatedValue} {...attributes} onChange={this.handleValueChange.bind(this)}/>
        <label className={styles.label} htmlFor={name}>{label}</label>
      </div>
    );
  }
}
