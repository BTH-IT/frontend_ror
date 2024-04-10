import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Subcribe from "./pages/Subcribe.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Unsubcribe from "./pages/Unsubcribe.tsx";
import ConfirmEmail from "./pages/ConfirmEmail.tsx";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <React.StrictMode>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/subcribe" element={<Subcribe />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/unsubcribe" element={<Unsubcribe />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </Router>
);
