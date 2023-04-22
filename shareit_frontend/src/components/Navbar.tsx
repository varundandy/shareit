import React, { ReactNode, useContext } from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { User } from "../types/interface";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";

type NavbarProps = {
  children?: ReactNode;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};
const Navbar = (props: NavbarProps) => {
  const {user, setUser, removeUser} = useContext(UserContext);
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = props;

  if (!user) {
    return null;
  }

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md border-none outline-none focus-within:shadow-sm">
        <IoMdSearch size={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`/user-profile/${user._id}`} className="hidden md:block"> 
        <img src={user.image} alt="User" className="rounded-lg w-14 h-12"/>
        </Link>
        <Link to='create-pin' className=" flex justify-center items-center bg-black text-white rounded-lg w-12 h-12 md:w-12 md:h-12"> 
        <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
