export interface UserInfo {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
}

export interface User {
  image: string;
  userName: string;
  _id: string;
}

/* export interface UserState {
  user: User | null;
}
 */
//type User = { name: string };
export type UserState = { user: User | null | undefined };
export type UserType = UserState;
// An interface for our actions
/* export interface UserAction {
    type: UserActionKind;
    payload: User | null;
  }
 */
export enum UserActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type UserAction =
  | { type: UserActionKind.LOGIN , payload: User}
  | { type: UserActionKind.LOGOUT };

export interface UserInitialState {
  user: User | null | undefined;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export type Asset = {
  url:string
  }
export type Image = {
asset:Asset
}

export type Save = {
postedBy : User
}

export type Pin = {
  _id:string,
  about:string,
  category:string,
  destination:string,
  image: Image,
  postedBy:User,
  save:Save[]
}


