import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    suggestion: null
  },
  reducers: {
    setSuggestion: (state, action) => {
      state.suggestion = action.payload;
    }
  }
});

export const { setSuggestion } = aiSlice.actions;
export default aiSlice.reducer;