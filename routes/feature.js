const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

// Route to get all features
router.get('/', featureController.getAllFeatures);

// Route to add multiple features
router.post('/', featureController.addMultipleFeatures);

module.exports = router;
