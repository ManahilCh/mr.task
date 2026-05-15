import { Plus, Brain, Save } from "lucide-react";

function TaskForm({ form, setForm, onSubmit, onAI, users = [], editMode = false, onCancel }) {
  const toggleAssignedUser = (userId) => {
    const already = form.assignedTo?.includes(userId);

    if (already) {
      setForm({
        ...form,
        assignedTo: form.assignedTo.filter((id) => id !== userId)
      });
    } else {
      setForm({
        ...form,
        assignedTo: [...(form.assignedTo || []), userId]
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        className="input"
        placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="input select-input"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Review</option>
        <option>Completed</option>
      </select>

      <select
        className="input select-input"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>

      <input
        className="input"
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <textarea
        className="input full"
        placeholder="Task description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="assign-box full">
        <h3>Assign To Team Members</h3>

        <div className="assign-list">
          {users.map((user) => (
            <label key={user._id} className="assign-member">
              <input
                type="checkbox"
                checked={form.assignedTo?.includes(user._id)}
                onChange={() => toggleAssignedUser(user._id)}
              />
              <span>{user.name}</span>
              <small>{user.role}</small>
            </label>
          ))}
        </div>
      </div>

      <button className="primary-btn">
        {editMode ? <Save size={18} /> : <Plus size={18} />}
        {editMode ? "Update Task" : "Add Task"}
      </button>

      <button type="button" className="ai-btn" onClick={onAI}>
        <Brain size={18} /> Ask AI Butler
      </button>

      {editMode && (
        <button type="button" className="danger-btn" onClick={onCancel}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default TaskForm;