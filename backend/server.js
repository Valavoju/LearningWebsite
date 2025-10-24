const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); 
const Course = require('./models/Course'); 
const authMiddleware = require('./middleware'); 

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(
  "mongodb+srv://avinashvalavoju_db:XjfmJlrcdY5mFOd4@training-center.apyjqdh.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;


    let exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: 'User already exists' });

    if (password !== confirmpassword)
      return res.status(400).json({ msg: 'Passwords do not match' });

    const newUser = new User({
      username,
      email,
      password,
      confirmpassword,
      enrolledCourses: []
    });

    await newUser.save();
    res.status(201).json({ msg: 'Registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (user.password !== password)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, 'jwtSecret', { expiresIn: 3600000 });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        enrolledCourses: user.enrolledCourses 
      } 
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get("/api/auth/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -confirmpassword")
      .populate("enrolledCourses"); 

    if (!user) return res.status(404).send("User not found");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



app.post('/api/enroll', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ msg: 'Course ID is required' });


    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    const populatedUser = await User.findById(req.user.id)
      .populate('enrolledCourses', 'title description');

    res.json({ msg: 'Enrolled successfully', enrolledCourses: populatedUser.enrolledCourses });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
