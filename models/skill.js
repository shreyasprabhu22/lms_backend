const mongoose = require('mongoose');

// Define Skill Schema
const skillSchema = new mongoose.Schema({
  iconClass: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create a Skill Model based on the schema
const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
