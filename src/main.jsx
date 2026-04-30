import "./App.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { VoucherProvider } from "./context/VoucherContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <VoucherProvider>
      <App />
    </VoucherProvider>
  </AuthProvider>
);