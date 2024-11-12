const Instructor = require('../models/instructor');

// Create a new instructor
const createInstructor = async (req, res) => {
  const { name, email, bio, reviewIns, image, specialization, totalCoursesTaught, availableForHire, socialLinks, location } = req.body;

  try {
    const instructor = new Instructor({ 
      name, 
      email, 
      bio, 
      reviewIns, 
      image, 
      specialization, 
      totalCoursesTaught, 
      availableForHire, 
      socialLinks, 
      location 
    });
    await instructor.save();
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

// Get an instructor by ID
const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ msg: 'Instructor not found' });
    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an instructor profile
const updateInstructor = async (req, res) => {
  const { name, email, bio, reviewIns, image, specialization, totalCoursesTaught, availableForHire, socialLinks, location } = req.body;

  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ msg: 'Instructor not found' });

    instructor.name = name || instructor.name;
    instructor.email = email || instructor.email;
    instructor.bio = bio || instructor.bio;
    instructor.reviewIns = reviewIns || instructor.reviewIns;
    instructor.image = image || instructor.image;
    instructor.specialization = specialization || instructor.specialization;
    instructor.totalCoursesTaught = totalCoursesTaught || instructor.totalCoursesTaught;
    instructor.availableForHire = availableForHire || instructor.availableForHire;
    instructor.socialLinks = socialLinks || instructor.socialLinks;
    instructor.location = location || instructor.location;

    await instructor.save();
    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an instructor profile
const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ msg: 'Instructor not found' });

    await instructor.remove();
    res.json({ msg: 'Instructor removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { createInstructor, getInstructors, getInstructorById, updateInstructor, deleteInstructor };
