import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { HiMenu } from "react-icons/hi";
import { Link, useLoaderData } from "react-router-dom";
import { User, UserInfo } from "../types/interface";
import { client } from "../client";
import logo from "../assets/logo.png";
import { userQuery } from "../utils/data";
import { AiFillCloseCircle } from "react-icons/ai";
import UserContext from "../store/UserContext";

const SidebarWrapper = () => {
    const [toggleSideBar, setToggleSideBar] = useState(false);
  /* const [user, setUser] = useState<User | null>(null); */
    
  const scrollRef = useRef<HTMLDivElement>(null);
  const {user} = useContext(UserContext);
 
  /* const userInfo: UserInfo =
    localStorage.getItem("user") !== undefined ||
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user")!)
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      console.log(data);
      setUser(data[0]);
    });
  }, []); */

  useEffect(() => {
    if (scrollRef && scrollRef.current !== null) {
      scrollRef.current.scrollTo(0, 0);
    }
  });
  return (
    <Fragment>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar/>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            size={40}
            className="cursor-pointer"
            onClick={() => setToggleSideBar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`/user-profile/${user?._id}`}>
            <div className="rounded-full overflow-hidden">
              <img src={user?.image} alt="logo" className="w-28" />
            </div>
          </Link>
        </div>
        {toggleSideBar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end flex-row">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSideBar} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SidebarWrapper;
