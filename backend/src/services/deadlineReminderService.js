const cron = require("node-cron");
const Task = require("../models/Task");
const { sendEmail } = require("./emailService");

const startDeadlineReminderJob = () => {
  cron.schedule("0 9 * * *", async () => {
    console.log("Checking tomorrow deadline reminders...");

    const now = new Date();

    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(now.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      dueDate: {
        $gte: tomorrowStart,
        $lte: tomorrowEnd
      },
      status: { $ne: "Completed" }
    }).populate("assignedTo", "name email");

    for (const task of tasks) {
      for (const user of task.assignedTo) {
        await sendEmail({
          to: user.email,
          subject: `Reminder: "${task.title}" is due tomorrow`,
          message: `Hello ${user.name},\n\nYour task "${task.title}" is due tomorrow.\n\nStatus: ${task.status}\nPriority: ${task.priority}\n\nRegards,\nMr.Task AI Butler`
        });
      }
    }
  });
};

module.exports = { startDeadlineReminderJob };