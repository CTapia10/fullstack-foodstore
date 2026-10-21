import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuhtUser = (
  redireccion1: string,
  redireccion2: string,
  rol: Rol
) => {
  const user = getUSer();
  if (user) {
    const parseUser: IUser = JSON.parse(user) as IUser;
    if (parseUser.rol !== rol) {
      alert("no tiene el rol necesario");
      navigate(redireccion2);
      return;
    }
    return;
  }

  navigate(redireccion1);
};

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};
