const express = require('express');
const router = express.Router();
const { createInstructor, createInstructors, getInstructors, getInstructorById, updateInstructor, deleteInstructor, loginInstructor, getInstructorByEmail, updatePassword, loginInstructorByEmail } = require('../controllers/instructorController');

// Create a new instructor profile
router.post('/', createInstructor);
// Get an instructor by email
router.get('/email/:email', getInstructorByEmail);

// Get all instructors
router.get('/', getInstructors);

// Get an instructor by ID
router.get('/:id', getInstructorById);
// Update instructor password
router.put('/update-password', updatePassword); 

// Update an instructor profile
router.put('/:id', updateInstructor);

// Delete an instructor profile
router.delete('/:id', deleteInstructor);

router.post('/loginInstructorByEmail', loginInstructorByEmail)

router.post('/login', loginInstructor);

router.post('/all', createInstructors);


module.exports = router;
