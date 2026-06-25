export const isAdminLoggedIn = () => {
  return localStorage.getItem("admin") === "true";
};
