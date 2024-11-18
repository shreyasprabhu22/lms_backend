const Faq = require('../models/faq');

// Get all FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FAQs', error: err.message });
  }
};

// Add multiple FAQs
exports.addMultipleFaqs = async (req, res) => {
  const faqs = req.body;
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return res.status(400).json({ message: 'Request body should be an array of FAQs.' });
  }
  const invalidFaqs = faqs.filter(faq => !faq.question || !faq.answer);
  if (invalidFaqs.length > 0) {
    return res.status(400).json({ message: 'Each FAQ must have both question and answer fields.' });
  }

  try {
    const insertedFaqs = await Faq.insertMany(faqs);
    res.status(201).json({ message: 'FAQs added successfully', faqs: insertedFaqs });
  } catch (err) {
    res.status(500).json({ message: 'Error adding FAQs', error: err.message });
  }
};
