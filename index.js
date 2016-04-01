'use strict';

const co = require('co');
const mkdirp = require('mkdirp');

const server = require('./lib/server');


co(function*() {
  const uri = process.env.MONGODB || 'mongodb://localhost:27017/plugins';
  const port = process.env.PORT || 3000;

  yield server(port, uri, console.log);

  console.log(`Listening on ${port}`);
}).catch(error => {
  console.error(error.stack);
  process.exit(1);
});
