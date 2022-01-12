import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import themeReducer from "./features/theme";
import cityReducer from "./features/displayedCity";
import favoritesReducer from "./features/favoritesList";
import errorReducer from "./features/appError";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    currentCity: cityReducer,
    favoritesList: favoritesReducer,
    appError: errorReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
