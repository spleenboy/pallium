import {safeLoad, dump} from 'js-yaml';

export const EMPTY_JSON_OBJECT = JSON.stringify({});
export const JSON_FORMAT = 'json';
export const YAML_FORMAT = 'yaml';
export const ENCODING = 'utf8';

/**
 * Handles import and export of json or yaml.
 * May also handle Markdown files prefixed with
 * json or yaml front-matter.
 **/
export default class Transport {
  constructor(format = YAML_FORMAT, contentKey = null) {
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
    return Object.assign({}, output);
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
      data[this.contentKey] = (parts.content || '').trim();
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

    if (this.format === YAML_FORMAT) {
        front = dump(data);
    } else if (this.format === JSON_FORMAT) {
        front = JSON.stringify(data, true);
    } else {
        front = '';
    }

    if (this.contentKey) {
      return '---\n' + front.trim() + '\n---\n' + content;
    } else {
      return front;
    }
  }
}
