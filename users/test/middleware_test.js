const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');

describe('Middleware', () => {
  let joe, myPost;
  beforeEach(done => {
    // create a new instance of User called joe
    joe = new User({ name: 'Joe' });
    // create a new instance of Blogpost called blogpost
    myPost = new BlogPost({ title: 'JS is Great', content: 'Yes it is.' });

    joe.blogposts.push(myPost);

    Promise.all([joe.save(), myPost.save()]).then(() => done());
  });

  it('users clean up dangling blogposts on remove', done => {
    BlogPost.countDocuments()
      .then((count) => assert(count === 1))
      .then(() => joe.remove())
      .then(() => BlogPost.countDocuments())
      .then((count) => assert(count === 0))
      .catch((err) => console.log('Error:', err))
      .then(() => done());
  });
});
