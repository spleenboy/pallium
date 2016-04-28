import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import autosize from 'autosize';

import styles from './MarkdownField.css';
import InputField from './InputField';

const DEFAULT_ROWS = 4;
const ROW_HEIGHT = 32;

export default class MarkdownField extends InputField {
  componentDidMount() {
    autosize(this.refs.input);
  }

  componentWillUnmount() {
    autosize.destroy(this.refs.input);
  }


  renderEditor() {
    const {
      name,
      rows,
      attributes
    } = this.props.definition;

    return (
      <textarea ref="input" className={styles.textarea} rows={rows ? rows : DEFAULT_ROWS} name={name} id={name} value={this.props.value} {...attributes} onChange={this.handleValueChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)}/>
    );
  }


  renderPreview() {
    const preview = (value) => {
      const __html = marked(value || '');
      return {__html};
    }

    return (
      <div ref="preview" className={styles.preview} dangerouslySetInnerHTML={preview(this.props.value)}></div>
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
