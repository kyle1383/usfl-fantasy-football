import React, { useEffect } from "react";
import Stat from "./Stat";
import "../../../styles/PlayerHeading.css";

function PlayerHeading({
  player,
  enabled,
  draftPlayer,
  setSortBy,
  setPlayerDialog,
}) {
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
    setPlayerDialog(player);
  }

  return (
    <div className="player-heading">
      <button
        className="btn-1"
        disabled={!enabled}
        onClick={() => draftPlayer(player)}
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
      <Stat statInput={player.draft} name="round" setSortBy={setSortBy} />
      <Stat statInput={player.birth_date} name="age" setSortBy={setSortBy} />
    </div>
  );
}

export default PlayerHeading;
