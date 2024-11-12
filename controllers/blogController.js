const Blog = require('../models/blog');

// Get upcoming blogs within the next 7 days, sorted by date
const getUpcomingBlogs = async (req, res) => {
  try {
    // Get the current date and the date 7 days from now
    const currentDate = new Date();
    const nextWeekDate = new Date();
    nextWeekDate.setDate(currentDate.getDate() + 7);  // Get the date 7 days from now

    // Query blogs that have a publish date within the next 7 days
    const upcomingBlogs = await Blog.find({
      date: { 
        $gte: currentDate,     // Start from the current date
        $lt: nextWeekDate      // Up to the date 7 days later
      }
    }).sort({ date: 1 });  // Sort by date in ascending order (earliest first)

    if (upcomingBlogs.length === 0) {
      return res.status(404).json({ msg: 'No upcoming blogs found in the next 7 days' });
    }

    res.json(upcomingBlogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUpcomingBlogs,  // Export the new function
};
