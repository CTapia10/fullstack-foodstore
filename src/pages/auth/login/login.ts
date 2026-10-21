import type { IUser } from "../../../types/IUser";
import { getUsers, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const users = getUsers();
  const userData = users.find(
    (user) => user.email === valueEmail && user.password === valuePassword,
  ) as IUser;
  if (userData) {
    if (userData.rol === "client") {
      userData.loggedIn = true;
      saveUser(userData);
      navigate("/src/pages/client/home/home.html");
    } else if (userData.rol === "admin") {
      userData.loggedIn = true;
      saveUser(userData);
      navigate("/src/pages/admin/home/home.html");
    } else {
      alert("no tiene un rol valido");
    }
  } else {
    alert("no existe el usuario");
  }
});
