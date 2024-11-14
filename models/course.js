// course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number , required: true },
  description: { type: String, required: true },
  instructor: {
    instructorId:{type:String},
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    reviewIns: { type: Number, required: true },
    image: { type: String, required: true },
    specialization: { type: String, required: true },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String }
    },
    location: { type: String, required: true },
    username: {type:String},
     password: {String}
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
