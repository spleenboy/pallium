---
title: References
---
Whenever you what to use a reference instead of a value, you'll write `{"reference": "reference_key"}`, where `reference_key` is the key you gave this snippet of JSON. For example, this:

```
{
  "references": {
    "docTitle": {
      "name": "title",
      "label": "Title",
      "hint": "The title of this document",
      "defaultValue": "New Document",
      "searchable": true,
      "validation": [
      {
        "type": "required"
      }
      ]
    }
  }
```

Will let you define a title field in a contentType like this:

```
{
  "contentTypes": [
    {
      "fields": [
        {"reference": "docTitle"}
      ]
    }
  ]
}
```