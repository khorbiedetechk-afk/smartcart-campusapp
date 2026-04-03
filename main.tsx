import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SmartCartCampus from "./components/SmartCartCampus";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmartCartCampus />
  </StrictMode>
);
