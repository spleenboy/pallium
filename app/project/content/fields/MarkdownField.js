import React, { Component, PropTypes } from 'react';

import styles from './MarkdownField.css';
import InputField from './InputField';
import CatdownEditor from '../../../ui/CatdownEditor';

export default class MarkdownField extends InputField {
  handleValueChange(value) {
    this.props.onValueChange(this.props.definition, value);
  }


  renderInput() {
    return (
      <div className={styles.markdown}>
        <CatdownEditor
          value={this.props.value}
          onBlur={this.handleValueChange.bind(this)}
        />
      </div>
    );
  }
}
