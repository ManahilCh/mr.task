import { useState } from "react";
import API from "../../services/api";

function InviteMember({ onInvite }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Member"
  });

  const [message, setMessage] = useState("");

  const invite = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/users/invite", form);
      setMessage(res.data.message);
      setForm({ name: "", email: "", role: "Member" });
      if (onInvite) onInvite();
    } catch (err) {
      setMessage(err.response?.data?.message || "Invite failed");
    }
  };

  return (
    <div className="card">
      <h2>Invite Team Member</h2>

      {message && <p className="info-text">{message}</p>}

      <form className="task-form" onSubmit={invite}>
        <input
          className="input"
          placeholder="Member name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Member email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          className="input select-input"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Member">Member</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="primary-btn">Send Invite</button>
      </form>

      <p className="muted">Default invited user password: 123456</p>
    </div>
  );
}

export default InviteMember;