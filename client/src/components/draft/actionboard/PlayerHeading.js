import React, { useEffect } from "react";
import "../../../styles/PlayerHeading.css";

function PlayerHeading({ player, enabled, draftPlayer, autodraft }) {
  useEffect(() => {});
  function alias() {
    if (typeof player.draft !== "undefined") {
      return player.draft.team.alias;
    }
    return "NA";
  }
  function confirmDraft() {
    let confirm = window.confirm("Are you sure you want to draft this player?");
    if (confirm) {
      draftPlayer(player);
    }
  }
  function showPlayerDetails() {
    console.log(player.draft);
  }

  return (
    <div className="player-heading">
      <button
        className="add-player"
        disabled={!enabled}
        onClick={() => confirmDraft()}
      >
        Add Player
      </button>
      <button
        className="player-details-button"
        onClick={() => showPlayerDetails()}
      >
        <div className="player-title">
          <p className="heading-name">{player.name}</p>
          <p className="heading-team-pos">
            {alias() + " - " + player.position}
          </p>
        </div>
      </button>
    </div>
  );
}

export default PlayerHeading;
