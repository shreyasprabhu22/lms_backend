const mongoose = require('mongoose');


const instructorSchema = new mongoose.Schema({
  instructorId:String,
  name: String,
  email: String,
  bio: String, 
  role:String,
  reviewIns: Number,
  image: String,
  specialization: String,
  experience:String,
  socialLinks: {
    linkedin: String,
    twitter: String
  },
  location: String,
  username: String,
  password: String,
  isFirstLogin:{type:Boolean, default:true},
  ownRegistered:{type:Boolean, default:false},
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
