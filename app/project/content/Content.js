import * as Calculate from './Calculate';
import path from 'path';

export default class Content {
  constructor(contentType, data = {}) {
    this.contentType = contentType;
    this.values = {};
    this.load(data);
  }

  toJson() {
    return {
      title: this.title,
      filename: this.filename,
      directory: this.directory,
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
    return null;
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

  load(data) {
    this.values = {};
    this.contentType.fields.forEach(field => {
      if ("value" in field) {
        // A value is forced by the content type.
        this.values[field.name] = field.value;
      } else if (field.name in data) {
        // A value is specified in the data. 
        this.values[field.name] = data[field.name];
      } else if ("defaultValue" in field) {
        // Use the default.
        this.values[field.name] = field.defaultValue;
      } else {
        // Nothing to see
        this.values[field.name] = null;
      }
    });
  }
}
