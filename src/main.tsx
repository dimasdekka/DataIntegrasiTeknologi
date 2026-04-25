import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found in document");
}

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        richColors
        expand={false}
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "Inter, system-ui, sans-serif",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
