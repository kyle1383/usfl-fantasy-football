import React, { useState, useEffect } from "react";
import PlayerFeed from "./PlayerFeed";
import "../../../styles/ActionBoard.css";

import axios from "axios";

import FeedHeader from "./FeedHeader";

function ActionBoard({
  drafted,
  draftPlayer,
  allowAdd,
  setPlayerDialog,
  round,
  roundLen,
  clockStart,
  status,
  owner,
}) {
  const [position, setPosition] = useState("All");
  const [players, setPlayers] = useState([]);
  const [sortBy, _setSortBy] = useState("none");
  const offensive_pos = ["QB", "WR", "RB", "TE", "K", "FB"];
  const [toggle, setToggle] = useState(1);

  function setSortBy(sortProperty) {
    if (sortProperty == sortBy) {
      setToggle(toggle * -1);
    }
    _setSortBy(sortProperty);
  }
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

  const filteredPlayers = () => {
    let newPlayers = players;
    if (sortBy == "round") {
      newPlayers = sortByDraft(newPlayers);
    } else if (sortBy == "age") {
      newPlayers = sortByAge(newPlayers);
    }
    newPlayers = filterPosition(newPlayers);
    return newPlayers;
  };

  const filterPosition = (playersObject) => {
    if (position == "All") return playersObject;
    let filteredPlayers = playersObject.filter(function (player) {
      return player.position == position;
    });
    return filteredPlayers;
  };
  const sortByDraft = (playersObject) => {
    let newPlayers = playersObject;

    newPlayers.sort(function (a, b) {
      let roundA = 0;
      let roundB = 0;
      if (typeof a.draft === "undefined") {
        roundA = 100 * toggle;
      } else {
        roundA = a.draft.round;
      }
      if (typeof b.draft === "undefined") {
        roundB = 100 * toggle;
      } else {
        roundB = b.draft.round;
      }
      if (roundA < roundB) return -1 * toggle;
      if (roundA > roundB) return 1 * toggle;
      return 0;
    });

    return newPlayers;
  };

  const sortByAge = (playersObject) => {
    let newPlayers = playersObject;
    newPlayers.sort(function (a, b) {
      let ageA = 0;
      let ageB = 0;
      if (typeof a.birth_date === "undefined") {
        ageA = -100 * toggle;
      } else {
        ageA = getAge(a.birth_date);
      }
      if (typeof b.birth_date === "undefined") {
        ageB = -100 * toggle;
      } else {
        ageB = getAge(b.birth_date);
      }
      if (ageA < ageB) return 1 * toggle;
      if (ageA > ageB) return -1 * toggle;
      //return 0;
    });

    return newPlayers;
  };

  //helper functions
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return (
    <div className="actionboard">
      <FeedHeader
        select={position}
        setSelect={setPosition}
        round={round}
        roundLen={roundLen}
        clockStart={clockStart}
        status={status}
        owner={owner}
      />
      <PlayerFeed
        players={filteredPlayers()}
        draftPlayer={draftPlayer}
        enabled={allowAdd}
        setSortBy={setSortBy}
        setPlayerDialog={setPlayerDialog}
      />
    </div>
  );
}

export default React.memo(ActionBoard);
