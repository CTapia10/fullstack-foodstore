import type { IUser } from "../../../types/IUser";
import { getUsers, saveUsers } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form-registro") as HTMLFormElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const formData = new FormData(form);
  const valueEmail = formData.get("email") as string;
  const valuePassword = formData.get("password") as string;

  const user: IUser = {
    email: valueEmail,
    password: valuePassword,
    rol: "client",
    loggedIn: false,
  };

  const users = getUsers();
  if (users.find((user) => user.email === valueEmail)) {
    alert("el usuario ya existe");
    return;
  }
  users.push(user);
  saveUsers(users);
  navigate("/src/pages/auth/login/login.html");
});
