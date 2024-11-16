const PricingBox = require('../models/pricingBox');

// Controller to add an array of pricing data
exports.addPricingBoxes = async (req, res) => {
  try {
    const pricingBoxes = req.body;  // Expecting an array of pricing box objects
    if (!Array.isArray(pricingBoxes)) {
      return res.status(400).json({ message: "Input data must be an array" });
    }

    // Insert multiple pricing boxes at once
    const result = await PricingBox.insertMany(pricingBoxes);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding pricing boxes", error: error.message });
  }
};

// Controller to get all pricing boxes
exports.getAllPricingBoxes = async (req, res) => {
  try {
    const pricingBoxes = await PricingBox.find();  // Get all documents
    res.status(200).json(pricingBoxes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching pricing boxes", error: error.message });
  }
};
