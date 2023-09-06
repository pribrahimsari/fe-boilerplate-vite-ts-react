import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
// Material UI's default typography configuration relies only on the 300, 400, 500, and 700 font weights.
//   ref: https://mui.com/material-ui/getting-started/installation/
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// MUI: Global Reset
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
