const express = require('express');
const router = express.Router();
const { createCourse, addCourses, getCourses, getCourseById, updateCourse, deleteCourse , getCoursesByInstructor} = require('../controllers/courseController');

router.post('/', createCourse);  // Create course
router.post('/all',addCourses);
router.get('/', getCourses);  // Get all courses
router.get('/:id', getCourseById);  // Get course by ID
router.put('/:id', updateCourse);  // Update course
router.delete('/:id', deleteCourse);  // Delete course
router.get('/instructor/:instructor_id', getCoursesByInstructor);
module.exports = router;
