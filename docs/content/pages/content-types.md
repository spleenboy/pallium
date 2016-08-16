---
title: Content Types
slug: content-types
template: page.jade
filename: '/:file/index.html'
sequence: 2
---
Each content type may have a different set of fields and rules for how and where content is saved. For example, this is a portion of the content type for `Pages`, which are used for this documentation.

```
"contentTypes": [
    {
      "settings": {
        "title": "Page",
        "plural": "Pages",
        "handle": "page",
        "description": "Main pages",
        "icon": "description",
        "orderBy": ["values.sequence", "values.title"],
        "orderDirection": [false, true]
      },
      "storage": {
        "contentKey": "content",
        "format": "yaml",
        "extension": "md",
        "directory": ["pages"],
        "metadata": {
            "Sequence": {
              "type": "reflect",
              "field": "sequence"
            }
        },
        "filename": [
          {
            "type": "kebab",
            "field": "title"
          }
        ],
        "title": [
          {
            "type": "reflect",
            "field": "title"
          }
        ]
      },
      "fields": [...]
    }
]
```