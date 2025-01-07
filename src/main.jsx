import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TemplateProvider } from "./context/TemplateContext.jsx";
import { RecordsProvider } from "./context/RecordsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TemplateProvider>
        <RecordsProvider>
          <App />
        </RecordsProvider>
      </TemplateProvider>
    </AuthProvider>
  </StrictMode>
);
