const express = require('express');
const router = express.Router();
const pricingBoxController = require('../controllers/pricingBoxController');

// Route to get all pricing boxes
router.get('/', pricingBoxController.getAllPricingBoxes);

// Route to add a pricing box
router.post('/', pricingBoxController.addPricingBoxes);

module.exports = router;
