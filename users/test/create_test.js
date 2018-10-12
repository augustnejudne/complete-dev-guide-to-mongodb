const assert = require('assert');
const User = require('../src/user');

// describe comes from Mocha
// it takes two arguments
// the first is a string that describes the test
// the second is a function
describe('Creating records', () => {
  // the it function takes the same arguments as describe
  // inside every single it function, we need to make an assertion
  // to make an assertion, we need to make an assertion library at the top of our file
  // we assert to make an assertion within our it block
  // done is available for every it block and beforeEach statement that we use in mocha
  it('saves a user', (done) => {
    // We create a new instance of User
    // The User model is defined in ../src/user.js
    const joe = new User({ name: 'Joe' });

    // this should save joe to our database
    // this is an asynchronous method
    // save() returns a promise
    joe.save()
      .then(() => {
        // has joe been saved successfully?
        assert(!joe.isNew);
        done();
      });
  });
});

