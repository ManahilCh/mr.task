function TaskDetails({ task }) {
  if (!task) return <div className="card">Select a task to view details</div>;

  return (
    <div className="card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate ? task.dueDate.slice(0, 10) : "No date"}</p>
    </div>
  );
}

export default TaskDetails;