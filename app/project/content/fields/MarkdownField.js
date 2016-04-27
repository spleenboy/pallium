import React, { Component, PropTypes } from 'react';
import marked from 'marked';

import styles from './MarkdownField.css';
import InputField from './InputField';

export const DEFAULT_ROWS = 4;
export const ROW_HEIGHT = 18;

export default class Textareafield extends InputField {
  inlineStyle() {
    const rows = this.props.definition.rows || DEFAULT_ROWS;
    const height = rows & ROW_HEIGHT;
    return {height};
  }

  renderEditor() {
    const {
      name,
      rows,
      attributes
    } = this.props.definition;

    return (
      <textarea ref="input" className={styles.textarea} style={this.inlineStyle()} name={name} id={name} value={this.props.value} {...attributes} onChange={this.handleValueChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)}/>
    );
  }


  renderPreview() {
    const preview = (value) => {
      const __html = marked(value);
      return {__html};
    }

    return (
      <div ref="preview" className={styles.preview} style={this.inlineStyle()} dangerouslySetInnerHTML={preview(this.props.value)}></div>
    );
  }

  renderInput() {
    const markup = this.state.active ? this.renderEditor() : this.renderPreview();

    return (
      <div className={styles.editor}>
        {markup}
      </div>
    );
  }
}
