module.exports = exports = function (app) {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  return app;
}
