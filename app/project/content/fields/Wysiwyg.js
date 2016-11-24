import React, { Component, PropTypes } from 'react';

import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import marked from 'marked';
import styles from './Wysiwyg.css';
import globalStyles from './Wysiwyg.global.css';
import InputField from './InputField';

export default class Wysiwyg extends InputField {
  handleValueChange(value) {
    const {format} = this.props.definition;
    let translated = value;
    if (format === 'html') {
      translated = draftToHtml(value);
    } else if (format === 'md') {
      translated = draftToMarkdown(value);
    }
    this.props.onValueChange(this.props.definition, translated);
  }


  convertToRaw(value) {
    if (!value) {
      return '';
    }

    const {format} = this.props.definition;

    if (format === 'json') {
      return value;
    }

    const html = (format === 'md') ? marked(value) : value;
    const blocks = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(blocks);

    return convertToRaw(state);
  }


  renderInput() {
    const {name} = this.props.definition;
    const {value} = this.props;
    let markup = this.convertToRaw(value);
    const id = this.props.id + '-' + name;
    return (
      <div>
        <Editor
          id={id}
          wrapperClassName={styles.wrapper}
          editorClassName={styles.editor}
          toolbarClassName={styles.toolbar}
          toolbarOnFocus={true}
          initialContentState={markup}
          onChange={this.handleValueChange.bind(this)}
        />
        <pre>{value}</pre>
      </div>
    );
  }
}

