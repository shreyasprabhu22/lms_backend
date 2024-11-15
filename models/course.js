// course.js
const mongoose = require('mongoose');
const Instructors = require('./instructor')

const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true ,unique:true},
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number , required: true },
  description: { type: String, required: true },
  instructor_id: { type: String, required: true },
  img: { type: String, required: true },
  courseContent: [
    {
      week: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  prerequisites: [{ type: String }],
  reviews: [
    {
      reviewer: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true }
    }
  ],
  level: { type: String, required: true },
  price: { type: Number, required: true },
  faq: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
