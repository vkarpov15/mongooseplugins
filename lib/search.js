var toGitUrl = require('github-url-from-git');
var npm = require('npm');
var devnull = require('fs').openSync('/dev/null', 'w');
var fs = require('fs');
var cachefile = __dirname + "/npmcache.json";
var interval = 60*60*12 // 12 hrs
var updating = false;
var cachekeys;

// load npm
npm.load({ logfd: devnull, outfd: devnull }, function (err) {
  // dead if no npm :(
  if (err) throw err;

  // update every `interval` seconds
  setInterval(loadResults(), interval*1000);
});

function rgEscape (str) {
  return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
}

var search = module.exports = exports = function search (term, cb) {
  if ('function' != typeof cb) throw TypeError('missing callback');

  return search.cache
    ? cb(null, find(term))
    : search.once('results', function () {
        cb(null, find(term));
      });

  function find (term) {
    term || (term = '');
    if ('*' == term) term = '';
    var termRgx = new RegExp(rgEscape(term), 'i');
    var hits = [];
    var found = {};

    cachekeys.forEach(function (rgx) {
      var key = rgx.key || term;
      if (key in found) return;
      if (!term || rgx.test(term) || termRgx.test(rgx.source)) {
        found[key] = 1;
        hits.push(search.cache[key]);
      }
    });

    hits.sort(function (a, b) {
      a = new Date(a.time);
      b = new Date(b.time);
      return a < b
        ? 1
        : b < a
          ? -1
          : 0;
    });

    return hits;
  }
}

search.__proto__ = require('events').EventEmitter.prototype;

// read from cache for quickest startup
try {
  var json = fs.readFileSync(cachefile, 'utf8');
  json = JSON.parse(json);
  processResult(json);
} catch (err) {
  console.error('cache read error', err);
}

function loadResults () {
  console.error('  updating cache...');
  updating = true;

  npm.commands.search(['mongoose'], function (err, r) {
    if (err) return error(err);

    var names = Object.keys(r)
      , pending = 0

    names.forEach(function (name) {
      ++pending;

      npm.commands.view([name + '@latest'], true, function (err, json) {
        if (!err) {
          massage(json);
        }

        if (--pending) return;

        updating = false;
        processResult(r, true);
      });

      function massage (obj) {
        var versions = Object.keys(obj);
        if (!versions.length) return;

        var json = obj[versions[0]];
        if (!json) return;

        var git = json.repository && /^git$/i.test(json.repository.type)
          ? json.repository.url
          : ''

        var url = toGitUrl(git);
        r[name].github = url;
        r[name].git = url;

        // fix time
        var time = json.time && json.time[json.version];
        if (Date.parse(time)) {
          r[name].time = new Date(time).toGMTString();
        }
      }

    });
  })

  function error (err) {
    updating = false;
    search.emit('error', err);
  }

  return loadResults;
}

function processResult (r, writeFile) {
  search.cache = r;
  console.error('  cache updated');

  // cachekeys are regexps used in search
  cachekeys = [];

  Object.keys(search.cache).some(function (key) {
    // don't display mongoose in results
    if ('mongoose' == key) return;

    var hit = search.cache[key];
    var words = [key].concat(hit.words || []);

    if (hit.github) {
      if ('https://github.com/LearnBoost/mongoose' == hit.github) {
        delete search.cache[key];
        return;
      }

      var username = hit.github.replace(/^.*github\.com\/([^\/]+)\/.*/, '$1');
      words.push(username)
    }

    words.forEach(function (word) {
      var rgx = new RegExp(rgEscape(word), 'i');
      rgx.key = key;
      cachekeys.push(rgx);
    });
  });

  search.emit('results', r);

  if (writeFile) {
    fs.writeFile(cachefile, JSON.stringify(r), 'utf8', function (err) {
      // ignore errors
    });
  }
}
