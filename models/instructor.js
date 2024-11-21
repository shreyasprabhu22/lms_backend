const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Hash the password before saving
instructorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it's being modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
instructorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
