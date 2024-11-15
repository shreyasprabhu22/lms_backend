const Course = require('../models/course');
const defaultReviews = [
  {
    reviewer: "Alice Johnson",
    rating: 5,
    comment: "This course was fantastic! The content was well-structured, and the instructor explained concepts clearly. Highly recommended!"
  },
  {
    reviewer: "Bob Martin",
    rating: 4,
    comment: "Great course overall. I learned a lot, but I wish there were more real-life examples. Still, the theory was solid."
  },
  {
    reviewer: "Catherine Lee",
    rating: 3,
    comment: "The course was okay, but some topics were too advanced for beginners. I struggled to keep up at times."
  },
  {
    reviewer: "David Chen",
    rating: 4,
    comment: "Good introduction to JavaScript. Some of the exercises were a bit repetitive, but I feel more confident now."
  },
  {
    reviewer: "Emily Davis",
    rating: 2,
    comment: "Unfortunately, I didn't find the course as engaging as I had hoped. The videos were too long and the explanations could have been clearer."
  }
];
 

const defaultFaq = [
  {
    question: "What is the duration of the course?",
    answer: "The course lasts for 4 weeks, with approximately 5 hours of content per week."
  },
  {
    question: "Do I need any prior knowledge before taking this course?",
    answer: "No, this course is designed for absolute beginners. However, familiarity with basic computer operations is recommended."
  },
  {
    question: "Is this course available for free?",
    answer: "No, this course has a small fee. However, there may be discounts available from time to time."
  },
  {
    question: "Can I access the course material after completion?",
    answer: "Yes, once you complete the course, you will have lifetime access to the course materials."
  },
  {
    question: "What if I have questions during the course?",
    answer: "You can ask questions in the course forum, or reach out to the instructor via email. We also hold weekly office hours for Q&A."
  }
];

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    // Check if this is the first course or if we need to generate the course_id
    const courseCount = await Course.countDocuments();
    let newCourseId = '';

    if (courseCount === 0) {
      newCourseId = 'C01'; // First course
    } else {
      const lastCourse = await Course.findOne().sort({ course_id: -1 }); // Get the last created course by ID
      const lastId = parseInt(lastCourse.course_id.slice(1)); // Extract the numeric part
      const nextId = lastId + 1;
      newCourseId = `c${nextId.toString().padStart(2, '0')}`; // Generate the next ID (c01, c02, etc.)
    }

    // Prepare course data
    const courseData = {
      ...req.body,
      course_id: newCourseId,
      faq:defaultFaq,
      reviews:defaultReviews 
    };

    const course = new Course(courseData);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Error creating course', error: err.message });
  }
};

exports.addCourses = async (req, res) => {
  try {
    // Destructure courses array from the request body
    const courses = req.body;

    // Validate that the request body is an array and not empty
    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of courses.' });
    }

    // Get the current count of courses to generate the next unique ID
    const courseCount = await Course.countDocuments();
    let nextCourseId = courseCount + 1; // Start from the next ID after the existing courses count

    // Loop through each course and assign a unique course_id
    for (let i = 0; i < courses.length; i++) {
      // Format course_id to include the leading zeroes
      const courseId = `C${nextCourseId.toString().padStart(2, '0')}`;
      
      // Set the course_id, faq, and reviews for each course
      courses[i].course_id = courseId;
      courses[i].faq = defaultFaq;
      courses[i].reviews = defaultReviews;

      // Increment the course ID for the next course
      nextCourseId++;
    }

    // Insert all courses into the database at once
    const createdCourses = await Course.insertMany(courses);

    // Send back a success response
    res.status(201).json({
      message: 'Courses added successfully!',
      courses: createdCourses,
    });
  } catch (err) {
    console.error('Error adding courses:', err);
    res.status(500).json({ message: 'Error adding courses', error: err.message });
  }
};

// Get courses by category
exports.getCoursesByCategory = async (req, res) => {
  try {
    const { category } = req.params;  // Extract the category from the URL parameter
    console.log(category)
    // Query the Course collection to find courses matching the given category
    const courses = await Course.find({ category: category });

    // If no courses were found
    if (courses.length === 0) {
      return res.status(404).json({ message: `No courses found in the ${category} category` });
    }
    console.log(courses)
    // Return the list of courses
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses by category:', err);
    res.status(500).json({ message: 'Error fetching courses by category', error: err.message });
  }
};


    
  


// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    console.log(req.params.course_id)
    const course = await Course.findOne({ course_id:req.params.id });
    console.log(course)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ message: 'Error updating course', error: err.message });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    console.log("inside")
    const course = await Course.findOne({course_id:req.params.id});
    console.log(course)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await Course.deleteOne({ course_id: req.params.id });
    console.log("yes")
    res.json({ msg: 'Courses removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getCoursesByInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructor_id; // Get the instructor ID from the URL parameter

    // Find all courses that belong to the instructor
    const courses = await Course.find({ instructor_id: instructorId });

    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this instructor' });
    }

    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses by instructor:', err);
    res.status(500).json({ message: 'Error fetching courses by instructor', error: err.message });
  }
};

