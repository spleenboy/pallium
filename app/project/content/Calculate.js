import Moment from 'moment';
import _ from 'lodash';
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
  return value ? value.substr(start, count) : '';
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
