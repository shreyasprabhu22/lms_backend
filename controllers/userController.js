const User = require("../models/user");
const Course=require('../models/course')
// Create new user
const createUser = async (req, res) => {
  console.log("hello");
  console.log(req.body);
  const {
    name,
    email,
    username,
    password,
    profilePhoto,
    phoneNumber,
    currentInstitution,
    gender,
    role,
    dateOfBirth,
    enrollmentDate,
    bio,
    interests,
    location,
    subscription,
    purchasedCourses,
  } = req.body;
  console.log(req.body);
  try {
    const maxUser = await User.findOne().sort({ userId: -1 });
    let nextUserId = "U01";

    if (maxUser) {
      const lastUserId = maxUser.userId;
      const numericId = parseInt(lastUserId.substring(1));
      nextUserId = `u${(numericId + 1).toString().padStart(2, "0")}`;
    }

    let user = new User({
      userId: nextUserId,
      name,
      email,
      username,
      password,
      profilePhoto,
      phoneNumber,
      currentInstitution,
      gender,
      role,
      dateOfBirth,
      enrollmentDate,
      bio,
      interests,
      location,
      subscription,
      purchasedCourses,
    });
    console.log(user);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createUsers = async (req, res) => {
  const usersData = req.body;
  if (!Array.isArray(usersData) || usersData.length === 0) {
    return res
      .status(400)
      .json({ msg: "Request body should be a non-empty array of users" });
  }
  try {
    let maxUser = await User.findOne().sort({ userId: -1 });
    const users = [];
    for (const userData of usersData) {
      let nextUserId = "U01";
      if (maxUser) {
        const lastUserId = maxUser.userId;
        const numericId = parseInt(lastUserId.substring(1));
        nextUserId = `U${(numericId + 1).toString().padStart(2, "0")}`;
      }
      const newUser = new User({
        userId: nextUserId,
        name: userData.name,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        profilePhoto: userData.profilePhoto,
        phoneNumber: userData.phoneNumber,
        currentInstitution: userData.currentInstitution,
        gender: userData.gender,
        role: userData.role,
        dateOfBirth: userData.dateOfBirth,
        enrollmentDate: userData.enrollmentDate,
        bio: userData.bio,
        interests: userData.interests,
        location: userData.location,
        subscription: userData.subscription,
        purchasedCourses: userData.purchasedCourses,
      });
      await newUser.save();
      users.push(newUser);
      maxUser = newUser;
    }
    res.status(201).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




// Update course by course_id
const updateCourses = async (req, res) => {
  try {
    const { id } = req.params; 
    const { coursesPurchased, subscription } = req.body; 

    
    console.log('Courses to add:', coursesPurchased);

    
    if (!Array.isArray(coursesPurchased) || coursesPurchased.length === 0) {
      return res.status(400).json({ msg: 'Invalid courses to add' });
    }
 
  
    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      {
        $addToSet: { purchasedCourses: { $each: coursesPurchased } }, 
        $set: { subscription } 
      },
      { new: true, runValidators: true } 
    );

    
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).send('Server Error');
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    
    user.password = password; 
    await user.save();

    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
   
    const user = await User.findOne({ userId: req.params.id });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.deleteOne({ userId: req.params.id });
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update Courses Taken

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
   
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.json({
      msg: "Login successful",
      user: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




const getCoursesTakenByUser = async (req, res) => {
  try {
   console.log("inide get")
    const user = await User.findOne({ userId: req.params.id });
    
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
   console.log(user)
   
    const purchasedCourses = user.purchasedCourses;
console.log(purchasedCourses)
    
    if (purchasedCourses.length === 0) {
      return res.json({ courses: [] });
    }

    
    const courses = await Course.find({
      course_id: { $in: purchasedCourses } 
    });
  console.log(courses)
 
    res.json(courses);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Find user by email and return true if user exists
const findUserByEmail = async (req, res) => {
  const { email } = req.body; 
  
  try {
   
    const user = await User.findOne({ email });
    
   
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; 
  const updateData = req.body; 
  try {
   
    const user = await User.findOne({ userId: id });

   
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

   
    Object.keys(updateData).forEach(key => {
      user[key] = updateData[key];
    });

  
    await user.save();

    
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateCourses,
  deleteUser,
  loginUser,
  getCoursesTakenByUser,
  createUsers,
  findUserByEmail,
  updatePassword,
  updateUser
};
