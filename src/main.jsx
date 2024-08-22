import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContextoProvider } from "./context/Contexto.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextoProvider>
  </StrictMode>
);
