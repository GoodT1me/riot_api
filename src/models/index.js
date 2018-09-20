import recursiveReadSync from 'recursive-readdir-sync';
import _ from 'lodash';

export default recursiveReadSync(__dirname)
  .filter(file => _.includes(file, '.model.js'));
