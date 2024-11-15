const Cart = require('../models/cart');
const Course = require('../models/course');

// Get the user's cart
const getCart = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL params

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId }).populate('courses.courseId');
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const addCourseToCart = async (req, res) => {
  const { userId } = req.params; 
  const { courseId } = req.body; 

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const courseExists = cart.courses.some(c => c.courseId.toString() === courseId);
      
      if (courseExists) {
        return res.status(400).json({ msg: 'Course already in cart' });
      }
      cart.courses.push({ courseId });
      await cart.save(); 
      return res.status(200).json({ msg: 'Course added to cart', cart });
    } else {
      cart = new Cart({
        userId,
        courses: [{ courseId }]
      });
      
      await cart.save(); 
      return res.status(201).json({ msg: 'New cart created and course added', cart });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



// Remove a course from the user's cart
// Remove a course from the user's cart
const removeCourseFromCart = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL params
  const { courseId } = req.body; // Extract courseId from request body

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    // Remove the course from the cart
    cart.courses = cart.courses.filter(course => course.courseId.toString() !== courseId);
    await cart.save();

    res.json({ msg: 'Course removed from cart', cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getCartWithCourses = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    // Get the course details using courseId from cart
    const courseIds = cart.courses.map(c => c.courseId);
    const courses = await Course.find({ course_id: { $in: courseIds } });

    // Map the courses to add them to the cart
    const cartWithCourses = cart.courses.map(cartItem => {
      const course = courses.find(c => c.course_id === cartItem.courseId);
      return {
        ...cartItem,
        courseDetails: course
      };
    });

    res.json(cartWithCourses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const clearCart = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL params

  try {
    // Find the cart for the user and remove all courses
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    // Clear all courses from the cart
    cart.courses = [];
    await cart.save();

    res.json({ msg: 'Cart cleared successfully', cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCart,
  addCourseToCart,
  removeCourseFromCart,
  getCartWithCourses,
  clearCart
};
