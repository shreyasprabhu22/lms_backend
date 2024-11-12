const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId:{type:Number,required:true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  phoneNumber: { type: String },
  currentInstitution: { type: String },
  gender: { type: String },
  role: { type: String, enum: ['Admin', 'Student', 'Instructor'], default: 'Student' },
  dateOfBirth: { type: Date },
  enrollmentDate: { type: Date },
  bio: { type: String },
  interests: { type: [String], default: [] },
  location: { type: String },
  subscription: { type: String, default: 'Free' },
  purchasedCourses: { type: [String], default: [] }
});

module.exports = mongoose.model('User', UserSchema);
