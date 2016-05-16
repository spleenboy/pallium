import path from 'path';
import Datastore from 'nedb';
import _ from 'lodash';

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
    this.project = project;
    this.ensureIndices();
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


  getIndices(contentTypes = null) {
    if (contentTypes === null) {
      contentTypes = this.project.contentTypes;
    }

    if (!contentTypes) {
      return [];
    }

    let fields = [];
    contentTypes.forEach(contentType => {
      if (contentType.storage.contentKey) {
        fields.push(contentType.storage.contentKey);
      }

      const searchable = contentType.fields.filter(field => field.searchable);
      fields = fields.concat(searchable.map(s => s.name));
    });

    return _.uniq(fields)
  }


  ensureIndices() {
    const indices = this.getIndices();
    indices.forEach(index => {
      this.store.ensureIndex({fieldName: index, sparse: true});
    });
  }


  search(terms, contentTypes = null) {
    const searchex = new RegExp(terms, 'ig');
    const indices = this.getIndices(contentTypes);
    const conditions = [];

    indices.forEach(index => {
      const condition = {};
      condition[index] = searchex;
      conditions.push(condition);
    });

    if (!conditions) {
      return Promise.resolve([]);
    }

    return this.find({$or: conditions});
  }
}
