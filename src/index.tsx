import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";

// Theme is set to 'light' by default to preserve current appearance
// Change to 'dark' to test appearance under dark mode
const theme = getTheme("dark");

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/jedi-on-tauntauns/" element={<App />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
