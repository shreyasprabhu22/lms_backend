const express = require('express');
const router = express.Router();
const { 
  createBlog, 
  getBlogs, 
  getBlogById, 
  updateBlog, 
  deleteBlog, 
  getUpcomingBlogs  ,
  createBlogs
} = require('../controllers/blogController');

// Blog routes
router.post('/', createBlog);
router.get('/upcoming', getUpcomingBlogs);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.post('/all', createBlogs);
  

module.exports = router;
