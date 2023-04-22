import { createContext } from "react";
import { User, UserInitialState } from "../types/interface";

const UserContext = createContext<UserInitialState>({
  user: null,
  setUser: (user: User) => {},
  removeUser: () => {},
});

export default UserContext;
