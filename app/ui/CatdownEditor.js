import React, { Component, PropTypes } from 'react';

import {debounce} from 'lodash';
import Catdown from 'catdown';

import globalStyles from './CatdownEditor.global.css';

export default class CatdownEditor extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func
    }
  }


  componentDidMount() {
    this.catdown = new Catdown({
      textarea: this.refs.input,
    });

    this.catdown.editor.on("focus", this.handleFocus.bind(this));
    this.catdown.editor.on("blur", this.handleBlur.bind(this));

    this.catdown.set(this.props.value);
  }


  componentWillReceiveProps(nextProps) {
    const catval = this.catdown.value();
    if (nextProps.value !== undefined && nextProps.value != catval) {
      this.catdown.set(nextProps.value);
    }
  }


  handleFocus() {
    this.props.onFocus && this.props.onFocus(this.catdown.value());
  }


  handleBlur() {
    this.props.onBlur && this.props.onBlur(this.catdown.value());
  }


  render() {
    return (
      <textarea ref="input"/>
    );
  }
}
