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
}

mongodb.MongoClient.connect('mongodb://localhost:27017/plugins').
  then(db => db.dropDatabase().then(() => db)).
  then(db => {
    let outstanding = 0;
    let done = false;

    http.get(ALL_MODULES_ENDPOINT, req => {
      req.pipe(jsonstream.parse('*')).
        on('data', data => {
          if (data.keywords && search(data.keywords)) {
            console.log('insert', data.name);
            ++outstanding;
            db.collection('packages').insert(clean(data)).then(() => {
              --outstanding;
              if (outstanding <= 0 && done) {
                console.log('done');
                process.exit(0);
              }
            }).catch(error => {
              console.error(data, error.stack);
              process.exit(1);
            });
          }
        }).
        on('error', error => { console.error(error.stack); process.exit(1) }).
        on('end', () => {
          done = true;
          if (!outstanding) {
            console.log('done');
            process.exit(0);
          }
        });
    });
  }).
  catch(error => { console.error(error.stack); process.exit(1); });
