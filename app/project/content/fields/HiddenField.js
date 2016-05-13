import React, { Component, PropTypes } from 'react';

import InputField from './InputField';

export default class HiddenField extends InputField {
  componentDidMount() {
    const {value, defaultValue} = this.props.definition;
    this.props.onValueChange(this.props.definition, value);
  }

  render() {
    return null;
  }
}
