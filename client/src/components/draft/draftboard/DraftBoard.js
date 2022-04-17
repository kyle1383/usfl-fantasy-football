import React from "react";

import "../../../styles/DraftBoard.css";
import TeamColumn from "./TeamColumn";
import axios from "axios";

function DraftBoard({ teams, rounds }) {
  /*useEffect(() => {
   
  }, [team_id]);*/
  let index = 1;
  let teamColumns = [];
  teams.map((team, k) => {
    teamColumns.push(
      <TeamColumn
        team={team}
        players={team.players}
        index={index}
        rounds={rounds}
        key={k}
      />
    );
    index++;
  });

  return <div className="draftboard">{teamColumns}</div>;
}

export default React.memo(DraftBoard);

const areEqual = (prevProps, nextProps) => true;
