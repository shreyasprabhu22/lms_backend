const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user'); // Import the User model

// Load environment variables
dotenv.config();

// MongoDB connection string from .env file
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Avoid deprecation warning for createIndex
      useFindAndModify: false, // Avoid deprecation warning for findAndModify
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Check if admin user exists, if not create it
    await createAdminUser();

  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Function to create the admin user if it does not exist
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: 'Admin' });

    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        username: 'admin',
        password: 'hashed_admin_password', // Make sure to hash the password
        role: 'Admin',
        profilePhoto: '/images/admin.jpg',
        location: 'Server',
        subscription: 'Pro',
      });

      // You should hash the password here using bcrypt or another method
      admin.password = await bcrypt.hash(admin.password, 10);

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
