const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true
  },
  courses: [
    {
      courseId: {
        type:String,
        required: true
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
