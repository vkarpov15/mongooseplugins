var express = require('express')

module.exports = exports = function (app) {

  app.configure('development',function(){
    app.use(express.logger('dev'));
    app.use(express.favicon());
  })

  app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('gooseplugins'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  app.configure('development',function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  })

  app.configure('production',function(){
    app.use(express.errorHandler());
  })

  return app;
}
