import React, { useEffect, useState } from "react";
import axios from "axios";
import DraftItem from "./DraftItem";
import "../../../styles/DraftBoard.css";

function TeamColumn({ team, index, players, rounds }) {
  let picks = [];
  for (let i = 0; i < rounds; i++) {
    picks.push(
      <DraftItem player_id={players[i]} round={i} index={index} key={i} />
    );
  }

  return (
    <div className="team-column">
      <div className="team-name">{team.name}</div>
      <div>{picks}</div>
    </div>
  );
}

export default React.memo(TeamColumn);
