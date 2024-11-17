const User = require("../models/user");

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
    const { id } = req.params; // Extract userId from the request parameters
    const { coursesPurchased, subscription } = req.body; // Extract the coursesPurchased and subscription from the body

    // Log the update fields for debugging purposes
    console.log('Courses to add:', coursesPurchased);

    // Ensure that coursesPurchased is an array
    if (!Array.isArray(coursesPurchased) || coursesPurchased.length === 0) {
      return res.status(400).json({ msg: 'Invalid courses to add' });
    }

    // Use $addToSet to add courses to the purchasedCourses array (avoids duplicates)
    const updatedUser = await User.findOneAndUpdate(
      { userId: id }, // Query to find the user by userId
      {
        $addToSet: { purchasedCourses: { $each: coursesPurchased } }, // Append courses to purchasedCourses array
        $set: { subscription } // Update the subscription field
      },
      { new: true, runValidators: true } // Return updated user and run validation
    );

    // If no user was found
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).send('Server Error');
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
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
    // Find the instructor by the instructorId (string)
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
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the password (consider using bcrypt for hashing passwords)
    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Send the response with the user data (you can add a token if using JWT)
    res.json({
      msg: "Login successful",
      user: user, // Send the full user object
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




const getCoursesTakenByUser = async (req, res) => {
  try {
    // Find the user by userId (using req.params.id as the userId)
    const user = await User.findOne({ userId: req.params.id });
    
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // If the user is found, retrieve the purchasedCourses array
    const purchasedCourses = user.purchasedCourses;

    // If there are no courses in purchasedCourses, return an empty array
    if (purchasedCourses.length === 0) {
      return res.json({ courses: [] });
    }

    // Find all the courses in the purchasedCourses array
    const courses = await Course.find({
      course_id: { $in: purchasedCourses } // Find courses whose courseId is in the purchasedCourses array
    });

    // Return the found courses as a response
    res.json(courses);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Find user by email and return true if user exists
const findUserByEmail = async (req, res) => {
  const { email } = req.body; // Get the email from the request body
  
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // If user exists, return true, else return false
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
  const { id } = req.params; // Extract userId from the request parameters
  const updateData = req.body; // Extract the fields to update from the request body

  try {
    // Find the user by userId
    const user = await User.findOne({ userId: id });

    // If no user is found, send a 404 error
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user's data with the provided fields
    // Use set() to update only the provided fields in the request body
    Object.keys(updateData).forEach(key => {
      user[key] = updateData[key];
    });

    // Save the updated user
    await user.save();

    // Return the updated user
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
