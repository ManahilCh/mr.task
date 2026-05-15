import { motion } from "framer-motion";
import { Trash2, Calendar, Edit, GripVertical } from "lucide-react";

function TaskCard({ task, onDelete, onEdit, dragListeners, dragAttributes }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="task-card">
      <div className="task-card-top">
        <button
          type="button"
          className="drag-handle"
          {...dragListeners}
          {...dragAttributes}
        >
          <GripVertical size={17} />
        </button>

        <h3>{task.title}</h3>

        <span className={`badge ${task.priority?.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p>{task.description}</p>

      <div className="task-meta">
        <Calendar size={14} />
        {task.dueDate ? task.dueDate.slice(0, 10) : "No due date"}
      </div>

      {task.assignedTo?.length > 0 && (
        <div className="assigned-users">
          {task.assignedTo.map((user) => (
            <span key={user._id}>{user.name}</span>
          ))}
        </div>
      )}

      <div className="task-actions">
        <button
          type="button"
          className="edit-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(task);
          }}
        >
          <Edit size={15} /> Edit
        </button>

        <button
          type="button"
          className="danger-btn small-danger"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(task._id);
          }}
        >
          <Trash2 size={15} /> Delete
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;