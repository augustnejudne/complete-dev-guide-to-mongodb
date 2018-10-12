const mongoose = require('mongoose');
// mongoose.Schema creates a new Schema
const Schema = mongoose.Schema;

const PostSchema = require('./post');

// We create the UserSchema with a name of type String
// We can use this in mongoose to use a new model
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than two characters'
    },
    required: [true, 'Name is required']
  },
  posts: [PostSchema],
  likes: Number,
  blogposts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogpost' // this refers to the blogpost model
    }
  ]
});

// this is a virtual property that returns the value of this.posts.length;
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const Blogpost = mongoose.model('blogpost');
  // this removes all Blogposts whose ID appears in this.blogposts
  // if the _id is in the array this.blogposts, remove it
  Blogpost.deleteMany({ _id: { $in: this.blogposts } })
  // next executes the next middleware
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
