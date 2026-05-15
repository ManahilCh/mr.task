const express = require("express");
const protect = require("../middleware/auth");
const { suggestTask } = require("../controllers/aiController");

const router = express.Router();

router.post("/suggest", protect, suggestTask);

module.exports = router;