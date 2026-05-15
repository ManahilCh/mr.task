const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendEmail } = require("../services/emailService");

const getUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

const inviteUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin" && req.user.role !== "Manager") {
      return res.status(403).json({
        message: "Only Admin and Manager can invite members."
      });
    }

    const { name, email, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const password = "123456";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword
    });

    await sendEmail({
      to: email,
      subject: "You are invited to Mr.Task",
      message: `Hello ${name},

You have been invited to Mr.Task team workspace.

Login Email: ${email}
Temporary Password: 123456
Role: ${role}

Please login and start managing your tasks.

Regards,
Mr.Task Team`
    });

    res.status(201).json({
      message: "User invited successfully and email sent.",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Invite failed" });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can update team members" });
    }

    const { name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch {
    res.status(500).json({ message: "User update failed" });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can delete team members" });
    }

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ message: "User delete failed" });
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  getUsers,
  inviteUser,
  updateUser,
  deleteUser,
  getProfile
};