import React, { useState, useEffect } from "react";
import PlayerFeed from "./PlayerFeed";
import "../../../styles/ActionBoard.css";
import PositionFilters from "./PositionsFilters";
import axios from "axios";

function ActionBoard({ drafted, draftPlayer, allowAdd }) {
  const [select, setSelect] = useState("All");
  const [players, setPlayers] = useState([]);
  const offensive_pos = ["QB", "WR", "RB", "TE", "K", "FB"];

  useEffect(() => {
    if (drafted && players.length == 0) {
      axios
        .get("/api/players")
        .then((res) => {
          let undrafted = res.data.filter(function (player, index, arr) {
            return !drafted.includes(player._id);
          });
          let offensive = undrafted.filter(function (player, index, arr) {
            return offensive_pos.includes(player.position);
          });
          setPlayers(offensive);
        })
        .catch((err) => {
          console.log("Error from ShowLeagueList" + err);
        });
    }
  }, [drafted]);

  const filterPlayers = () => {
    if (select == "All") return players;
    let filteredPlayers = players.filter(function (player) {
      return player.position == select;
    });
    return filteredPlayers;
  };
  return (
    <div className="actionboard">
      <PositionFilters select={select} setSelect={setSelect} />
      <PlayerFeed
        players={filterPlayers()}
        draftPlayer={draftPlayer}
        enabled={allowAdd}
      />
    </div>
  );
}

export default ActionBoard;
