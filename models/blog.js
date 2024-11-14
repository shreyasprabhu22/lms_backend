const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blog_id:String,
  title: String,
  content: String,
  author: String,
  authorImage : String,
  date: Date,
  description: String,
  category: String,
  images: [String]
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
