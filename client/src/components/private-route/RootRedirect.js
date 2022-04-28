import AuthService from "../../services/auth.service";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
function RequireAuth({ children }) {
  //const user = AuthService.getCurrentUser();
  let location = useLocation();

  if (!AuthService.isLoggedIn()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
