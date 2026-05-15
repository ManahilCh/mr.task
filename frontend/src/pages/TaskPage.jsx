import { useEffect, useState } from "react";

import TaskForm from "../components/tasks/TaskForm";
import DragBoard from "../components/tasks/DragBoard";
import AISuggestions from "../components/ai/AISuggestions";

import { createTask, deleteTask, getTasks, updateTask } from "../services/taskService";
import { getAISuggestion } from "../services/aiService";
import API from "../services/api";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    assignedTo: [],
    checklist: []
  };

  const [form, setForm] = useState(emptyForm);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks({ search, status: filter });
      setTasks(data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [search, filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.title.trim()) {
      setMessage("Task title is required");
      return;
    }

    try {
      if (editId) {
        await updateTask(editId, form);
        setMessage("Task updated successfully");
      } else {
        await createTask(form);
        setMessage("Task added successfully");
      }

      setForm(emptyForm);
      setEditId(null);
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Task action failed");
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);

    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "Pending",
      priority: task.priority || "Medium",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      assignedTo: task.assignedTo?.map((user) => user._id) || [],
      checklist: task.checklist || []
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(emptyForm);
  };

  const handleAI = async () => {
    setMessage("");

    if (!form.title.trim()) {
      setMessage("Write task title first");
      return;
    }

    try {
      const data = await getAISuggestion(form);
      setSuggestion(data);

      setForm({
        ...form,
        priority: data.suggestedPriority,
        checklist: data.suggestedChecklist.map((item) => ({
          text: item,
          done: false
        }))
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "AI suggestion failed");
    }
  };

  const handleMove = async (id, status) => {
    try {
      await updateTask(id, { status });
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Task move failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Task Board</h1>
          <p>Drag and drop tasks like Trello with AI automation support.</p>
        </div>
      </div>

      {message && <p className="info-text">{message}</p>}

      <div className="task-layout">
        <div className="card">
          <h2>{editId ? "Edit Task" : "Create Task"}</h2>

          <TaskForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            onAI={handleAI}
            users={users}
            editMode={!!editId}
            onCancel={cancelEdit}
          />
        </div>

        <AISuggestions suggestion={suggestion} />
      </div>

      <div className="filters">
        <input
          className="input"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input select-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>
      </div>

      <DragBoard
        tasks={tasks}
        onMove={handleMove}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default TaskPage;