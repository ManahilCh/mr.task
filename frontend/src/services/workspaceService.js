import API from "./api";

export const getWorkspaces = async () => {
  const res = await API.get("/workspaces");
  return res.data;
};

export const createWorkspace = async (data) => {
  const res = await API.post("/workspaces", data);
  return res.data;
};