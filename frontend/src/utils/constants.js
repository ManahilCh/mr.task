export const TASK_STATUS = ["Pending", "In Progress", "Review", "Completed"];

export const TASK_PRIORITY = ["Low", "Medium", "High", "Urgent"];export const calculateProgress = (tasks) => {
  if (!tasks.length) return 0;

  const completed = tasks.filter((task) => task.status === "Completed").length;
  return Math.round((completed / tasks.length) * 100);
};