import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import aiReducer from "./slices/aiSlice";
import workspaceReducer from "./slices/workspaceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    ai: aiReducer,
    workspace: workspaceReducer
  }
});

export default store;