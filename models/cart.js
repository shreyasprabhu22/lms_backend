const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',  // Reference to the Course model
        required: true
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
