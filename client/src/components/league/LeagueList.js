import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LeagueCard from "./LeagueCard";

function LeagueList() {
  const [leagues, setLeagues] = useState([]);

  let leagueList;

  if (!leagues) {
    leagueList = "there is no book record!";
  } else {
    leagueList = leagues.map((league, k) => (
      <LeagueCard league={league} key={k} />
    ));
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leagues")
      .then((res) => {
        setLeagues(res.data);
      })
      .catch((err) => {
        console.log("Leagues are: ");
      });
  }, []);

  return (
    <div className="">
      <h2>Your Leagues</h2>

      <Link to="/new-league">Create New League</Link>

      <div>{leagueList}</div>
    </div>
  );
}

export default LeagueList;
