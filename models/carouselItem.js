const mongoose = require('mongoose');


const carouselItemSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true }
});


module.exports = mongoose.model('CarouselItem', carouselItemSchema);
