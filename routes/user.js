const express = require('express');
const router = express.Router();
const { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  updateCoursesTaken, 
  updateSubscription ,
  getCoursesTakenByUser
} = require('../controllers/userController');

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

// Update courses taken (add/remove courses)
router.put('/:id/courses', updateCoursesTaken);

// Update user subscription
router.put('/:id/subscription', updateSubscription);

router.get('/:id/courses', getCoursesTakenByUser);

module.exports = router;
