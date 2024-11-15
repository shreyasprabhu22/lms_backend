const express = require('express');
const router = express.Router();
const {
  getCart,
  addCourseToCart,
  removeCourseFromCart,
  getCartWithCourses
} = require('../controllers/cartController');

// Get the user's cart
router.get('/:userId', getCart);

router.get('/:userId/courses', getCartWithCourses);

// Add a course to the cart
router.post('/:userId', addCourseToCart);

// Remove a course from the cart
router.delete('/:userId/remove', removeCourseFromCart);

module.exports = router;
