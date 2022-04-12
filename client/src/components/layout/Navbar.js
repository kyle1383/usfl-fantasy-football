import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="">
        <nav className="">
          <Link to="/">USFL Fantasy</Link>
          <Link to="/new-league">Create A League</Link>
        </nav>
      </div>
    );
  }
}
export default Navbar;
