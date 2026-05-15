const express = require("express");
const protect = require("../middleware/auth");
const Workspace = require("../models/Workspace");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const workspace = await Workspace.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.user.id,
    members: [
      {
        user: req.user.id,
        role: "Admin"
      }
    ]
  });

  res.status(201).json(workspace);
});

router.get("/", protect, async (req, res) => {
  const workspaces = await Workspace.find()
    .populate("owner", "name email")
    .populate("members.user", "name email role");

  res.json(workspaces);
});

module.exports = router;