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
var port = process.env.PORT || 7999;
app.listen(port, function () {
  console.error('plugins.mongoosejs.com now listening on http://%s:%s', 'localhost',
   port);
});


