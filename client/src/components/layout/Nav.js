import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "../../styles/Nav.css";

function Nav() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();
  const id = location.pathname.substring("/draft/".length);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [location]);
  //functions
  const logOut = () => {
    AuthService.logout();
  };

  //sub components
  const currentPath = location.pathname;
  const TitleLink = () => {
    if (currentPath.includes("draft")) {
      return null;
    } else {
      return (
        <Link to={"/"} className="title">
          USFL Fantasy
        </Link>
      );
    }
  };
  const NavLinks = () => {
    if (!currentPath.includes("draft")) {
      return (
        <div className="navbar-links">
          <div>
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div></div>
          )}
          <div className="cta">
            <Link to="/new-league">Create A League</Link>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <nav className="navbar">
      <TitleLink />
      <NavLinks />
    </nav>
  );
}

export default Nav;
