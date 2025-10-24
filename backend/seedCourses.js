const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect(
  "mongodb+srv://avinashvalavoju_db:XjfmJlrcdY5mFOd4@training-center.apyjqdh.mongodb.net/?retryWrites=true&w=majority",
  {}
).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const courses = [
  {
    title: "C Programming",
    description: "Learn basics of C",
    modules: [
      { title: "Introduction to C", type: "video", content: "https://www.youtube.com/embed/rLf3jnHxSmU" },
      { title: "C Variables and Data Types", type: "video", content: "https://www.youtube.com/embed/rQoqCP7LX60" },
      { title: "Control Structures in C", type: "video", content: "https://www.youtube.com/embed/7PSfRdeY5qE" },
      { title: "Functions and Pointers", type: "video", content: "https://www.youtube.com/embed/mIY3QVktHU8" }
    ]
  },
  {
    title: "Java",
    description: "Master Java programming",
    modules: [
      { title: "Introduction to Java", type: "video", content: "https://www.youtube.com/embed/ntLJmHOJ0ME" },
      { title: "Java Variables and Data Types", type: "video", content: "https://www.youtube.com/embed/X0zdAG7gfgs" },
      { title: "OOP Concepts in Java", type: "video", content: "https://www.youtube.com/embed/HHWPcyFmw2o" },
      { title: "Java Exception Handling", type: "video", content: "https://www.youtube.com/embed/5r_ERSm7NKE" }
    ]
  },
  {
    title: "Python",
    description: "Python for beginners",
    modules: [
      { title: "Introduction to Python", type: "video", content: "https://www.youtube.com/embed/xAcTmDO6NTI" },
      { title: "Python Loops & Functions", type: "video", content: "https://www.youtube.com/embed/S73thl0AyFU" },
      { title: "Python OOP", type: "video", content: "https://www.youtube.com/embed/HeW-D6KpDwY" },
      { title: "Python Libraries Overview", type: "video", content: "https://www.youtube.com/embed/vtgDGrUiUKk" }
    ]
  },
  {
    title: "Web Development",
    description: "HTML, CSS, JS, React",
    modules: [
      { title: "HTML Basics", type: "video", content: "https://www.youtube.com/embed/HGTJBPNC-Gw" },
      { title: "CSS Styling", type: "video", content: "https://www.youtube.com/embed/wRNinF7YQqQ" },
      { title: "JavaScript Fundamentals", type: "video", content: "https://www.youtube.com/embed/lfmg-EJ8gm4" },
      { title: "React Introduction", type: "video", content: "https://www.youtube.com/embed/CgkZ7MvWUAA" }
    ]
  },
  {
    title: "Data Structures",
    description: "Learn DS in Java",
    modules: [
      { title: "Arrays and Linked Lists", type: "video", content: "https://www.youtube.com/embed/qauEA64G1Ds" },
      { title: "Stacks and Queues", type: "video", content: "https://www.youtube.com/embed/A3ZUpyrnCbM" },
      { title: "Trees and Graphs", type: "video", content: "https://www.youtube.com/embed/VKX92zNI1Tc" },
      { title: "Advanced DS Concepts", type: "video", content: "https://www.youtube.com/embed/8h80p_rYv1Y" }
    ]
  },
  {
    title: "Machine Learning",
    description: "Intro to ML concepts",
    modules: [
      { title: "Introduction to ML", type: "video", content: "https://www.youtube.com/embed/ukzFI9rgwfU" },
      { title: "Supervised Learning", type: "video", content: "https://www.youtube.com/embed/4qVRBYAdLAo" },
      { title: "Unsupervised Learning", type: "video", content: "https://www.youtube.com/embed/JnnaDNNb380" },
      { title: "ML Algorithms", type: "video", content: "https://www.youtube.com/embed/z18nw4adsx4" }
    ]
  },
  {
    title: "Artificial Intelligence",
    description: "AI fundamentals",
    modules: [
      { title: "Intro to AI", type: "video", content: "https://www.youtube.com/embed/Yq0QkCxoTHM" },
      { title: "Search Algorithms in AI", type: "video", content: "https://www.youtube.com/embed/ZEtnHzZ8nH0" },
      { title: "Knowledge Representation", type: "video", content: "https://www.youtube.com/embed/9iN3O_oL2ac" },
      { title: "AI Applications", type: "video", content: "https://www.youtube.com/embed/xBSMBEowLcY" }
    ]
  }
];

const seed = async () => {
  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log("Courses seeded successfully");
  mongoose.connection.close();
};

seed();
