const User = require('../models/user');

// Create new user
const createUser = async (req, res) => {
  console.log('hello')
  console.log(req.body)
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
    purchasedCourses
  } = req.body;
  console.log(req.body)
  try {
    const maxUser = await User.findOne().sort({ userId: -1 });
    let nextUserId = 'U01';

    if (maxUser) {
      const lastUserId = maxUser.userId; 
      const numericId = parseInt(lastUserId.substring(1)); 
      nextUserId = `u${(numericId + 1).toString().padStart(2, '0')}`; 
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
      purchasedCourses
    });
    console.log(user)
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const createUsers = async (req, res) => { const usersData = req.body; if (!Array.isArray(usersData) || usersData.length === 0) { return res.status(400).json({ msg: 'Request body should be a non-empty array of users' }); } try { let maxUser = await User.findOne().sort({ userId: -1 }); const users = []; for (const userData of usersData) { let nextUserId = 'U01'; if (maxUser) { const lastUserId = maxUser.userId; const numericId = parseInt(lastUserId.substring(1)); nextUserId = `U${(numericId + 1).toString().padStart(2, '0')}`; } const newUser = new User({ userId: nextUserId, name: userData.name, email: userData.email, username: userData.username, password: userData.password, profilePhoto: userData.profilePhoto, phoneNumber: userData.phoneNumber, currentInstitution: userData.currentInstitution, gender: userData.gender, role: userData.role, dateOfBirth: userData.dateOfBirth, enrollmentDate: userData.enrollmentDate, bio: userData.bio, interests: userData.interests, location: userData.location, subscription: userData.subscription, purchasedCourses: userData.purchasedCourses }); await newUser.save(); users.push(newUser); maxUser = newUser; } res.status(201).json(users); } catch (err) { console.error(err.message); res.status(500).send('Server Error'); } };



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
    // Find the instructor by the instructorId (string)
    const user = await User.findOne({ userId: req.params.id });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.deleteOne({ userId: req.params.id });
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Courses Taken
const updateCoursesTaken = async (req, res) => {
  const { course } = req.body; 
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    
    if (user.coursesTaken.includes(course)) {
     
      user.coursesTaken = user.coursesTaken.filter(c => c !== course);
    } else {
      
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
  const { subscription } = req.body; 
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    
    const validSubscriptions = ['Free', 'Premium', 'Pro'];
    if (!validSubscriptions.includes(subscription)) {
      return res.status(400).json({ msg: 'Invalid subscription level' });
    }

    
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
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password (consider using bcrypt for hashing passwords)
    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Send the full user data in the response (you can exclude sensitive fields like password if needed)
    const userData = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      phoneNumber: user.phoneNumber,
      currentInstitution: user.currentInstitution,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      enrollmentDate: user.enrollmentDate,
      bio: user.bio,
      interests: user.interests,
      location: user.location,
      subscription: user.subscription,
      purchasedCourses: user.purchasedCourses,
    };

    // Send the response with the user data (you can add a token if using JWT)
    res.json({
      msg: 'Login successful',
      user: userData,  // Send the full user object
    });
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
  getCoursesTakenByUser,
  createUsers
};
