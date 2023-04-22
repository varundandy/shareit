import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import SidebarWrapper from "../components/SidebarWrapper";

const RootLayout = () => {
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen">
      <SidebarWrapper />
      <Outlet />
    </div>
  );
};

export default RootLayout;
