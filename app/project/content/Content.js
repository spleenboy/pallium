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
    this.dirty = false;
    this.valid = true;
    this.load(project.contentType.fields, data);
  }

  toJson() {
    return {
      _id: this._id,
      contentType: this.contentType.settings.handle,
      dirty: this.dirty,
      valid: this.valid,
      title: this.title,
      directory: this.directory,
      basedir: this.basedir,
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

  get basedir() {
    return path.join(path.dirname(this.project.path), this.project.contentDirectory);
  }

  get assetdir() {
    return path.join(path.dirname(this.project.path), this.project.assetDirectory);
  }

  get fullpath() {
    return path.join(this.basedir, this.directory, this.filename);
  }

  expandAssetShortPath(definition, shortpath) {
    return path.join(
      this.assetdir,
      shortpath
    );
  }

  calculateAssetShortPath(definition, fullpath) {
    const filename = path.basename(fullpath);

    if (!definition.directory) {
      return filename;
    }

    const subdirs = this.calculate(definition.directory);
    return path.join(
      subdirs.join(path.sep),
      filename
    );
  }

  assetShortPathToFullPath(shortpath) {
    return path.join(
      this.assetdir,
      shortpath
    );
  }

  set(key, value) {
    const field = this.contentType.fields.find(f => f.name === key);
    if (!field || !key) {
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
