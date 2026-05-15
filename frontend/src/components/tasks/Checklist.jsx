function Checklist({ items = [] }) {
  return (
    <div className="checklist">
      <h3>Checklist</h3>

      {items.length === 0 && <p className="muted">No checklist added</p>}

      {items.map((item, index) => (
        <label key={index}>
          <input type="checkbox" checked={item.done} readOnly />
          {item.text}
        </label>
      ))}
    </div>
  );
}

export default Checklist;