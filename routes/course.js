const express = require('express');
const router = express.Router();
const { createCourse, addCourses, getCourses,getReviewsWithUserNames, getCourseById, addReview, getCoursesByCategory,updateCourse, deleteCourse , getCoursesByInstructor,getCoursesFromDifferentCategories} = require('../controllers/courseController');

router.post('/', createCourse);  // Create course
router.post('/all',addCourses);
router.get('/courses-by-category', getCoursesFromDifferentCategories);
router.get('/', getCourses);  // Get all courses
router.get('/reviews/:course_id', getReviewsWithUserNames);
router.get('/:id', getCourseById);  // Get course by ID
router.put('/reviews/:course_id', addReview);
router.put('/:id', updateCourse);  // Update course
router.delete('/:id', deleteCourse);  // Delete course
router.get('/instructor/:instructor_id', getCoursesByInstructor);
router.get('/category/:category', getCoursesByCategory);

module.exports = router;
