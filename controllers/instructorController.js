const Instructor = require('../models/instructor');

const createInstructor = async (req, res) => {
  const { name, email, bio, reviewIns, image, experience, specialization, socialLinks, location, username, password, role } = req.body;

  try {
    const maxInstructor = await Instructor.findOne().sort({ instructorId: -1 });
    let nextInstructorId = 'i01';

    if (maxInstructor) {
      const lastInstructorId = maxInstructor.instructorId;
      const numericId = parseInt(lastInstructorId.substring(1));  
      nextInstructorId = `i${(numericId + 1).toString().padStart(2, '0')}`;
    }

    const instructor = new Instructor({
      instructorId: nextInstructorId,
      name,
      email,
      bio,
      reviewIns,
      image,
      experience,
      specialization,
      socialLinks,
      location,
      username,
      password,
      role
    });

    await instructor.save();

    res.status(201).json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create multiple instructors
const createInstructors = async (req, res) => {
  const instructorsData = req.body; 

  try {
    if (!Array.isArray(instructorsData)) {
      return res.status(400).json({ msg: 'Data must be an array of instructors' });
    }

    const createdInstructors = [];  
    const existingInstructors = await Instructor.find().sort({ instructorId: -1 }); 

    let newInstructorId = 'i01';  

    if (existingInstructors.length > 0) {
      const lastInstructor = existingInstructors[0];
      const lastInstructorId = lastInstructor.instructorId;
      const numericId = parseInt(lastInstructorId.substring(1));  
      newInstructorId = `i${(numericId + 1).toString().padStart(2, '0')}`;  
    }

    // Create each instructor
    for (let i = 0; i < instructorsData.length; i++) {
      const { name, email, bio, reviewIns, image, experience, specialization, socialLinks, location, username, password, role, isFirstLogin, ownRegistered } = instructorsData[i];

      const instructor = new Instructor({
        instructorId: newInstructorId,
        name,
        email,
        bio,
        reviewIns,
        image,
        experience,
        specialization,
        socialLinks,
        location,
        username,
        password,
        role,
        isFirstLogin,
        ownRegistered
      });

      await instructor.save();

      createdInstructors.push(instructor);

      // Update the newInstructorId for the next one
      const lastCreatedInstructor = createdInstructors[createdInstructors.length - 1];
      const lastCreatedId = lastCreatedInstructor.instructorId;
      const lastCreatedNum = parseInt(lastCreatedId.substring(1)); 
      const nextNum = lastCreatedNum + 1; 
      newInstructorId = `i${nextNum.toString().padStart(2, '0')}`;  
    }

    res.status(201).json(createdInstructors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all instructors
const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};






// Get an instructor by ID
const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ instructorId:req.params.id });
    if (!instructor) return res.status(404).json({ msg: 'Instructor not found' });
    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an instructor profile
const updateInstructor = async (req, res) => {
  const {
    name,
    email,
    bio,
    reviewIns,
    image,
    specialization,
    experience,
    totalCoursesTaught,
    availableForHire,
    socialLinks,
    location,
    role,
    password,
    isFirstLogin,
    ownRegistered
  } = req.body;

  try {
    const instructor = await Instructor.findOne({ instructorId: req.params.id });
    if (!instructor) return res.status(404).json({ msg: 'Instructor not found' });

    console.log('Before update:', instructor);

    // Update the fields
    instructor.name = name || instructor.name;
    instructor.email = email || instructor.email;
    instructor.bio = bio || instructor.bio;
    instructor.reviewIns = reviewIns || instructor.reviewIns;
    instructor.image = image || instructor.image;
    instructor.experience = experience || instructor.experience;
    instructor.specialization = specialization || instructor.specialization;
    instructor.totalCoursesTaught = totalCoursesTaught || instructor.totalCoursesTaught;
    instructor.availableForHire = availableForHire || instructor.availableForHire;
    instructor.socialLinks = socialLinks || instructor.socialLinks;
    instructor.location = location || instructor.location;
    instructor.role = role || instructor.role;
    instructor.password = password || instructor.password;

   
    if (typeof isFirstLogin !== 'undefined') {
      instructor.isFirstLogin = isFirstLogin;
    }

    instructor.ownRegistered = ownRegistered || instructor.ownRegistered;

   
    await instructor.save();

    console.log('After update:', instructor); 

    res.json(instructor);
  } catch (err) {
    console.error('Error updating instructor:', err.message);
    res.status(500).send('Server Error');
  }
};


// Delete an instructor profile
const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ instructorId: req.params.id });

    if (!instructor) {
      return res.status(404).json({ msg: 'Instructor not found' });
    }
    await Instructor.deleteOne({ instructorId: req.params.id });
    res.json({ msg: 'Instructor removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



const loginInstructor = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    
    const user = await Instructor.findOne({ username });
    console.log("user",user)
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

   
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    console.log(user.password==password)
    
    res.json({ msg: 'Login successful', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const loginInstructorByEmail = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    
    const user = await Instructor.findOne({ email });
    console.log("user",user)
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

   
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    console.log(user.password==password)
    
    res.json({ msg: 'Login successful', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getInstructorByEmail = async (req, res) => {
  const { email } = req.params;  

  try {
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      return res.status(404).json({ exists: false });
    }
    res.json({ exists: true, instructor });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



// Update instructor password
const updatePassword = async (req, res) => {
  console.log(req.body)
  try {
    email=req.body.email;
    new_password=req.body.newPassword
    const instructor = await Instructor.findOne({email} );
    console.log(new_password)
    if (!instructor) {
      return res.status(404).json({ msg: 'Instructor not found' });
    }

    
    instructor.password = new_password; 
    await instructor.save();

    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createInstructor,
  createInstructors,
  getInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
  loginInstructor,
  updatePassword ,
  loginInstructorByEmail 
};

module.exports = { createInstructor, createInstructors,loginInstructorByEmail, getInstructors, getInstructorById, updateInstructor, deleteInstructor,loginInstructor, getInstructorByEmail, updatePassword };
