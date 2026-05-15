import { useState } from "react";

function Settings() {
  const [connected, setConnected] = useState([]);

  const toggleIntegration = (name) => {
    if (connected.includes(name)) {
      setConnected(connected.filter((item) => item !== name));
    } else {
      setConnected([...connected, name]);
    }
  };

  const integrations = ["Slack", "Google Drive", "GitHub", "Calendar"];

  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage workspace preferences and integrations.</p>
      </div>

      <div className="card">
        <h2>Power-Up Integrations</h2>
        <p className="muted">
          Demo integration toggles for your internship presentation.
        </p>

        <div className="integration-grid">
          {integrations.map((item) => (
            <button
              key={item}
              className="integration-card"
              onClick={() => toggleIntegration(item)}
            >
              <strong>{item}</strong>
              <span>
                {connected.includes(item) ? "Connected" : "Connect"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;