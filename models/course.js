const mongoose = require('mongoose');
const Instructor = require('./instructor');

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  instructor: Instructor,  
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
  language: { type: String, required: true },
  startDate: { type: Date, required: true },
  price: { type: Number, required: true },
  maxEnrollment: { type: Number, required: true },
  faq: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
