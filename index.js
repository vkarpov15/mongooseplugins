'use strict';

const co = require('co');
const mkdirp = require('mkdirp');
const mongodbVersionManager = require('mongodb-version-manager');
const server = require('./lib/server');
const topologyManager = require('mongodb-topology-manager');

co(function*() {
  const uri = 'mongodb://localhost:27017/plugins';
  const port = process.env.PORT || 3000;
  const mongodPath = `${yield mongodbVersionManager.path}/mongod`;
  yield callback => mkdirp('./data', callback);
  const mongod = new topologyManager.Server(mongodPath, {
    dbpath: './data'
  });

  yield mongod.start();

  yield server(port, uri, console.log);

  console.log(`Listening on ${port}`);
}).catch(error => {
  console.error(error.stack);
  process.exit(1);
});
