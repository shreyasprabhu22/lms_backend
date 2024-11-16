const mongoose = require('mongoose');

// Define Feature schema
const featureSchema = new mongoose.Schema({
  iconClass: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Create the Feature model
const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
