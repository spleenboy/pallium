import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import styles from './Validation.css';

export const Rules = {};

Rules.required = function(value) {
  return _.isEmpty(value) || _.toString(value).length === 0;
}

Rules.pattern = function(value, {pattern}) {
  const regex = new Regex(pattern);
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

    const errors = [];
    rules.forEach(rule => {
      if (rule.type in Rules) {
        const invalid = Rules[rule.type];
        if (invalid(value, rule)) {
          errors.push(
            <div className={styles.error} key={errors.length}>
              {rule.message}
            </div>
          );
        }
      } else {
        console.error("Invalid rule", rule);
      }
    });

    this.props.onValidation && this.props.onValidation(errors);

    if (!errors) {
      return null;
    }

    return (
      <div className={styles.errors}>
        {errors}
      </div>
    );
  }
}
