var toGitUrl = require('github-url-from-git');
var npm = require('npm');
var devnull = require('fs').openSync('/dev/null', 'w');
var cache = [];

// load npm
npm.load({ logfd: devnull, outfd: devnull }, function (err) {
  // dead if no npm :(
  if (err) throw err;

  loadCache();
});

function loadCache() {
  cache = [];
  npm.commands.search(['mongoose'], function(error, r) {
    if (error) {
      throw error;
    }
    for (var key in r) {
      cache.push(r[key]);
    }
    console.log('Cache loaded');
  });
}

var search = module.exports = exports = function search (term, cb) {
  if ('function' != typeof cb) throw TypeError('missing callback');

  var res = [];
  cache.forEach(function(m) {
    if (m.keywords.split(' ').indexOf(term) !== -1) {
      res.push(m);
    }
  });

  cb(null, res);
}
