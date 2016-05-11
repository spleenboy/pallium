import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import Catdown from 'catdown';

import styles from './MarkdownField.css';
import globalStyles from './MarkdownField.global.css';
import InputField from './InputField';

const DEFAULT_ROWS = 4;
const ROW_HEIGHT = 32;

export default class MarkdownField extends InputField {
  handleChange() {
    this.props.onValueChange(this.props.definition, this.catdown.value());
  }


  componentDidMount() {
    this.catdown = new Catdown({
      textarea: this.refs.input,
      events: {
        "change": this.handleChange.bind(this)
      }
    });
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.catdown.value() !== this.props.value) {
      this.catdown.set(this.props.value);
    }
  }




  renderInput() {
    const {
      name,
      rows,
      attributes
    } = this.props.definition;

    return (
      <div className={styles.markdown}>
        <textarea
          ref="input"
          className={styles.textarea}
          rows={rows ? rows : DEFAULT_ROWS}
          value={this.props.value}
          {...attributes}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
      </div>
    );
  }
}
