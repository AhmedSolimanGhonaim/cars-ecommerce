// src/main.jsx
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import { MainLayout } from "./layout/MainLayout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/darkMode.css";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MainLayout />
    <ToastContainer position="bottom-right" />
  </Provider>
);
