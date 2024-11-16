const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouseItemController');

// Route to fetch all carousel items
router.get('/', carouselController.getCarouselItems);

// Route to add multiple carousel items
router.post('/', carouselController.addCarouselItems);

module.exports = router;
