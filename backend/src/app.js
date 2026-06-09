const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Fix Vercel favicon errors
|--------------------------------------------------------------------------
*/
app.get("/favicon.ico", (req, res) => {
  return res.status(204).end();
});

app.get("/favicon.png", (req, res) => {
  return res.status(204).end();
});

/*
|--------------------------------------------------------------------------
| Static Uploads
|--------------------------------------------------------------------------
*/
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mr.Task API is running successfully 🚀",
    version: "1.0.0"
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/users", userRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/
app.use(errorHandler);

module.exports = app;