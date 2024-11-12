const mongoose = require('mongoose');


const instructorSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  reviewIns: Number,
  image: String,
  specialization: String,
  totalCoursesTaught: Number,
  socialLinks: {
    linkedin: String,
    twitter: String
  },
  location: String
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
