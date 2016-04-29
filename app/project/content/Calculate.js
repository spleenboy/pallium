import Moment from 'moment';
import makeSlug from '../../storage/slug';

export function reflect(values, {field}) {
  return values[field];
}

export function moment(values, {field, format}) {
  const date = values[field] ? Moment(values[field]) : Moment();
  return date.format(format);
}

export function substring(values, {field, start, count}) {
  const value = values[field];
  return value ? value.substr(start, count) : '';
}

export function slug(values, {field, defaultValue}) {
  return makeSlug(values[field], defaultValue);
}
