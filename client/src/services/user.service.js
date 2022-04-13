import axios from "axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return axios.get("/api/test/all");
};
const getUserBoard = () => {
  return axios.get("/api/test/user", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
};
export default UserService;
