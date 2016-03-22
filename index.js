require('./lib/server')(3000, 'mongodb://localhost:27017/plugins', console.log).
  then(() => {
    console.log('Listening on 3000');
  }).
  catch(error => {
    console.error(error.stack);
    process.exit(1);
  });
