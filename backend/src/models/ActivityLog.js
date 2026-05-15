const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    },

    details: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);