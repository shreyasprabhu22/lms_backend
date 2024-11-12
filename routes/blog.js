const express = require('express');
const router = express.Router();
const { 
  createBlog, 
  getBlogs, 
  getBlogById, 
  updateBlog, 
  deleteBlog, 
  getUpcomingBlogs  // Add the route for upcoming blogs
} = require('../controllers/blogController');

// Blog routes
router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

// New route for fetching upcoming blogs
router.get('/upcoming', getUpcomingBlogs);  // This will list blogs in the near future

module.exports = router;
