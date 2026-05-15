import API from "./api";

export const getAISuggestion = async (data) => {
  const res = await API.post("/ai/suggest", data);
  return res.data;
};