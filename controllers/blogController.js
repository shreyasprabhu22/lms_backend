const Blog = require('../models/blog');


const createBlog = async (req, res) => {
  try {
    const { title, content, author, authorImage, date, description, category, images } = req.body;

    // Check if all required fields are provided
    if (!title || !content || !author || !date || !description || !category) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Create a new blog instance
    const newBlog = new Blog({
      title,
      content,
      author,
      authorImage,
      date,
      description,
      category,
      images
    });

    // Save the blog to the database
    await newBlog.save();
    
    res.status(201).json(newBlog);  // Send the created blog as the response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });  // Sort by date descending (latest blogs first)
    
    if (blogs.length === 0) {
      return res.status(404).json({ msg: 'No blogs found' });
    }

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, author, authorImage, date, description, category, images } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Update the blog with the new data
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.authorImage = authorImage || blog.authorImage;
    blog.date = date || blog.date;
    blog.description = description || blog.description;
    blog.category = category || blog.category;
    blog.images = images || blog.images;

    // Save the updated blog to the database
    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Delete the blog
    await blog.remove();

    res.json({ msg: 'Blog deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


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
