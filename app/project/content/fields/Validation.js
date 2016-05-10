import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import styles from './Validation.css';

export const Rules = {};

Rules.required = function(value) {
  return _.isEmpty(value) || _.toString(value).length === 0;
}

Rules.pattern = function(value, {pattern}) {
  const regex = new RegExp(pattern);
  return !regex.test(value);
}


export default class Validation extends Component {
  static propTypes = {
    rules: React.PropTypes.array,
    value: React.PropTypes.node,
    onValidation: React.PropTypes.func,
  }


  render() {
    const {rules, value} = this.props;

    if (!rules) {
      return null;
    }

    const messages = [];
    let isValid = true;
    rules.forEach(rule => {
      if (rule.type in Rules) {
        const invalid = Rules[rule.type];
        if (invalid(value, rule)) {
          isValid = false;
          messages.push(
            <div className={styles.error} key={messages.length}>
              {rule.message}
            </div>
          );
        } else if (rule.label) {
          messages.push(
            <div className={styles.label} key={messages.length}>
              {rule.label}
            </div>
          );
        }
      } else {
        console.error("Invalid rule", rule);
      }
    });

    this.props.onValidation && this.props.onValidation(isValid, messages);

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
