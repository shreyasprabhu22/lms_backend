const express = require('express');
const router = express.Router();
const { createInstructor, getInstructors, getInstructorById, updateInstructor, deleteInstructor } = require('../controllers/instructorController');

// Create a new instructor profile
router.post('/', createInstructor);

// Get all instructors
router.get('/', getInstructors);

// Get an instructor by ID
router.get('/:id', getInstructorById);

// Update an instructor profile
router.put('/:id', updateInstructor);

// Delete an instructor profile
router.delete('/:id', deleteInstructor);

module.exports = router;
