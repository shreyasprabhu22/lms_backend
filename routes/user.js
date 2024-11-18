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

// Get courses taken by user
router.get('/coursesTaken/:id', getCoursesTakenByUser);
// Get all users
router.get('/', getUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Delete a user
router.delete('/:id', deleteUser);



router.post('/login', loginUser);

router.post('/check-email', findUserByEmail);

router.put('/updatecourses/:id',updateCourses)

//update password
router.put('/update-password', updatePassword);
//update courses using user id 
router.put('/:id', updateCourses);
//update user using user id
router.put('/update/:id', updateUser);


module.exports = router;
