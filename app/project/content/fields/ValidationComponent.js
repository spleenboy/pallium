import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import styles from './ValidationComponent.css';
import * as Validation from './Validation';

export default class ValidationComponent extends Component {
  static propTypes = {
    validation: React.PropTypes.object.isRequired,
  }


  render() {
    const validation = this.props.validation;

    const messages = [];
    validation.rules.forEach(rule => {
      if (!rule.valid && rule.warning) {
        messages.push(
          <div className={styles.error} key={messages.length}>
            {rule.warning}
          </div>
        );
      } else if (rule.valid && rule.label) {
        messages.push(
          <div className={styles.label} key={messages.length}>
            {rule.label}
          </div>
        );
      }
    });

    if (!messages) {
      return null;
    }

    return (
      <div className={styles.messages}>
        {messages}
      </div>
    );
  }
}
