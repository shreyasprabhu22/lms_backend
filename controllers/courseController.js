const Course = require('../models/course');

 
const defaultReview=[]
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
    const courseCount = await Course.countDocuments();
    let newCourseId = '';

    if (courseCount === 0) {
      newCourseId = 'C01'; 
    } else {
      const lastCourse = await Course.findOne().sort({ course_id: -1 }); 
      const lastId = parseInt(lastCourse.course_id.slice(1)); 
      const nextId = lastId + 1;
      newCourseId = `c${nextId.toString().padStart(2, '0')}`; 
    }
    const courseData = {
      ...req.body,
      course_id: newCourseId,
      faq:defaultFaq,
      reviews:[]
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
    const courses = req.body;
    console.log(req.body)
    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of courses.' });
    }
    const courseCount = await Course.countDocuments();
    let nextCourseId = courseCount + 1;
    for (let i = 0; i < courses.length; i++) {
      const courseId = `C${nextCourseId.toString().padStart(2, '0')}`;
      courses[i].course_id = courseId;
      courses[i].faq = defaultFaq;
      courses[i].reviews =defaultReview;
      nextCourseId++;
    }
    const createdCourses = await Course.insertMany(courses);
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
    const { category } = req.params;  
    console.log(category)
    const courses = await Course.find({ category: category });
    if (courses.length === 0) {
      return res.status(404).json({ message: `No courses found in the ${category} category` });
    }
    console.log(courses)
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
    const courseId = req.params.id;
    const course = await Course.findOne({ course_id: courseId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const updatedCourseData = req.body; 
    const updatedCourse = await Course.findOneAndUpdate(
      { course_id: courseId }, 
      updatedCourseData,         
      { new: true }              
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found after update' });
    }

    
    res.status(200).json({
      message: 'Course updated successfully!',
      course: updatedCourse,
    });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({
      message: 'Error updating course',
      error: err.message,
    });
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
    const instructorId = req.params.instructor_id; 
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



exports.getCoursesFromDifferentCategories = async (req, res) => {
  try {
    // Fetch distinct categories
    const categories = await Course.distinct('category');

    // If there are fewer than 4 categories, just return one course from all available categories
    const categoriesToFetch = categories.slice(0, 4);

    const courses = [];

    // Fetch one course from each selected category
    for (const category of categoriesToFetch) {
      const course = await Course.findOne({ category }).sort({ createdAt: -1 });  // Sorting to get the latest course
      if (course) {
        courses.push(course);
      }
    }

    // If we don't have four courses, handle that case
    if (courses.length < 4) {
      return res.status(404).json({ msg: 'Not enough courses found from different categories' });
    }

    // Return the list of courses
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err.message);
    res.status(500).send('Server Error');
  }
};


exports.addReview = async (req, res) => {
  try {
    console.log(req.params, req.body)
    const { reviewer, rating, comment } = req.body;
    const course = await Course.findOne({ course_id: req.params.course_id });


    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log(course)
    const newReview = { reviewer, rating, comment };
    course.reviews.push(newReview);
    console.log(course.reviews)
    await course.save();

    res.status(200).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'Error adding review', error: err.message });
  }
};



