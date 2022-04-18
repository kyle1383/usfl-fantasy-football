import React from "react";
import "../../../styles/PlayerDialog.css";

function PlayerDialog({ player }) {
  if (player) {
    return (
      <div className="player-dialog">
        <p className="player-name">{player}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default PlayerDialog;
