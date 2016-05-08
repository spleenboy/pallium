import * as Calculate from './Calculate';
import path from 'path';
import uid from '../../storage/uid';
import slug from '../../storage/slug';

export default class Content {
  constructor(project, data = {}, _id = null) {
    this._id = _id || uid();
    this.project = project;
    this.contentType = project.contentType;
    this.values = {};
    this.load(project.contentType.fields, data);
  }

  toJson() {
    return {
      _id: this._id,
      contentType: this.contentType.settings.handle,
      title: this.title,
      directory: this.directory,
      filename: this.filename,
      fullpath: this.fullpath,
      metadata: this.metadata,
      values: this.values,
    }
  }

  calculate(parts) {
    parts = (!Array.isArray(parts)) ? [parts] : parts;
    const values = this.values;
    return parts.map(part => {
      if (typeof part === 'object' && part.type in Calculate) {
        return Calculate[part.type](values, part);
      } else {
        return part;
      }
    });
  }

  get title() {
    const parts = this.calculate(this.contentType.storage.title);
    return parts.join(' ');
  }

  get metadata() {
    const result = {};
    const settings = this.contentType.storage.metadata;
    if (!settings) {
      return result;
    }
    for (let key in settings) {
        result[key] = this.calculate(settings[key]).join(' ');
    }
    return result;
  }

  get filename() {
    const parts = this.calculate(this.contentType.storage.filename);
    return parts.join('') + '.' + this.contentType.storage.extension;
  }

  get directory() {
    const parts = this.calculate(this.contentType.storage.directory);
    return parts.join(path.sep);
  }

  get fullpath() {
    let baseDir = path.join(path.dirname(this.project.path), this.project.directory);
    return path.join(baseDir, this.directory, this.filename);
  }

  set(key, value) {
    const field = this.contentType.fields.find(f => f.name === key);
    if (!field) {
      console.error("Invalid key", key);
      return;
    }

    if ("value" in field) {
      // Can't overwrite these
      this.values[key] = field.value;
    } else {
      this.values[key] = value;
    }
  }

  get(key) {
    return this.values[key];
  }

  load(fields, data) {
    this.values = {};
    fields.forEach(field => {
      let key = field.name || field.label;
      if (key && "value" in field) {
        // A value is forced by the content type.
        this.values[key] = field.value;
      } else if (key in data) {
        // A value is specified in the data. 
        this.values[key] = data[field.name];
      } else if (key && "defaultValue" in field) {
        // Use the default.
        this.values[key] = field.defaultValue;
      } else if (key) {
        // Nothing to see
        this.values[key] = "";
      }
    });
  }
}
