import { useState } from "react";
import API from "../../services/api";

function TeamMembers({ users = [], onChange }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Member"
  });

  const startEdit = (user) => {
    setEditId(user._id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const updateUser = async () => {
    await API.put(`/users/${editId}`, form);
    setEditId(null);
    setForm({ name: "", email: "", role: "Member" });
    onChange();
  };

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    onChange();
  };

  return (
    <div className="card">
      <h2>Team Members</h2>

      {editId && (
        <div className="edit-member-box">
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="input select-input"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Member</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>

          <button className="primary-btn" onClick={updateUser}>
            Update Member
          </button>
        </div>
      )}

      <div className="team-list">
        {users.map((user) => (
          <div className="team-member" key={user._id}>
            <div className="avatar">{user.name?.[0]}</div>

            <div className="team-member-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span>{user.role}</span>
            </div>

            <div className="team-actions">
              <button className="edit-btn" onClick={() => startEdit(user)}>
                Edit
              </button>

              <button className="danger-btn small-danger" onClick={() => deleteUser(user._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMembers;