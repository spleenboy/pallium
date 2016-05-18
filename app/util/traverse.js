import _ from 'lodash';

// Traverses an entire object's property structure, calling the callback
// method for each encountered value. The callback is invoked with three
// arguments: (value, keyPath). The keyPath value is an array of
// the parent keys used to access the specified value.
export default function traverse(object, callback, keyPath = []) {

  if (keyPath.length) {
    callback(object, _.clone(keyPath));
  }

  if (!_.isObject(object)) {
    return;
  }

  _.forOwn(object, (val, key) => {

    const myPath = _.clone(keyPath);
    myPath.push(key);
    callback(val, myPath);

    if (_.isArray(val)) {

      val.forEach((item, index) => {
        const arrayPath = _.clone(myPath);
        arrayPath.push(index);
        traverse(item, callback, arrayPath);
      });

    } else if (_.isObject(val)) {

      traverse(val, callback, myPath);

    }
  });
}
