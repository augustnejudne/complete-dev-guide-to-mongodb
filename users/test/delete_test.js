const assert = require('assert');
const User = require('../src/user');

describe('Deleting users from database', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', done => {
    // first we remove joe
    // over here, we're saying remove the joe instance
    joe
      .remove()
      // then we findOne joe
      .then(() => User.findOne({ name: 'Joe' }))
      // then we check if the returned user is null
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteMany', done => {
    // Remove a bunch of records with some given criteria
    // over here, we're saying remove the User with { name: 'Joe' }
    // User.remove({ name: 'Joe' })
    //   .then(() => User.findOne({ name:'Joe' }))
    //   .then((user) => {
    //     assert(user === null);
    //     done();
    //   })
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteOne', done => {
    User.deleteOne({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteOne by id', done => {
    User.deleteOne({ _id: joe._id })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
