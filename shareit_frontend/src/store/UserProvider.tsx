import React, { ReactNode, Reducer, useReducer } from "react";
import UserContext from "./UserContext";
import {
  User,
  UserAction,
  UserActionKind,
  UserInfo,
  UserState,
} from "../types/interface";
import { userQuery } from "../utils/data";
import { client } from "../client";

type UserProps = {
  children: ReactNode;
};

let userInStorage: string | null = localStorage.getItem("userObj");
let userInSession: User | null = userInStorage
  ? JSON.parse(userInStorage)
  : localStorage.clear();

const defaultUserState = {
  user: userInSession,
};

const userReducer: Reducer<UserState, UserAction> = (state, action) => {
  switch (action.type) {
    case UserActionKind.LOGIN: {
      const user: User = action.payload;
      localStorage.setItem("userObj", JSON.stringify(user));
      return { user: user };
    }
    case UserActionKind.LOGOUT: {
      return { user: null };
    }
    default:
      return state;
  }
};
let count = 0;
const UserProvider = (props: UserProps) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );
  console.log("Provider Render: " + count++);
  const addUserInStoreHandler = async (user: User) => {
    await dispatchUserAction({ type: UserActionKind.LOGIN, payload: user });
  };

  const removeUserInStoreHandler = async () => {
    await dispatchUserAction({ type: UserActionKind.LOGOUT });
  };

  const userContext = {
    user: userState.user,
    setUser: addUserInStoreHandler,
    removeUser: removeUserInStoreHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
