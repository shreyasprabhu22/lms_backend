const express = require('express');
const router = express.Router();
const { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getCoursesTakenByUser,
  loginUser,
  createUsers,
} = require('../controllers/userController');

// Create a new user
router.post('/', createUser);
router.post('/all', createUsers);

// Get all users
router.get('/', getUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

// Get courses taken by user
router.get('/coursesTaken/:id', getCoursesTakenByUser);


router.post('/login', loginUser);

module.exports = router;
