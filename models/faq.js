const mongoose = require('mongoose');

// Define FAQ Schema
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

// Create a FAQ model based on the schema
const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;
