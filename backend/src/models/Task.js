const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema({
  text: String,
  done: {
    type: Boolean,
    default: false
  }
});

const commentSchema = new mongoose.Schema(
  {
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Review", "Completed"],
      default: "Pending"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium"
    },

    dueDate: Date,

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace"
    },

    checklist: [checklistSchema],

    attachments: [String],

    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);