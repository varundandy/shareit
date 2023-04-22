import React, { useContext, useState } from "react";
import { ReactNode } from "react";
import { User } from "../types/interface";
import { Navbar, PinDetail, Feed, Search, CreatePin } from "../components";
import { Outlet, Route, Routes } from "react-router-dom";
import UserContext from "../store/UserContext";

type PinsProps = {
  children?: ReactNode;
};
const Pins = (props: PinsProps) => {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="h-full">
        <Outlet />
        {/*  <Routes >
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user && user}/>} />
          <Route path='/create-pin' element={<CreatePin user={user && user}/>} />
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} />
        </Routes> */}
      </div>
    </div>
  );
};

export default Pins;
