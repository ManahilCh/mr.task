export const formatDate = (date) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
};