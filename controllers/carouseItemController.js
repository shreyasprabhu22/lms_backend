const CarouselItem = require('../models/carouselItem');


exports.getCarouselItems = async (req, res) => {
  try {
    const items = await CarouselItem.find(); 
    res.status(200).json({ message: 'Carousel items fetched successfully', data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch carousel items', error });
  }
};


exports.addCarouselItems = async (req, res) => {
  const items = req.body; 

  try {
    const createdItems = await CarouselItem.insertMany(items); 
    res.status(201).json({ message: 'Carousel items added successfully', data: createdItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add carousel items', error });
  }
};
