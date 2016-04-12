import {safeLoad, safeDump} from ('js-yaml');

export const Json = 'json';
export const Yaml = 'yaml';

export default class Transport {
  constructor(format = Json, contentKey = null) {
    this.format = format;
    this.contentKey = contentKey;
  }

  // Splits out front matter from the remainder of a string
  split(input) {
    const re = /^(---(?:\n|\r)([\w\W]+?)(?:\n|\r)---)?([\w\W]*)*/;
    const results = re.exec(input);
    return {
      front: results[2],
      content: results[3],
    }
  }

  clean(output) {
    const data = ...output;
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
      else if (typeof data[key] === 'object') {
        data[key] = this.cleanup(data[key]);
      }
    });
    return data;
  }

  import(input) {
    const parts = this.split(input);
    let data = {};

    if (parts.front && parts.front.charAt(0) === '{') {
      data = JSON.parse(parts.front);
    } else if (parts.front) {
      data = safeLoad(parts.front);
    }

    if (this.contentKey) {
      data[this.contentKey] = parts.content || '';
    }

    return data;
  }

  export(output) {
    const data = this.clean(output);
    let content, front;
    
    if (this.contentKey) {
      content = data[this.contentKey] || '';
      delete data[this.contentKey];
    } else {
      content = '';
    }

    if (this.format === Yaml) {
        front = safeDump(data);
    } else if (this.format === Json) {
        front = JSON.stringify(data, true);
    } else {
        front = '';
    }

    if (this.contentKey) {
      return '---\n' + front + '---\n' + content;
    } else {
      return front;
    }
  }
}
