'use strict'

const R = require('ramda');
const http = require('http');
const jsonstream = require('JSONStream');
const mongodb = require('mongodb');

const ALL_MODULES_ENDPOINT = 'http://registry.npmjs.org/-/all';

const search = R.contains('mongoose');
const clean = obj => {
  obj = R.omit(['versions', 'readmeFilename', 'users', 'contributors'], obj);
  obj['dist-tags'] = R.project(['latest'], obj['dist-tags']);
  return obj;
};

module.exports = (db, log) => {
  let outstanding = 0;
  let done = false;

  return new Promise((resolve, reject) => {
    http.get(ALL_MODULES_ENDPOINT, req => {
      req.pipe(jsonstream.parse('*')).
        on('data', data => {
          if (data.keywords && search(data.keywords)) {
            log('insert', data.name);
            ++outstanding;
            const collection = db.collection('packages');
            const query = { _id: data.name };
            const update = clean(data);
            const options = { upsert: true };
            collection.updateOne(query, update, options).then(() => {
              --outstanding;
              if (outstanding <= 0 && done) {
                log('done');
                resolve();
              }
            }).catch(error => {
              log(data, error.stack);
              reject(error);
            });
          }
        }).
        on('error', error => {
          log(error.stack);
          reject(error);
        }).
        on('end', () => {
          done = true;
          if (!outstanding) {
            resolve();
          }
        });
    });
  });
};
