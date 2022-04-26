import React, { useState, useEffect } from "react";

import "../../styles/Dashboard.css";
import "../../styles/Standings.css";

function Standings({ standings, status }) {
  useEffect(() => {}, []);
  const TeamRank = ({ team, index }) => {
    return (
      <tr className="team-rank">
        <td className="rank-number">{index}</td>
        <td>{team.team.name}</td>
        <td>{team.owner}</td>
      </tr>
    );
  };
  const TableHeader = () => {
    return (
      <tr className="team-rank">
        <th>{status != "COMPLETE" ? "Pick" : "Rank"}</th>
        <th>Team</th>
        <th>Owner</th>
      </tr>
    );
  };
  const TeamRanks = () => {
    let teamRanks;

    if (!standings) {
      teamRanks = "there are no leagues!";
    } else {
      let index = 0;
      teamRanks = standings.teams.map((team, k) => {
        index++;
        return <TeamRank team={team} index={index} key={k} />;
      });
    }

    return <tbody>{teamRanks}</tbody>;
  };

  return (
    <table className="team-ranks ">
      <thead>
        <TableHeader />
      </thead>
      <TeamRanks />
    </table>
  );
}

export default Standings;
