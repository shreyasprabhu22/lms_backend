const User = require('../models/user');

// Create new user
const createUser = async (req, res) => {
  const { name, email, username, profilePhoto, phoneNumber, role } = req.body;

  try {
    // Find the user with the highest userId (sort in descending order by userId)
    const maxUser = await User.findOne().sort({ userId: -1 });

    // If no users exist, the next userId should be 1, otherwise, increment the highest userId
    const nextUserId = maxUser ? maxUser.userId + 1 : 1;

    // Create a new user with the calculated userId
    let user = new User({
      userId: nextUserId,  // Set the incremented userId
      name,
      email,
      username,
      profilePhoto,
      phoneNumber,
      role
    });

    // Save the new user to the database
    await user.save();

    // Return the newly created user as a response
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update user
const updateUser = async (req, res) => {
  const { name, email, username, profilePhoto, phoneNumber, role } = req.body;
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    await user.remove();
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Courses Taken
const updateCoursesTaken = async (req, res) => {
  const { course } = req.body; // Single course to add/remove
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Check if the course is already in the coursesTaken array
    if (user.coursesTaken.includes(course)) {
      // If it exists, remove it from the array (remove the course)
      user.coursesTaken = user.coursesTaken.filter(c => c !== course);
    } else {
      // If it does not exist, add it to the array (add the course)
      user.coursesTaken.push(course);
    }

    await user.save();
    res.json({ msg: 'Courses updated successfully', coursesTaken: user.coursesTaken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Subscription
const updateSubscription = async (req, res) => {
  const { subscription } = req.body; // New subscription level (e.g., Free, Premium)
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Validate the subscription level (you can add more levels if necessary)
    const validSubscriptions = ['Free', 'Premium', 'Pro'];
    if (!validSubscriptions.includes(subscription)) {
      return res.status(400).json({ msg: 'Invalid subscription level' });
    }

    // Update the user's subscription
    user.subscription = subscription;
    await user.save();
    res.json({ msg: 'Subscription updated successfully', subscription: user.subscription });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches (assuming plain text passwords)
    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // If both username and password match
    res.json({ msg: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const getCoursesTakenByUser = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Populate the coursesTaken field with full course details
    const courses = await Course.find({ _id: { $in: user.coursesTaken } });

    // Return the courses taken by the user
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  updateCoursesTaken, 
  updateSubscription ,
  loginUser,
  getCoursesTakenByUser
};
