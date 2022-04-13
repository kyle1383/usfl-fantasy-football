import axios from "axios";

const register = (username, email, password) => {
  return axios.post("/api/auth/signup", {
    username,
    email,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post("/api/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const isLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return true;
  } else {
    return false;
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
};
export default AuthService;
