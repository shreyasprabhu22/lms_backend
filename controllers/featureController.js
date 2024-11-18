const Feature = require('../models/feature');

// Get all features
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching features', error: err.message });
  }
};

// Add multiple features
exports.addMultipleFeatures = async (req, res) => {
  const features = req.body;
  if (!Array.isArray(features) || features.length === 0) {
    return res.status(400).json({ message: 'Request body should be an array of features.' });
  }
  const invalidFeatures = features.filter(feature => !feature.iconClass || !feature.title || !feature.description);
  if (invalidFeatures.length > 0) {
    return res.status(400).json({ message: 'Each feature must have iconClass, title, and description fields.' });
  }

  try {
    const insertedFeatures = await Feature.insertMany(features);
    res.status(201).json({ message: 'Features added successfully', features: insertedFeatures });
  } catch (err) {
    res.status(500).json({ message: 'Error adding features', error: err.message });
  }
};
