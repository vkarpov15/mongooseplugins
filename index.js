'use strict';

const http = require('http');
const serveStatic = require('serve-static');

const serve = serveStatic('./');

http.createServer((req, res) => { serve(req, res, () => {}); }).listen(8472);
