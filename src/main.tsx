import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
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
