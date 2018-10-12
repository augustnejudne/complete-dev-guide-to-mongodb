const assert = require('assert');
const User = require('../src/user');

describe('Reading users from database', () => {
  let alex, joe, maria, zach;

  beforeEach(done => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()]).then(() =>
      done()
    );
  });

  it('Finds all users with name: "Joe"', done => {
    // you always have to pass an object as criteria for search
    User.find({ name: 'Joe' })
      // find returns an array of records
      .then(users => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });
  it('Find a user with a particular ID', done => {
    // you always have to pass an object as criteria for search
    User.findOne({ _id: joe._id })
      // findOne returns a single user
      .then(user => {
        assert(user.name === 'Joe');
        done();
      });
  });

  // we can sort and skip and limit
  it.only('can skip and limit the result set', () => {
    User.find()
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        users.forEach(u => {
          console.log(u.name);
        });
      });
  });
});
