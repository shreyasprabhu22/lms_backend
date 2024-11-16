const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

// Route to get all skills
router.get('/', skillsController.getAllSkills);

// Route to add multiple skills
router.post('/', skillsController.addMultipleSkills);

module.exports = router;
