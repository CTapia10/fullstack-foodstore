import type { IUser } from "../types/IUser";
import type { Users } from "../types/Users";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const saveUsers = (users: Users) => {
  const parseUsers = JSON.stringify(users);
  localStorage.setItem("users", parseUsers);
};

export const getUsers = (): Users => {
  const users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users) as Users;
  }
  return [] as Users;
};