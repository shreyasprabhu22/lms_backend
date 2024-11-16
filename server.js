const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const blogRoutes = require('./routes/blog');
const instructorRoutes = require('./routes/instructor');
const cartRoutes = require('./routes/cart');
const skillsRoutes=require('./routes/skill');
const faqRoutes=require('./routes/faq');
const featureRoutes = require('./routes/feature');
const pricingBoxRoutes = require('./routes/pricingBox');
const carouselRoutes = require('./routes/carouselItem');
const cors = require('cors');

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// CORS Configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/feature',featureRoutes)
app.use('/api/pricing', pricingBoxRoutes);
app.use('/api/carousel', carouselRoutes);

// Start the server
const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//node server.js  - running backend
