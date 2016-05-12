import _ from 'lodash';

export const Rules = {};

Rules.required = function(value) {
  return !_.isEmpty(value) && _.toString(value).length > 0;
}

Rules.pattern = function(value, {pattern}) {
  const regex = new RegExp(pattern);
  return regex.test(value);
}


export default class Validation {
  constructor(rules = [], value) {
    this.valid = true;
    this.rules = _.clone(rules);
    this.validate(value);
  }

  validate(value) {
    this.valid = true;

    if (!this.rules || !this.rules.forEach) {
      return;
    }

    this.rules.forEach((rule, i) => {
      const test = Rules[rule.type];
      if (!test) {
        rule.valid = false;
        this.valid = false;
        console.error("Invalid rule", rule);
      } else if (test(value)) {
        rule.valid = true;
      } else {
        rule.valid = false;
        this.valid = false;
      }
    });

    return this.valid;
  }
}
