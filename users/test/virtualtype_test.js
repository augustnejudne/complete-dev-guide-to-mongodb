const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
  it('postCount returns number of posts', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      })
      .catch(err => {
        console.log('ERROR:', err);
        done();
      });
  });

  it('create a user with 0 posts, check post count, add new post, get post count', done => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.postCount === 0);
        user.posts.push({ title: 'I added this' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      })
      .catch(err => {
        console.log('ERROR', err);
        done();
      });
  });
});
