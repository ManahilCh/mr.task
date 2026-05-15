function AISuggestions({ suggestion }) {
  if (!suggestion) {
    return (
      <div className="card">
        <h2>Mr.Task AI Butler</h2>
        <p className="muted">Write a task and click Ask AI Butler.</p>
      </div>
    );
  }

  return (
    <div className="card ai-card">
      <h2>{suggestion.aiName}</h2>
      <p>{suggestion.summary}</p>

      <h3>Suggested Priority: {suggestion.suggestedPriority}</h3>

      <h3>Smart Checklist</h3>
      <ul>
        {suggestion.suggestedChecklist?.map((item, index) => (
          <li key={index}>✓ {item}</li>
        ))}
      </ul>

      <h3>Automation Ideas</h3>
      <ul>
        {suggestion.automation?.map((item, index) => (
          <li key={index}>⚡ {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default AISuggestions;