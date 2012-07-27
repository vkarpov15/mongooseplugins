var request = require('request')

var search = require('../lib/search')
search.on('error', function (err) {
  console.error('npm search error', err);
});

module.exports = exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.head('/search/:term?', function (req, res) {
    res.end();
  });

  app.get('/search/:term?', function (req, res, next) {
    var term = req.query.term || req.params.term;

    console.log('searching for %s', term);

    search(term, function (err, results) {
      if (err) return next(err);
      res.send(results || []);
    });
  });

  // github api v3 doesn't easily provide watchers count
  // so, just scrape the public repo page
  app.get('/watchers/:repo', function (req, res, next) {
    var repo = req.params.repo;

    // cached?
    if (search.cache && search.cache.__repo__ && search.cache.__repo__[repo]) {
      console.log('watchers cache hit: %s', repo);
      return res.end(search.cache.__repo__[repo]);
    }

    console.log('watchers lookup: %s', repo);
    request(repo, function (err, response, body) {
      if (err) return next(err);

      var watchers = /\/watchers">([0-9,]+)</.exec(body);

      // bad response or github changed their markup
      if (!(watchers && watchers.length))
        return res.send(404)

      if (search.cache) {
        // cache it for later
        search.cache.__repo__ || (search.cache.__repo__ = {});
        search.cache.__repo__[repo] = watchers[1];
      }

      res.end(watchers[1]);
    });
  })


  return app;

}

