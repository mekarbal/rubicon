const Project = require("../models/Project");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects?.length == 0) {
      return res.status(200).json({
        message: "Projects List is empty",
        projects,
      });
    }
    return res.status(200).json({
      message: "Projects List",
      projects,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { label, description, starting_date, ending_date } = req.body;

    const newProject = new Project({
      label,
      description,
      starting_date,
      ending_date,
    });

    const project = await newProject.save();

    res.status(201).json({
      message: "Project Saved",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({
      message: "Finded Project",
      project,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
// Update an existing project by ID
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { label, description, starting_date, ending_date } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        label,
        description,

        starting_date,
        ending_date,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Prject Updated Successfully",
      updatedProject,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndRemove(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
