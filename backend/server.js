const app = require("./src/app");
const connectDB = require("./src/config/db");
const { startDeadlineReminderJob } = require("./src/services/deadlineReminderService");
require("dotenv").config();

connectDB();

startDeadlineReminderJob();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Mr.Task backend running on port ${PORT}`);
});