import React from "react";
import { Link } from "react-router-dom";

const LeagueCard = (props) => {
  const league = props.league;

  return (
    <div className="card-container">
      <div className="league-card">
        <h2>
          <Link to={`/leagues/${league._id}`}>{league.name}</Link>
        </h2>
        <h3>{league.name}</h3>
      </div>
    </div>
  );
};

export default LeagueCard;
