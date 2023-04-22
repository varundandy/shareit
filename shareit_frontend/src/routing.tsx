import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import Pins from "./container/Pins";
import { CreatePin, Feed, PinDetail, Search, UserProfile } from "./components";
import RootLayout from "./layouts/RootLayout";
import Error from "./container/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
   // errorElement: <Error />,
    children: [
      {
        element: <Home />,
        children: [
          { path: "user-profile/:userId", element: <UserProfile /> },
          {
            path: "*",
            element: <Pins />,
            children: [
              { index: true, element: <Feed /> },
              { path: "category/:categoryId", element: <Feed /> },
              { path: "pin-detail/:pinId", element: <PinDetail /> },
              { path: "create-pin", element: <CreatePin /> },
              { path: "search", element: <Search /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
