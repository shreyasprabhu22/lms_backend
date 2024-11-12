const Cart = require('../models/cart');
const Course = require('../models/course');
const User = require('../models/user');

// Get the user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('courses.courseId');
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a course to the cart
const addCourseToCart = async (req, res) => {
  const { courseId } = req.body; // courseId to add
  
  try {
    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({
        userId: req.params.userId,
        courses: [{ courseId }]
      });
    } else {
      // Check if the course is already in the cart
      const courseExists = cart.courses.some(c => c.courseId.toString() === courseId);
      if (courseExists) {
        return res.status(400).json({ msg: 'Course is already in the cart' });
      } else {
        // Add the course to the cart
        cart.courses.push({ courseId });
      }
    }

    await cart.save();
    res.json({ msg: 'Course added to cart', cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Remove a course from the cart
const removeCourseFromCart = async (req, res) => {
  const { courseId } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    // Remove the course from the cart
    cart.courses = cart.courses.filter(course => course.courseId.toString() !== courseId);

    await cart.save();
    res.json({ msg: 'Course removed from cart', cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getCart, addCourseToCart, removeCourseFromCart };
