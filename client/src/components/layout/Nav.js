import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import AuthService from "../../services/auth.service";
import "../../styles/Nav.css";

function Nav() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();
  const id = location.pathname.substring("/draft/".length);
  const [menuOpen, _setMenuOpen] = useState("closed");
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

  const setMenuOpen = () => {
    if (menuOpen == "closed") _setMenuOpen("open");
    if (menuOpen == "open") _setMenuOpen("closed");
  };
  //sub components

  const currentPath = location.pathname;

  const TitleLink = () => {
    if (currentPath.includes("draft/")) {
      return null;
    } else {
      return (
        <Link to={"/"} className="header-home">
          <p className="site-title">USFL</p>
          <p className="site-subtitle">Fantasy</p>
        </Link>
      );
    }
  };
  const UpperLink = () => {
    if (!currentPath.includes("draft")) {
      return (
        <div className={`navbar-upper-links ${menuOpen}`}>
          {currentUser ? (
            <div className="upper-links">
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
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <nav className="navbar">
      <UpperLink />
      <TitleLink />
      <FiMenu size="2em" className="menu-icon" onClick={() => setMenuOpen()} />
    </nav>
  );
}

export default Nav;
