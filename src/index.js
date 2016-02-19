// plugins.mongoosejs.com
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var logger = require('morgan');

var port = process.env.PORT || 7999;
var env = process.env.NODE_ENV || 'development';
var app = express();

app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
    secret: 'secret-stuff',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(require('./routes'));

app.listen(port, function () {
  console.error('plugins.mongoosejs.com now listening on http://%s:%s', 'localhost', port);
});


