const express = require('express');
const router = express.Router();
const {
  getCart,
  addCourseToCart,
  removeCourseFromCart
} = require('../controllers/cartController');

// Get the user's cart
router.get('/:userId', getCart);

// Add a course to the cart
router.post('/:userId/add', addCourseToCart);

// Remove a course from the cart
router.delete('/:userId/remove', removeCourseFromCart);

module.exports = router;
