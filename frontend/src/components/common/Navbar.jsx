import { Bell, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="navbar">
      <div>
        <h2>Mr.Task</h2>
        <p>AI-powered team productivity workspace</p>
      </div>

      {showSearch && (
        <input
          className="navbar-search"
          placeholder="Go to tasks and search..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/tasks");
          }}
        />
      )}

      <div className="navbar-actions">
        <button onClick={() => setShowSearch(!showSearch)}>
          <Search size={18} />
        </button>

        <button onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={18} />
        </button>

        <button onClick={() => navigate("/settings")}>
          <User size={18} />
        </button>
      </div>

      {showNotifications && (
        <div className="notification-box">
          <h3>Notifications</h3>
          <p>No new notification</p>
          <p>Deadline alerts will appear here.</p>
        </div>
      )}

      <div className="profile-chip">
        {user?.name} - {user?.role}
      </div>
    </header>
  );
}

export default Navbar;