import { createSlice } from "@reduxjs/toolkit";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#303d67",
          },
          secondary: {
            main: "#93b6e2",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#fff",
          },
          secondary: {
            main: "#93b6e2",
          },
        }),
  },
});

const initialStateValue = {
  mode: "light",
  data: getDesignTokens("light"),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: initialStateValue },
  reducers: {
    toggleColor: (state) => {
      state.value = {
        mode: state.value.mode === "light" ? "dark" : "light",
        data: getDesignTokens(state.value.mode === "light" ? "dark" : "light"),
      };
    },
  },
});

export const { toggleColor } = themeSlice.actions;

export default themeSlice.reducer;
