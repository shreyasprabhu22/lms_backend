const Instructor = require('../models/instructor');

// Create a new instructor
const createInstructor = async (req, res) => {
  const { name, email, bio, reviewIns, image,experience, specialization, socialLinks, location ,username,password,role} = req.body;

  try {
    // Find the instructor with the highest instructorId (sort in descending order by instructorId)
    const maxInstructor = await Instructor.findOne().sort({ instructorId: -1 });

    // Calculate the next instructorId
    let nextInstructorId = 'i01';  // Default id if no instructors exist

    if (maxInstructor) {
      const lastInstructorId = maxInstructor.instructorId;
      const numericId = parseInt(lastInstructorId.substring(2));  // Extract the numeric part of the last instructorId
      nextInstructorId = `i${(numericId + 1).toString().padStart(2, '0')}`;  // Increment the numeric part and pad to 2 digits
    }

    // Create a new instructor
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

    // Save the instructor to the database
    await instructor.save();

    // Return the newly created instructor as a response
    res.status(201).json(instructor);
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


// Create multiple instructors
const createInstructors = async (req, res) => {
  const instructorsData = req.body;  // Array of instructors data

  try {
    // Validate the array format
    if (!Array.isArray(instructorsData)) {
      return res.status(400).json({ msg: 'Data must be an array of instructors' });
    }

    const createdInstructors = [];  // Array to hold created instructors

    // Check if there are any existing instructors
    const existingInstructors = await Instructor.find().sort({ instructorId: -1 });  // Sort by instructorId in descending order

    let newInstructorId = 'i01';  // Default to 'i01' if no instructors exist

    if (existingInstructors.length > 0) {
      const lastInstructor = existingInstructors[0];
      const lastInstructorId = lastInstructor.instructorId;
      const numericId = parseInt(lastInstructorId.substring(1));  // Extract the numeric part of the last instructorId
      newInstructorId = `i${(numericId + 1).toString().padStart(2, '0')}`;  // Increment and pad to 2 digits
    }

    // Iterate over the array of instructor data
    for (let i = 0; i < instructorsData.length; i++) {
      const { name, email, bio, reviewIns, image, experience, specialization, socialLinks, location, username, password,role } = instructorsData[i];

      // Create a new instructor object
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
        role
      });

      // Save the new instructor to the database
      await instructor.save();

      // Add the created instructor to the result array
      createdInstructors.push(instructor);

      // Update the ID for the next instructor
      const lastCreatedInstructor = createdInstructors[createdInstructors.length - 1];
      const lastCreatedId = lastCreatedInstructor.instructorId;
      const lastCreatedNum = parseInt(lastCreatedId.substring(1));  // Get the numeric part of the last created ID
      const nextNum = lastCreatedNum + 1;  // Increment the ID number
      newInstructorId = `i${nextNum.toString().padStart(2, '0')}`;  // Generate next instructor ID
    }

    // Return the array of newly created instructors
    res.status(201).json(createdInstructors);
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
  console.log(req.body)
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
  } = req.body;

  try {
    // Find instructor by their custom instructorId (not MongoDB _id)
    const instructor = await Instructor.findOne({ instructorId: req.params.id });
    if (!instructor) return res.status(404).json({ msg: 'Instructor not found' });

    // Update instructor fields, keeping existing values if not provided
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

    // Save updated instructor object
    await instructor.save();
    
    // Return the updated instructor object
    res.json(instructor);
  } catch (err) {
    console.error('Error updating instructor:', err.message);
    res.status(500).send('Server Error');
  }
};


// Delete an instructor profile
const deleteInstructor = async (req, res) => {
  try {
    // Find the instructor by the instructorId (string)
    const instructor = await Instructor.findOne({ instructorId: req.params.id });

    if (!instructor) {
      return res.status(404).json({ msg: 'Instructor not found' });
    }

    // Remove the instructor from the database
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

   
    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    console.log(user.password==password)
    
    res.json({ msg: 'Login successful', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getInstructorByEmail = async (req, res) => {
  const { email } = req.params;  // Expecting the email to be passed as a route parameter

  try {
    // Find the instructor by email
    const instructor = await Instructor.findOne({ email });

    // If the instructor is not found, return 404 with exists: false
    if (!instructor) {
      return res.status(404).json({ exists: false });
    }

    // Return the found instructor and exists: true
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
    // Find the user by email
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
  updatePassword  
};

module.exports = { createInstructor, createInstructors, getInstructors, getInstructorById, updateInstructor, deleteInstructor,loginInstructor, getInstructorByEmail, updatePassword };
