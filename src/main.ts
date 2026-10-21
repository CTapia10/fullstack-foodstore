import { checkAuhtUser } from "./utils/auth";

const path = window.location.pathname;
const loginPath = "/src/pages/auth/login/login.html";
const adminHomePath = "/src/pages/admin/home/home.html";
const clientHomePath = "/src/pages/client/home/home.html";

if (path.includes("/admin/")) {
  checkAuhtUser(loginPath, clientHomePath, "admin");
} else if (path.includes("/client/")) {
  checkAuhtUser(loginPath, adminHomePath, "client");
}
