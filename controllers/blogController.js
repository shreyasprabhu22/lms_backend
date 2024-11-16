const Blog = require("../models/blog");

const createBlog = async (req, res) => {
  const { title, content, author,authorImage, date, description, category, images } = req.body;
  try {
    const maxBlog = await Blog.findOne().sort({ blog_id: -1 });
    let nextBlogId = "B01";
    if (maxBlog) {
      const lastBlogId = maxBlog.blog_id;
      const numericId = parseInt(lastBlogId.substring(1));
      nextBlogId = `B${(numericId + 1).toString().padStart(2, "0")}`;
    }
    const newBlog = new Blog({
      blog_id: nextBlogId,
      title,
      content,
      author,
      authorImage,
      date,
      description,
      category,
      images,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createBlogs = async (req, res) => {
  const blogs = req.body;

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return res.status(400).json({ msg: "Invalid input. Please provide an array of blogs." });
  }

  try {
    const maxBlog = await Blog.findOne().sort({ blog_id: -1 });
    let nextBlogIdNumber = maxBlog ? parseInt(maxBlog.blog_id.substring(1)) + 1 : 1;

    const blogsWithIds = blogs.map((blog) => {
      const { title, content, author,authorImage, date, description, category, images } = blog;

      const nextBlogId = `B${nextBlogIdNumber.toString().padStart(2, "0")}`;
      nextBlogIdNumber++; // Increment for the next blog

      return new Blog({
        blog_id: nextBlogId,
        title,
        content,
        author,
        authorImage,
        date,
        description,
        category,
        images,
      });
    });

    const savedBlogs = await Blog.insertMany(blogsWithIds);
    res.status(201).json(savedBlogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    if (blogs.length === 0) {
      return res.status(404).json({ msg: "No blogs found" });
    }
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ blog_id:req.params.id });
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, author, authorImage, date, description, category, images } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.authorImage = authorImage || blog.authorImage;
    blog.date = date || blog.date;
    blog.description = description || blog.description;
    blog.category = category || blog.category;
    blog.images = images || blog.images;

    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteBlog = async (req, res) => {
  try {
    // Find the instructor by the instructorId (string)
    const blog = await Blog.findOne({ blog_id: req.params.id });

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    await Blog.deleteOne({ blog_id: req.params.id });
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getUpcomingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (blogs.length === 0) {
      return res.status(404).json({ msg: "No blogs found" });
    }

    // Convert date strings to Date objects for sorting
    const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    
    res.json(sortedBlogs);
  } catch (err) {
    console.error('Error fetching recent blogs:', err.message);
    res.status(500).send("Server Error");
  }
};




module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUpcomingBlogs,
  createBlogs,
};
