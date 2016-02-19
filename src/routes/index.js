var request = require('request');
var express = require('express');
var search = require('../lib/search');

var router = new express.Router;



    router.get('/', function (req, res) {
        var term = req.query.q || '';
        res.render('index', { term: term });
    });

    router.head('/search/:term?', function (req, res) {
        res.end();
    });

    router.get('/search/:term?', function (req, res, next) {
        var term = req.query.term || req.params.term;

        console.log('searching for %s', term);

        search(term, function (err, results) {
            if (err) return next(err);
            res.send(results || []);
        });
    });

    // github api v3 doesn't easily provide watchers count
    // so, just scrape the public repo page
    router.get('/watchers/:repo', function (req, res, next) {
        var repo = req.params.repo;

        console.log('watchers lookup: %s', repo);
        request(repo, function (err, response, body) {
            if (err) return next(err);

            var watchers = /\/stargazers">([0-9,\s]+)</mg.exec(body);

            // bad response or github changed their markup
            if (!(watchers && watchers.length))
                return res.send(404)

            var stars = watchers[1] && String(watchers[1]).trim();

            if (search.cache) {
                // cache it for later
                search.cache.__repo__ || (search.cache.__repo__ = {});
                search.cache.__repo__[repo] = stars;
            }

            res.end(stars);
        });
    })

module.exports = exports = router;