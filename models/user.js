const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  phoneNumber: { type: String },
  currentInstitution: { type: String },
  gender: { type: String },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  dateOfBirth: { type: Date },
  enrollmentDate: { type: Date },
  bio: { type: String },
  interests: { type: [String], default: [] },
  location: { type: String },
  subscription: { type: String, default: 'Free' },
  purchasedCourses: { type: [String], default: [] }
});


// Hash the password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare the password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
