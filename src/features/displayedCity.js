import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { key: "215854", name: "Tel Aviv" };

export const citySlice = createSlice({
  name: "city",
  initialState: { value: initialStateValue },
  reducers: {
    changeCity: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;

export default citySlice.reducer;
