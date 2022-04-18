import React, { useEffect, useState } from "react";
import axios from "axios";
import DraftItem from "./DraftItem";
import "../../../styles/DraftBoard.css";

function TeamColumn({
  team,
  index,
  player_ids,
  rounds,
  boardView,
  rosterSpots,
}) {
  let [players, _setPlayers] = useState([]);

  const setPlayers = (tempPlayers) => {
    if (tempPlayers.length != players.length) {
      console.log("settings");
      _setPlayers(tempPlayers);
    }
  };

  useEffect(() => {
    let promises = [];
    let tempPlayers = [];
    player_ids.map((player_id) => {
      promises.push(
        axios.get("/api/players/" + player_id).then((resp) => {
          if (typeof resp.data !== "undefined") {
            tempPlayers.push(resp.data);
          }
        })
      );
    });
    Promise.allSettled(promises).then((results) => {
      results.forEach((result) => {
        setPlayers(tempPlayers);
      });
    });
  }, [player_ids]);

  const getDraftItem = (player, i, draftSlot) => {
    return (
      <DraftItem
        player={player}
        round={i}
        index={index}
        boardView={boardView}
        draftSlot={draftSlot}
        key={i}
      />
    );
  };
  const generateDraftItems = (picks) => {
    let DraftItems = [];
    for (let i = 0; i < rounds; i++) {
      DraftItems.push(
        <DraftItem
          player={picks[i]}
          round={i}
          index={index}
          boardView={boardView}
          key={i}
        />
      );
    }
    return DraftItems;
  };

  const TeamView = () => {
    if (boardView == "draft") {
      let DraftItems = generateDraftItems(players);
      return DraftItems;
    } else {
      let DraftItems = [];
      let flex = [];
      let bench = [];
      let index = 0;
      for (const position in rosterSpots) {
        //get all players in a position
        if (position !== "FLEX" && position !== "BENCH") {
          const posPlayers = players.filter((player) => {
            return player.position === position;
          });

          for (let i = 0; i < rosterSpots[position]; i++) {
            const pickedPlayer = posPlayers.shift();
            const DraftItem = getDraftItem(
              pickedPlayer,
              index,
              position + (i + 1)
            );
            DraftItems.push(DraftItem);
            index++;
          }
          while (posPlayers.length > 0) {
            const pickedPlayer = posPlayers.shift();
            if (flex.length < rosterSpots["FLEX"]) {
              flex.push(pickedPlayer);
            } else {
              bench.push(pickedPlayer);
            }
          }
        }
      }
      for (let i = 0; i < rosterSpots["FLEX"]; i++) {
        const DraftItem = getDraftItem(flex[i], index, "Flex");
        DraftItems.push(DraftItem);
        index++;
      }

      for (let i = 0; i < rosterSpots["BENCH"]; i++) {
        const DraftItem = getDraftItem(bench[i], index, "Bench");
        DraftItems.push(DraftItem);
        index++;
      }
      return DraftItems;
    }
  };

  return (
    <div className="team-column">
      <div className="team-name">{team.name}</div>
      <TeamView />
    </div>
  );
}

export default React.memo(TeamColumn);
