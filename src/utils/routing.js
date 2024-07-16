export const handleLogin = () => {
  window.location.href = "directions";
};

export const handleLogout = () => {
  sessionStorage.removeItem("Token");
  window.location.href = "/";
};
