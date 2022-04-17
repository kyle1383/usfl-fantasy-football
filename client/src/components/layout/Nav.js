import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useLocation } from "react-router-dom";
import AuthService from "../../services/auth.service";

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
        <div>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
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
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          <Link to="/new-league">Create A League</Link>
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
