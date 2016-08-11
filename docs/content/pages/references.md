---
title: References
sequence: 4
---
Whenever you what to use a reference instead of a value, you'll write `{"reference": "reference_key"}`, where `reference_key` is the key you gave this snippet of JSON. For example, this:

```
{
  "references": {
    "slug": [
      {
        "type": "required"
      },
      {
        "type": "pattern",
        "value": "^[a-z\-]+$"
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
        {
          "name": "url",
          "label": "URL",
          "validation": {
            "reference": "slug"
          }
      ]
    }
  ]
}
```