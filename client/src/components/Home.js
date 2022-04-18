import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
const Home = () => {
  function refresh() {
    axios.post("/api/players/refresh");
  }
  useEffect(() => {}, []);
  return (
    <div className="landing page">
      <div className="nav-item">
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </div>
    </div>
  );
};
export default Home;
/*
<Button variant="contained" type="button" onClick={() => refresh()}>
Update Players
</Button>*/
