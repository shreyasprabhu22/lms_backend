// course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  instructor: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    reviewIns: { type: Number, required: true },
    image: { type: String, required: true },
    specialization: { type: String, required: true },
    totalCoursesTaught: { type: Number, required: true },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String }
    },
    location: { type: String, required: true }
  },
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
