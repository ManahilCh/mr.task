const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

const createTask = async (req, res) => {
  try {
    if (req.user.role === "Member") {
      return res.status(403).json({
        message: "Members cannot create tasks. Only Admin and Manager can create tasks."
      });
    }

    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id
    });

    await ActivityLog.create({
      action: "TASK_CREATED",
      user: req.user._id,
      task: task._id,
      details: `Task "${task.title}" created`
    });

    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Task creation failed" });
  }
};

const getTasks = async (req, res) => {
  try {
    const { search, status, priority } = req.query;

    const query = {};

    if (req.user.role === "Member") {
      query.assignedTo = req.user._id;
    }

    if (status && status !== "All") query.status = status;
    if (priority && priority !== "All") query.priority = priority;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate("assignedTo", "name email role")
    .populate("createdBy", "name email role");

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (req.user.role === "Member") {
    const isAssigned = task.assignedTo.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (!isAssigned) {
      return res.status(403).json({
        message: "Members can only update their own assigned tasks."
      });
    }

    task.status = req.body.status || task.status;
    task.checklist = req.body.checklist || task.checklist;
    await task.save();

    return res.json(task);
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  await ActivityLog.create({
    action: "TASK_UPDATED",
    user: req.user._id,
    task: updatedTask._id,
    details: `Task "${updatedTask.title}" updated`
  });

  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({
      message: "Only Admin can delete tasks."
    });
  }

  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Task deleted successfully" });
};

const uploadAttachment = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.attachments.push(req.file.path);
  await task.save();

  res.json(task);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  uploadAttachment
};