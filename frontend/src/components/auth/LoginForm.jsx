import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../../redux/slices/authSlice";
import { loginUser } from "../../services/authService";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form);
      dispatch(setCredentials(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="auth-card" onSubmit={submitHandler}>
      <div className="brand center">
        <div className="brand-logo">M</div>
        <h1>Mr.Task</h1>
      </div>

      <h2>Login</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        className="input"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="primary-btn">Login</button>

      <p className="muted">
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default LoginForm;