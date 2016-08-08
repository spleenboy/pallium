import _ from 'lodash';

export default class Local {
  constructor(store = null) {
    this.store = store || window.localStorage;
  }

  get(key) {
    const json = _.get(this.store, key);
    try {
      return json && JSON.parse(json);
    } catch (e) {
        console.error("Error getting data from key", key, e);
        return null;
    }
  }


  set(key, value) {
    const json = JSON.stringify(value);
    _.set(this.store, key, json);
  }
}
