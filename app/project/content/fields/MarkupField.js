import React, { Component, PropTypes } from 'react';
import marked from 'marked';

import styles from './MarkupField.css';


export default class MarkupField extends Component {
  render() {
    const {value} = this.props.definition;

    if (!value) {
      return null;
    }

    const markup = (value) => {
      const __html = marked(value || '');
      return {__html};
    }

    return (
      <div className={styles.markup}>
        <div dangerouslySetInnerHTML={markup(value)}/>
      </div>
    );
  }
}
