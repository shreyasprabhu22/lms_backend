const mongoose = require('mongoose');

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


const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
