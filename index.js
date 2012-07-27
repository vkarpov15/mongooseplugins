// plugins.mongoosejs.com

var http = require('http')
  , express = require('express')
  , app = express()

// configure
require('./configure')(app);

// settings
require('./settings')(app);

// routes
require('./routes')(app);

// go!
app.listen(7999, function () {
  console.error('plugins.mongoosejs.com now listening on http://%s:%s', 'localhost',
    7999);
});


