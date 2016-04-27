import React, { Component, PropTypes } from 'react';

import styles from './InputField.css';

export default class Inputfield extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }


  static get PropTypes() {
    return {
      definition: PropTypes.object.isRequired,
      value: PropTypes.object.isRequired,
      onValueChange: PropTypes.func.isRequired,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
    }
  }


  handleFocus(e) {
    this.setState({active: true});
    this.props.onFocus && this.props.onFocus(this.props.definition, this.refs.input.value, e);
  }


  handleBlur(e) {
    this.setState({active: false});
    this.props.onBlur && this.props.onBlur(this.props.definition, this.refs.input.value, e);
  }


  handleValueChange(e) {
    this.props.onValueChange && this.props.onValueChange(this.props.definition, this.refs.input.value, e);
  }


  render() {
    const {
      name,
      type,
      label,
      hint,
      attributes
    } = this.props.definition;

    let mode = this.state.active ? styles.active : styles.inactive;

    return (
      <div className={`${styles.inputField} ${mode}`}>
        <input ref="input" className={styles.input} name={name} id={name} type={type} value={this.props.value} {...attributes} onChange={this.handleValueChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)}/>
        <label className={styles.label} htmlFor={name}>{label}</label>
      </div>
    );
  }
}
