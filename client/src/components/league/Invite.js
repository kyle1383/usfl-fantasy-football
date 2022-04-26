import React, { Component, useState, useEffect } from "react";
import "../../styles/Invite.css";
import axios from "axios";
import AuthService from "../../services/auth.service";
import { useParams, useNavigate } from "react-router-dom";

/**
 * INVITE COMPONENT
 * 1st checks if you are logged in. If not, requests a login.
 */
function Invite() {
  const user = AuthService.getCurrentUser();
  const [league, setLeague] = useState();
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/leagues/" + id)
      .then((res) => {
        setLeague(res.data);
      })
      .catch((err) => {
        console.log("Error from League");
      });
  }, []);

  //functions
  function onJoinClick(e) {
    const data = {
      user: user.id,
    };
    console.log(data);

    axios
      .put("/api/leagues/join/" + id, data)
      .then((res) => {
        navigate("/leagues/" + id);
      })
      .catch((err) => {
        console.log("Error Joining League!");
      });
  }
  //sub componenets

  let LeagueItem = <div>You've been invited to {league?.name}!</div>;
  return (
    <div className="invite">
      <div className="">{LeagueItem}</div>
      <button onClick={(e) => onJoinClick(e)} className="btn-submit">
        Join League
      </button>
    </div>
  );
}

export default Invite;

/*
axios
      .get("/api/leagues/" + id)
      .then((res) => {
        this.setState({
          league: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from League");
      });
*/
