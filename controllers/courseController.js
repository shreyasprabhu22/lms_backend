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


// Create new course
const createCourse = async (req, res) => {
  const {
    name, category, duration, description, instructor, img, courseContent,
    prerequisites, level, price, reviews, faq
  } = req.body;

  try {
    // Find the course with the highest id (sort in descending order by id)
    const maxCourse = await Course.findOne().sort({ id: -1 });

    // Calculate the next course id
    const nextCourseId = maxCourse ? maxCourse.id + 1 : 1;

    // Set default reviews and FAQs if not provided in the request
    const course = new Course({
      course_id: nextCourseId,  // Set the incremented course id
      name,
      category,
      duration,
      description,
      instructor,
      img,
      courseContent,
      prerequisites,
      reviews: reviews || defaultReviews,  // Use default reviews if not provided
      faq: faq || defaultFaq,              // Use default FAQ if not provided
      level,
     
      price,
    });

    // Save the course
    await course.save();

    // Return the newly created course as a response
    res.status(201).json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update course
const updateCourse = async (req, res) => {
  const { title, content, author, description, category, images } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    course.title = title || course.title;
    course.content = content || course.content;
    course.author = author || course.author;
    course.description = description || course.description;
    course.category = category || course.category;
    course.images = images || course.images;

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    await course.remove();
    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
