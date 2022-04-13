import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const authed = user !== null; // isauth() returns true or false based on localStorage

  return authed ? children : navigate("/login");
};

export default RequireAuth;
