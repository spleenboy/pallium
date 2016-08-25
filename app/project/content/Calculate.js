import Moment from 'moment';
import _ from 'lodash';
import uuid from 'node-uuid';
import makeSlug from '../../storage/slug';

export function reflect(values, {field, defaultValue}) {
  return _.get(values, field, defaultValue);
}

export function moment(values, {field, format}) {
  const value = _.get(values, field);
  const date = values[field] ? Moment(values[field]) : Moment();
  return date.format(format);
}

export function substring(values, {field, start, count}) {
  const value = _.get(values, field);
  return value ? value.substr(start, count).trim() : '';
}

export function kebab(values, {field, defaultValue}) {
  const value = _.get(values, field, defaultValue);
  return _.kebabCase(value);
}

export function camel(values, {field, defaultValue}) {
  const value = _.get(values, field, defaultValue);
  return _.camelCase(value);
}

export function snake(values, {field, defaultValue}) {
  const value = _.get(values, field, defaultValue);
  return _.snakeCase(value);
}

export function slug(values, {field, defaultValue}) {
  const value = _.get(values, field, defaultValue);
  return makeSlug(value);
}

export function id(values, {type, prefix=''}) {
  switch (type) {
    case 'increment':
      return _.uniqueId(prefix);
    case 'v1':
      return prefix + uuid.v1();
    default:
      return prefix + uuid.v4();
  }
}
