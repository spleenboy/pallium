---
title: Allow Reusable References
status: Complete
priority: Medium
---
In the configuration file, allow configuration of re-usable field definitions.


At the root of the project: 

```
{
    "references": {
        "referenceId": {
            ... (reference object)
        }
    }
}
```

In field references:
```
{
    "keyName": {"reference": "referenceId"}
}
```

When loading the project, scan all values and replace references when possible.