const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const protect = require("../middleware/auth");
const validateRequest = require("../middleware/validationMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  uploadAttachment
} = require("../controllers/taskController");

const router = express.Router();

const upload = multer({
  dest: "src/uploads/attachments"
});

router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Task title is required")
  ],
  validateRequest,
  createTask
);

router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.post("/:id/attachment", protect, upload.single("file"), uploadAttachment);

module.exports = router;