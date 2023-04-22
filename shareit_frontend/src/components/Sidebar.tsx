import React, { ReactNode, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import UserContext from "../store/UserContext";

type SideBarProps = {
  children?: ReactNode;
  closeToggle?: (value: boolean) => void;
};

const Sidebar = (props: SideBarProps) => {
  const {user} = useContext(UserContext);
  const {closeToggle} = props;
  const categories = [
    {
      name: "Animals",
    },
    {
      name: "Wallpapers",
    },
    {
      name: "Photography",
    },
  ];
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";
  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-white h-full overflow-y-scroll min-w-210 h-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="Logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.map((category) => {
            return (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={category.name}
              >
                {" "}
                {category.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {user && (
        <Link to={`/user-profile/${user._id}`} className="flex flex-row items-center gap-2 mb-3 p-2 my-5 rounded-lg shadow-lg mx-3 bg-white"
        onClick={handleCloseSidebar}
        >
          <img src={user.image} alt="User" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer"/>
          <p>{user.userName}</p>
        </Link>
      ) }
    </div>
  );
};

export default Sidebar;
