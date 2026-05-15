import { useSelector } from "react-redux";

const useTasks = () => {
  return useSelector((state) => state.tasks.tasks);
};

export default useTasks;