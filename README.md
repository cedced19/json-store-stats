# json-store-stats

[![Build Status](https://travis-ci.org/cedced19/json-store-stats.svg?branch=master)](https://travis-ci.org/cedced19/json-store-stats)

Simple JSON database to use with a Rest Api.

```bash
npm i --save json-store-stats
```

This module is inspired from [juliangruber/json-store](https://github.com/juliangruber/json-store). The main difference is that `json-store-stats` is build to count things with id.

First init the store (make sure that the path is correctly defined):
```javascript
var JSONStore = require('json-store-stats');
var db = JSONStore('./index.json');
```

## Functions

* `db.getAll()`: get the whole file
* `db.get(id)`: get the value for the id, example: `db.get('ND9gB')`
* `db.add(id, cb)`: increment value for the id, example: `db.add('ND9gB', function (err, val) {...})`
* `db.purge(cb)`: reset the file, example: `db.purge(function (err) {...})`