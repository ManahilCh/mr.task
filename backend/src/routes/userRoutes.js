const express = require("express");
const protect = require("../middleware/auth");

const {
  getUsers,
  inviteUser,
  updateUser,
  deleteUser,
  getProfile
} = require("../controllers/userController");

const router = express.Router();

router.get("/", protect, getUsers);
router.get("/profile", protect, getProfile);
router.post("/invite", protect, inviteUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;