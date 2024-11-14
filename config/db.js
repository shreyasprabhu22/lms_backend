const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); 
const User = require('../models/user');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Create the admin user after DB connection
    await createAdminUser();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
  }
};

const createAdminUser = async () => {
  try {
   
    const adminExists = await User.findOne({ role: 'Admin' });

    if (!adminExists) {
     
      const admin = new User({
        userId: 'U02',
        name: 'Admin',
        email: 'admin@example.com',
        username: 'admin',
        password: 'admin_password', 
        profilePhoto:'assets/user.png',
        phoneNumber:'9989876555',
        currentInstitution:'EduVista',
        role: 'Admin',
        dteofBirth:'02-03-2000',
        location: 'Mangalore',
        subscription: 'Pro',
        enrollmentDate:'01-02-2024',
        bio: 'This is the admin user.',
      });
 
      await admin.save();
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (err) {
    console.error('Error creating admin user:', err.message);
  }
};

module.exports = connectDB;
