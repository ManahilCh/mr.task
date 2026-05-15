import { useEffect, useState } from "react";
import API from "../services/api";
import TeamMembers from "../components/workspace/TeamMembers";
import InviteMember from "../components/workspace/InviteMember";

function TeamPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Team Collaboration</h1>
        <p>Add your full project team and assign tasks to members.</p>
      </div>

      <div className="task-layout">
        <TeamMembers users={users} onChange={fetchUsers} />
        <InviteMember onInvite={fetchUsers} />
      </div>
    </div>
  );
}

export default TeamPage;