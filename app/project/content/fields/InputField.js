import React, { Component, PropTypes } from 'react';

import styles from './InputField.css';
import Validation from './Validation';

export default class InputField extends Component {
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


  renderLabel() {
    const {name, label} = this.props.definition;
    return (
      <label className={styles.label} htmlFor={name}>{label}</label>
    );
  }


  renderInput() {
    const {
      name,
      type,
      label,
      attributes
    } = this.props.definition;

    return (
      <input
        ref="input"
        className={styles.input}
        name={name}
        id={name}
        type={type}
        value={this.props.value}
        onChange={this.handleValueChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        {...attributes}
      />
    );
  }


  renderHeader() {
    const {hint} = this.props.definition;
    if (!hint) return null;

    return (
      <div className={styles.hint}>{hint}</div>
    );
  }


  renderError() {
    const {validation} = this.props.definition;
    return (
      <Validation rules={validation} value={this.props.value}/>
    );
  }


  render() {
    let mode = this.state.active ? styles.active : styles.inactive;
    let type = styles[this.props.definition.type] || '';

    return (
      <div className={`${styles.inputField} ${mode} ${type}`} onClick={this.handleFocus.bind(this)}>
        {this.renderHeader()}
        {this.renderInput()}
        {this.renderLabel()}
        {this.renderError()}
      </div>
    );
  }
}
