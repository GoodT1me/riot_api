import Moment from 'moment';

export const now = () => new Moment().format();

export const dateDiff = (interval, start, end = new Moment()) => end.diff(start, interval);

export const pluralize = (str) => {
  if (str.match('y$')) {
    return str.replace('y', 'ies');
  }
  if (str.match('s$')) {
    return `${str}es`;
  }
  return `${str}s`;
};
