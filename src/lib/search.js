var toGitUrl = require('github-url-from-git');
var npm = require('npm');
var devnull = require('fs').openSync('/dev/null', 'w');
var redis = require('redis').createClient({
    host: 'redis'
});

var BreakException = {};

var Connection = require('cradle').Connection;
var couch = new Connection('couchdb', 5984, {
    cache: true
});

var setupComplete = false;

var db = couch.database('registry');

// load npm
function initNPM(callback) {
    npm.load({ logfd: devnull, outfd: devnull }, callback);
}

// Setup the DB
function initDB(callback) {
    db.exists(function (err, exists) {
        if (err) {
          console.error(err);
          callback(err);
        }

        // TODO: Remove this and figure out a way to update the database while preventing duplication
        if (exists) {
            db.destroy();
        }

        console.log('Creating registry database');
        db.create();
        callback(null);
    });
}

// Get all the mongoose packages from mongoose and load them into couchDB
function populateDB(callback) {
    npm.commands.search(['mongoose'], function(error, payload) {
        if (error) {
            throw error;
        }
        var packages = [];

        for (var record of Object.keys(payload)) {
            packages.push(payload[record]);
        }

        db.save(packages);
    });
}

// TODO: Refactor this away from callback hell
(function() {
    initNPM(function(err) {
        initDB(function(err) {

            // Add a view for listing all the packages (can filter by key, i.e. ?key="zen")
            db.save('_design/packages', {
              views: {
                all: {
                    map: function (doc) {
                      if (doc.name) emit(doc.name, doc);
                    }
                }
              }
            });

            populateDB(function(err) {
                setupComplete = true;
            });

        });
    });
})();

// Export search function
module.exports = exports = function search (term, cb) {
    if ('function' != typeof cb) throw TypeError('missing callback');
    console.log('Searching for term', term);
    redis.get(term, function(err, reply) {
        console.log('Redis result..', reply);
        reply = JSON.parse(reply);
        if (reply && reply.length > 0) {
            console.log('Found redis entry matching term', reply);
            return cb(null, reply);
        } else {
            // By passing startkey we can query against couchdb, but it can behave oddly
            db.view('packages/all', { /* startkey: term, */ descending: false }, function (err, docs) {
                if (err) cb(err);
              
                var results = docs
                // Back to array from docs collection
                .map(function(doc) {
                    return doc;
                })
                // Filter by term
                .filter(function(doc) {
                    // Get an array of words from the name and keywords
                    var fragments = doc.keywords.split(' ').concat(doc.name.split(/-|_/g));
                    var match = false
                    var term_fragments = term.toLowerCase().split(" ");
                    try {
                        fragments.forEach(function(fragment) {
                            term_fragments.forEach(function(term_fragment) {
                                if (fragment.length > 2 && 
                                    term_fragment.length > 2 && 
                                    fragment.toLowerCase().indexOf(term_fragment) === 0) {

                                    match = true;
                                    throw BreakException;
                                }
                            });
                        });
                    }  catch (e) {
                        if (e!==BreakException) throw e;
                        else return match;
                    }
                    
                    return match;
                });

                // Update redis
                redis.set(term, JSON.stringify(results));
                cb(null, results);
            });
        }
    });
}
