'use strict';

const co = require('co');
const express = require('express');
const mongodb = require('mongodb');
const update = require('./update');

module.exports = (port, uri, log) => co(function*() {
  const app = express();
  const db = yield mongodb.MongoClient.connect(uri);
  const collection = db.collection('packages');

  yield collection.createIndex({
    name: 'text',
    keywords: 'text',
    description: 'text'
  });

  startUpdate(db);

  const count = yield collection.count();
  if (!count) {
    update(db, log);
  }

  app.use(express.static('../bin'));

  app.get('/search/:search', (req, res) => co(function*() {
    const query = { $text: { $search: req.params.search } };
    const projection = {
      score: { $meta: 'textScore' },
      name: 1,
      _id: 1,
      'dist-tags': 1
    };
    const sort = { score: { $meta: 'textScore' } };
    const results = yield collection.
      find(query, projection).
      sort(sort).
      limit(20).
      toArray();
    res.json({ packages: results });
  }).catch(error => res.status(500).json({ error: error.toString() })));

  return {
    db: db,
    server: app.listen(port),
    update: update
  };
});

const startUpdate = (db, log) => {
  return setInterval(() => {
    update(db, log);
  }, 24 * 60 * 60 * 1000);
};
