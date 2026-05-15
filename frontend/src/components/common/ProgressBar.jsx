function ProgressBar({ value }) {
  return (
    <div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
      <p className="muted">{value}% completed</p>
    </div>
  );
}

export default ProgressBar;