import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/common/ProgressBar";
import { getTasks } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hero-card">
        <h1>Welcome to Mr.Task</h1>
        <p>Professional AI-powered task management system for teams.</p>
      </motion.div>

      <div className="stats-grid">
        <div className="stat-card"><h2>{tasks.length}</h2><p>Total Tasks</p></div>
        <div className="stat-card"><h2>{completed}</h2><p>Completed</p></div>
        <div className="stat-card"><h2>{tasks.filter(t => t.status === "In Progress").length}</h2><p>In Progress</p></div>
        <div className="stat-card"><h2>{tasks.filter(t => t.priority === "Urgent").length}</h2><p>Urgent</p></div>
      </div>

      <div className="card">
        <h2>Overall Progress</h2>
        <ProgressBar value={progress} />
      </div>
    </div>
  );
}

export default Dashboard;