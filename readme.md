# json-credentials2

A Node.js package for saving and reading credentials data into/from JSON file

## How it works

### A credentails format file (**xxxx.credentials**) looks like:

```test.credentials
[section1]
key1=value1
key2=value2

[section2]
key1=value2
key2=value2

```

Each credentials file contains some sections, and each section has multiple key-value paris. Each section will not affect with each other.

**json-credentials2** can read such a file to json data:

```json
{
    "section1": {
        "key1": "value1",
        "key2": "value2"
    },
    "section2": {
        "key1": "value1",
        "key2": "value2"
    }
}
```

### Usage

#### Load data from credentials file

-   method: **loadCredentialsToJson(path)**
-   params:
    -   path: The path of file you want to read from

```javascript
const { loadCredentialsToJson } = require("json-credentials2");

const jsonData = loadCredentialsToJson("/test.credentials");

const section1Data = jsonData.section1;
```

#### Write json to credentials file

-   method: **writeJsonToCredentials(data, path)**
-   params:
    -   data: The json data you want to save
    -   path: The path(include file path and file name) you want to save on

```javascript
const { writeJsonToCredentials } = require('json-credentials2');

writeJsonToCredentials({
    section1: {
        name: 'name',
        age: 1
    }
    section2: {
        name: 'name',
        age: 1
    }
}, '/test.credentials')

```
