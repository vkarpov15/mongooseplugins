var npm = require('npm');
var get = require('npm/lib/utils/npm-registry-client').get;
var devnull = require('fs').openSync('/dev/null', 'w');

var interval = 120 // seconds
var updating = false;
var cachekeys;

// load npm
npm.load({ logfd: devnull, outfd: devnull }, function (err) {
  // dead if no npm :(
  if (err) throw err;

  // update every `interval` seconds
  setInterval(loadResults(), interval*1000);
});

function loadResults () {
  console.error('  updating cache...');
  updating = true;

  npm.commands.search(['mongoose'], function (err, r) {
    if (err) return error(err);

    var names = Object.keys(r)
      , pending = 0

    names.forEach(function (name) {
      ++pending;

      get('/'+ name, function (err, json) {
        if (err) return error(cb.err = err);

        var git = json.repository && /^git$/i.test(json.repository.type)
          ? json.repository.url
          : ''

        var isclone = /^git([@:]{1})/i.exec(git);
        var isprivate = isclone && '@' == isclone[1];

        // fix github http urls
        r[name].github = isclone
          ? isprivate
            ? git.replace(/^git@github.com:/i, 'https://github.com/').replace(/\.git$/, '')
            : git.replace(/^git:/, 'https:').replace(/\.git$/, '')
          : /^http/i.test(git)
            ? git
            : ''

        // fix git clone urls
        r[name].git = isclone
          ? isprivate
            ? git.replace(/^git@github.com:/i, 'git://github.com/')
            : git
          : '';

        if (--pending) return;

        console.error('  cache updated');

        updating = false;
        search.cache = r;
        cachekeys = [];
        Object.keys(search.cache).some(function (key) {
          // don't display mongoose in results
          if ('mongoose' == key) return;
          var hit = search.cache[key];
          ;[key].concat(hit.words || []).forEach(function (word) {
            var rgx = new RegExp(rgEscape(word), 'i');
            rgx.key = key;
            cachekeys.push(rgx);
          });
        });
        search.emit('results', r);
      });
    });
  })

  function error (err) {
    updating = false;
    exports.emit('error', err);
  }

  return loadResults;
}

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

  // TODO
  // each result should be a link back to this site that then looks up the github url?
  // or, auto lookup these results and get their github urls (search filters them out)

  function find (term) {
    term || (term = '');
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
      return a.name < b.name
        ? -1
        : b.name < a.name
          ? 1
          : 0
    });

    return hits;
  }
}

search.__proto__ = require('events').EventEmitter.prototype;
