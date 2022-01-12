import "./App.css";

import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "./components/Header";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites";
import ErrorDialog from "./components/ErrorDialog";

import { useSelector } from "react-redux";

function App() {
  const themeData = useSelector((state) => state.theme.value);

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(themeData.data), [themeData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            flexDirection: "column",
            bgcolor: "background.default",
            color: "text.primary",
            m: 0,
          }}
        >
          <ErrorDialog />
          <Header />
          <Container
            sx={{
              mt: 5,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
