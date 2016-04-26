import Datastore from 'nedb';

/**
 * Singleton datastores
**/
const stores = {};

/**
 * Manages the list of content for a project
**/
export default class ContentIndex {
  constructor(filename) {
    if (!stores[filename]) {
      stores[filename] = new Datastore({filename, autoload: true});
    }
    this.store = stores[filename];
  }

  save(content) {
    const record = content.toJson();
    return new Promise((resolve, reject) => {
      this.store.findOne({_id: content._id}, (err, old) => {
        if (err) {
          return reject(err);
        }
        if (old) {
          this.store.update(old, record, (err, num) {
            err && reject(err) || resolve(record, old);
          });
        } else {
          this.store.insert(record, (err, doc) {
            err && reject(err) || resolve(doc);
          });
        }
      });
    });
  }

  remove(_id) {
    return new Promise((resolve, reject) => {
      this.store.remove({_id}, (err, num) => {
        err && reject(err) || resolve(num);
      });
    });
  }

  find(search) {
    return new Promise((resolve, reject) => {
      this.store.find(search, (err, docs) => {
        err && reject(err) || resolve(docs);
      });
    });
  }
}
