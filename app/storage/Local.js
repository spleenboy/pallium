import _ from 'lodash';

export default class Local {
  constructor(store = null) {
    this.store = store || localStorage;
  }

  get(keys) {
    const json = _.get(this.store, keys);
    return json && JSON.parse(json);
  }


  set(keys, value) {
    const json = JSON.stringify(value);
    _.set(this.store, keys, value);
  }
}
