// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    label: String,
    description: String,
    starting_date: Date,
    ending_date: Date,
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Project", projectSchema);
