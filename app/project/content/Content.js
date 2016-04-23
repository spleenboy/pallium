export default class Content {
  constructor(contentType, data = {}) {
    this.contentType = contentType;
    this.values = {};
    this.load(data);
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
