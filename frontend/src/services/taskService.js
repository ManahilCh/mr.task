import API from "./api";

export const getTasks = async (params = {}) => {
  const res = await API.get("/tasks", { params });
  return res.data;
};

export const createTask = async (data) => {
  const res = await API.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await API.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};