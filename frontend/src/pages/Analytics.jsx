import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

function Analytics() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const progress = tasks.filter((task) => task.status === "In Progress").length;

  return (
    <div>
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Track project progress and team productivity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><h2>{tasks.length}</h2><p>Total Tasks</p></div>
        <div className="stat-card"><h2>{completed}</h2><p>Completed</p></div>
        <div className="stat-card"><h2>{pending}</h2><p>Pending</p></div>
        <div className="stat-card"><h2>{progress}</h2><p>In Progress</p></div>
      </div>
    </div>
  );
}

export default Analytics;