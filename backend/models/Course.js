const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["text", "video"], required: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  modules: [ModuleSchema]
});

module.exports = mongoose.model("Course", CourseSchema);
