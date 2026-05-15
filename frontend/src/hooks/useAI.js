import { useSelector } from "react-redux";

const useAI = () => {
  return useSelector((state) => state.ai.suggestion);
};

export default useAI;