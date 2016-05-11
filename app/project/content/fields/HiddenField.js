import React, { Component, PropTypes } from 'react';

import InputField from './InputField';

export default class HiddenField extends InputField {
  componentDidMount() {
    this.props.onValueChange(this.props.definition, this.props.value);
  }

  render() {
    return null;
  }
}
