import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routing";
import UserProvider from "./store/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>{" "}
    </>
  );
}

export default App;
