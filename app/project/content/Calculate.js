import Moment from 'moment';

export function reflect(values, {field}) {
  return values[field];
}

export function moment(values, {field, format}) {
  const date = values[field] ? Moment(values[field]) : Moment();
  return date.format(format);
}
