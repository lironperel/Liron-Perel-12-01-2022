import { createSlice } from "@reduxjs/toolkit";

let initialStateValue = { count: 0, list: [] };

if (localStorage.getItem("FavoritesArray") !== null) {
  initialStateValue.list = JSON.parse(localStorage.getItem("FavoritesArray"));
  initialStateValue.count = initialStateValue.list.length;
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { value: initialStateValue },
  reducers: {
    addToFavorites: (state, action) => {
      state.value.list.push(action.payload);
      state.value.count = state.value.list.length;
      localStorage.setItem("FavoritesArray", JSON.stringify(state.value.list));
    },
    removeFavorite: (state, action) => {
      state.value.list = state.value.list.filter(
        (favorite) => favorite.key !== action.payload
      );
      state.value.count = state.value.list.length;
      localStorage.setItem("FavoritesArray", JSON.stringify(state.value.list));
    },
  },
});

export const { addToFavorites, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
