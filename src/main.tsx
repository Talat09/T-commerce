import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "slick-carousel/slick/slick.css"; // Import slick styles here
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles here
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
