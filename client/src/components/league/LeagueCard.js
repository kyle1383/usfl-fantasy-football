import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const LeagueCard = (props) => {
  const league = props.league;

  return (
    <div className="card-container">
      <div className="desc">
        <h2>
          <Link to={`/leagues/${league._id}`}>{league.name}</Link>
        </h2>
        <h3>{league.name}</h3>
        <p>{league.owner}</p>
      </div>
    </div>
  );
};

export default LeagueCard;
