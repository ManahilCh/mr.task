function WorkspaceCard({ workspace }) {
  return (
    <div className="card">
      <h2>{workspace?.name || "DevelopersHub Workspace"}</h2>
      <p>{workspace?.description || "Team project workspace for Mr.Task."}</p>
    </div>
  );
}

export default WorkspaceCard;