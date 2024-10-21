import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "slick-carousel/slick/slick.css"; // Import slick styles here
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles here
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
