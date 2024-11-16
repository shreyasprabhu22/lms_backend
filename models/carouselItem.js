const mongoose = require('mongoose');

// Define the CarouselItem schema
const carouselItemSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true }
});

// Create the model based on the schema
module.exports = mongoose.model('CarouselItem', carouselItemSchema);
