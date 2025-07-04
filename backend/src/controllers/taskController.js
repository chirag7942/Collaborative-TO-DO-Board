import Task from "../models/Task.js";
import User from "../models/User.js";
import Log from "../models/Log.js";

// Get all tasks with assigned user details
export const getTasks = async (req, res) => {

  try {
    const tasks = await Task.find().populate("assignedTo", "name");
    res.json(tasks);
  } 
  
  catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};


// Create a new task with uniqueness check
export const createTask = async (req, res) => {

  try {

    const { title, description, status, priority, assignedTo } = req.body;

    // Ensure task title is unique
    const existing = await Task.findOne({ title });

    if (existing) return res.status(400).json({ message: "Task title already exists" });

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      assignedTo,
    });

    // Log the task creation
    await Log.create({
      action: `Created task '${title}'`,
      taskId: task._id,
      userId: req.userId,
    });

    res.status(201).json(task);
  } 
  
  catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};


// Update task with conflict handling using updatedAt timestamp
export const updateTask = async (req, res) => {

  try {
    const { updatedAt, ...updates } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Conflict check: if task was updated elsewhere, reject
    if (new Date(updatedAt).getTime() !== new Date(task.updatedAt).getTime()) {
      return res.status(409).json({
        message: "Conflict detected. Task has been modified by another user.",
        serverTask: task,
      });
    }

    // Safe to update
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    // Log the update
    await Log.create({
      action: `Updated task '${updatedTask.title}'`,
      taskId: updatedTask._id,
      userId: req.userId,
    });

    res.json(updatedTask);
  }
  
  catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};


// Delete a task
export const deleteTask = async (req, res) => {

  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    // Log the deletion
    await Log.create({
      action: `Deleted task '${task.title}'`,
      taskId: task._id,
      userId: req.userId,
    });

    res.json({ message: "Task deleted" });
  } 
  
  catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};


// Smart assign: assigns task to user with fewest tasks
export const smartAssignTask = async (req, res) => {
    
  try {
    const users = await User.find();
    let minTasks = Infinity;
    let bestUser = null;

    // Find user with the fewest assigned tasks
    for (const user of users) {
      const count = await Task.countDocuments({ assignedTo: user._id });
      if (count < minTasks) {
        minTasks = count;
        bestUser = user;
      }
    }

    // Update task assignment
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo: bestUser._id, updatedAt: new Date() },
      { new: true }
    );

    // Log the assignment
    await Log.create({
      action: `Smart assigned task '${task.title}' to ${bestUser.name}`,
      taskId: task._id,
      userId: req.userId,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Smart assign failed", error });
  }
};
