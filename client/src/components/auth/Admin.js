import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Draft.css";

//generate stats from request

const updatePlayers = () => {
  axios
    .post("/api/players/update/stats")
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
};

function Admin() {
  return (
    <button className="btn btn-accent-1" onClick={() => updatePlayers()}>
      Update Players
    </button>
  );
}

export default Admin;
