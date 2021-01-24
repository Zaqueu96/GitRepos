import React from "react";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <HomePage />
      <ToastContainer />
    </>
  );
}

export default App;
