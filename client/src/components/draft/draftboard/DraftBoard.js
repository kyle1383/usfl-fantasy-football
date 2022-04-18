import React from "react";

import "../../../styles/DraftBoard.css";
import TeamColumn from "./TeamColumn";
import axios from "axios";

function DraftBoard({ teams, rounds, boardView, rosterSpots }) {
  /*useEffect(() => {
   
  }, [team_id]);*/
  let index = 1;
  let teamColumns = [];
  teams.map((team, k) => {
    teamColumns.push(
      <TeamColumn
        team={team}
        player_ids={team.players}
        index={index}
        rounds={rounds}
        boardView={boardView}
        rosterSpots={rosterSpots}
        key={k}
      />
    );
    index++;
  });

  return <div className="draftboard">{teamColumns}</div>;
}

export default React.memo(DraftBoard);

const areEqual = (prevProps, nextProps) => true;
