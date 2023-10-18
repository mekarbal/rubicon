// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    label: String,
    description: String,
    starting_date: Date,
    ending_date: Date,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Task", taskSchema);
