import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Subscribe from "./pages/Subscribe.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import ConfirmEmail from "./pages/ConfirmEmail.tsx";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import History from "./pages/History.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <React.StrictMode>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/history" element={<History />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </Router>
);
