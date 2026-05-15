import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(form);
      alert("Registration successful. Now login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="auth-card" onSubmit={submitHandler}>
      <div className="brand center">
        <div className="brand-logo">M</div>
        <h1>Mr.Task</h1>
      </div>

      <h2>Create Account</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        className="input"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="input"
        type="password"
        placeholder="Password minimum 6 characters"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
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

      <button className="primary-btn">Register</button>

      <p className="muted">
        Already have account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default RegisterForm;