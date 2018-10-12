const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    // the type of comments is an ObjectId
    // Every comment will have its own corresponding ObjectId
    // theis ObjectId will come from the comments model
    // the ref is the identifier
    // the ref will be matched up against the model definition
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogpost', BlogPostSchema);

module.exports = BlogPost;