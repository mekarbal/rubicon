const Project = require("../models/Project");
const Task = require("../models/Task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("project").exec();

    res.status(200).json({
      message: "Tasks List",
      tasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { label, description, starting_date, ending_date, project } =
      req.body;

    // Check if the project ID exists in the database
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const newTask = new Task({
      label,
      description,
      starting_date,
      ending_date,
      project,
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      message: "Task saved",
      task: savedTask,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "Finded Task",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Update an existing task by ID
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { label, description, starting_date, ending_date, project } =
      req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        label,
        description,
        starting_date,
        ending_date,
        project,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
