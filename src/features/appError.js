import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

export const errorSlice = createSlice({
  name: "error",
  initialState: { value: initialStateValue },
  reducers: {
    toggleError: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleError } = errorSlice.actions;

export default errorSlice.reducer;
