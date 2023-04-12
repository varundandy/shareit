import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
