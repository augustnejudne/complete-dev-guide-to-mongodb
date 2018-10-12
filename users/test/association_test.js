// const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const Comment = require('../src/comment');

describe('Associations', () => {
  let joe, blogpost, comment;
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogpost = new BlogPost({ title: 'JS is Great', content: 'Yes it is.' });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogposts.push(blogpost);
    blogpost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogpost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogposts')
      .then(user => {
        assert(user.blogposts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation tree', done => {
    User.findOne({name:'Joe'})
      .populate({
        path: 'blogposts',
        model: 'blogpost',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogposts[0].title === 'JS is Great');
        assert(user.blogposts[0].comments[0].content = 'Congrats on great post');
        assert(user.blogposts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
