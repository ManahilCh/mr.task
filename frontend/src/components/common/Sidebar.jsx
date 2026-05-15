import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, CheckSquare, BarChart3, Users, Settings, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">M</div>
        <div>
          <h1>Mr.Task</h1>
          <span>AI Workspace</span>
        </div>
      </div>

      <nav className="side-nav">
        <Link to="/dashboard"><LayoutDashboard size={18} /> Dashboard</Link>
        <Link to="/tasks"><CheckSquare size={18} /> Tasks</Link>
        <Link to="/analytics"><BarChart3 size={18} /> Analytics</Link>
        <Link to="/team"><Users size={18} /> Team</Link>
        <Link to="/settings"><Settings size={18} /> Settings</Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;