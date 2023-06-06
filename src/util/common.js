// return the admin data from the session storage
export const getadmin = () => {
  const adminStr = sessionStorage.getItem("admin");
  if (adminStr) return JSON.parse(adminStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// remove the token and admin from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("admin");
};

// set the token and admin from the session storage
export const setUserSession = (token, admin) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("admin", JSON.stringify(admin));
};
