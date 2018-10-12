const mongoose = require('mongoose');

// We're telling mongoose to use global.Promise whenever it creates Promises
mongoose.Promise = global.Promise;

// we want mocha to wait until we have successfully connected to MongoDB
// so we reference our done callback
// and once we successfully connect to mongo, we call our done callback
// this means that we are not going to run any tests until our connection is successfully made
before(done => {
  // mongoose.connect(`mongodb://augustnejudne:pringles1432@ds261540.mlab.com:61540/complete-dev-guide-to-mongodb`, { useNewUrlParser: true});
  mongoose.connect(
    'mongodb://localhost/users_test',
    { useNewUrlParser: true }
  );
  mongoose.connection
    // 'open' and 'error' are very particular events
    .once('open', () => {
      done();
    })
    .on('error', error => console.warn('Error', error));
});

// we add a hook
// a hook is a function that will be executed before any test gets executed inside of our test suite
// this done right here tells mocha that when I call done, I'm done with this function, you can now run the next test;
beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  // we tell mongoose to drop our users collection before every single test
  // drop accepts a callback function that executes once it is done dropping
  // at this point, ready to run the next test
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
