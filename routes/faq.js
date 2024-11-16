const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Route to get all FAQs
router.get('/', faqController.getAllFaqs);

// Route to add multiple FAQs
router.post('/', faqController.addMultipleFaqs);

module.exports = router;
