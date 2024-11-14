const express = require('express');
const router = express.Router();
const { createInstructor, createInstructors, getInstructors, getInstructorById, updateInstructor, deleteInstructor, loginInstructor} = require('../controllers/instructorController');

// Create a new instructor profile
router.post('/', createInstructor);

// Get all instructors
router.get('/', getInstructors);

// Get an instructor by ID
router.get('/:id', getInstructorById);

// Update an instructor profile
router.put('/:id', updateInstructor);

// De,loginInstructor lete an instructor profile
router.delete('/:id', deleteInstructor);

router.post('/login', loginInstructor);

router.post('/all', createInstructors);

module.exports = router;
