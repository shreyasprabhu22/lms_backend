const express = require('express');
const router = express.Router();
const { 
  createUser, 
  getUsers, 
  getUserById, 
  updateCourses, 
  deleteUser, 
  getCoursesTakenByUser,
  loginUser,
  createUsers,
  findUserByEmail,
  updatePassword,
  updateUser
} = require('../controllers/userController');

// Create a new user
router.post('/', createUser);
router.post('/all', createUsers);

// Get all users
router.get('/', getUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Delete a user
router.delete('/:id', deleteUser);

// Get courses taken by user
router.get('/coursesTaken/:id', getCoursesTakenByUser);


router.post('/login', loginUser);

router.post('/check-email', findUserByEmail);



//update password
router.put('/update-password', updatePassword);
//update courses
router.put('/:id', updateCourses);
//update user
router.put('/update/:id', updateUser);



module.exports = router;
