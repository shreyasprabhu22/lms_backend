const Skill = require('../models/skill');

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
};

// Add multiple skills
exports.addMultipleSkills = async (req, res) => {
  const newSkills = req.body; 
  console.log(newSkills)
  if (Array.isArray(newSkills) && newSkills.length > 0) {
    try {
      const insertedSkills = await Skill.insertMany(newSkills);
      res.status(201).json({ message: 'Skills added successfully', skills: insertedSkills });
    } catch (err) {
      res.status(500).json({ message: 'Error adding skills' });
    }
  } else {
    res.status(400).json({ message: 'Invalid data. Make sure the payload is an array of skills.' });
  }
};
