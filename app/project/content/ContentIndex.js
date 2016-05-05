import path from 'path';
import Datastore from 'nedb';

/**
 * Singleton datastores
**/
const stores = {};

/**
 * Manages the list of content for a project
**/
export default class ContentIndex {
  constructor(project) {
    const baseDir = path.dirname(project.path);
    const filename = path.join(baseDir, project.database);
    if (!stores[filename]) {
      stores[filename] = new Datastore({filename, autoload: true});
    }
    this.store = stores[filename];
  }

  // Saves a JSON content object
  save(doc) {
    return new Promise((resolve, reject) => {
      this.store.findOne({_id: doc._id}, (err, oldDoc) => {
        if (err) {
          return reject(err);
        }
        if (oldDoc) {
          this.store.update(oldDoc, doc, (err, num) => {
            err && reject(err) || resolve({doc, oldDoc});
          });
        } else {
          this.store.insert(doc, (err, doc) => {
            err && reject(err) || resolve({doc});
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
