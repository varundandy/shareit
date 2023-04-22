import { UserInfo } from "../types/interface";

export const fetchUser = () => {
  const userInfo: UserInfo =
    localStorage.getItem("user") !== undefined ||
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user")!)
      : localStorage.clear();

  return userInfo;
};
