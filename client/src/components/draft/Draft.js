import React, { useState, useEffect } from "react";
import axios from "axios";

import AuthService from "../../services/auth.service";
import PlayerFeed from "./actionboard/PlayerFeed";

import DraftBoard from "../draft/draftboard/DraftBoard";
import { useParams } from "react-router-dom";
import ActionBoard from "./actionboard/ActionBoard";
import PlayerDialog from "./actionboard/PlayerDialog";

import "../../styles/Draft.css";

function Draft() {
  const [round, setRound] = useState(0);
  const [roundLen, setRoundLen] = useState();
  const [rounds, setRounds] = useState();
  const [onClock, _setOnClock] = useState();
  const [draft, setDraft] = useState([]);
  const [clockStart, setClockStart] = useState([]);
  const [playerDialog, setPlayerDialog] = useState();
  const [teams, _setTeams] = useState([]);
  const [allowAdd, setAllowAdd] = useState([false]);
  const [status, setStatus] = useState("predraft");
  const user = AuthService.getCurrentUser();

  let { id } = useParams();

  //functions
  const setOnClock = (onClock) => {
    _setOnClock(onClock);
    axios
      .get("/api/teams/" + onClock)
      .then((team) => {
        setAllowAdd(team.data.owner === user.id);
      })
      .catch((err) => console.log(err));
  };

  const setTeams = (team_ids) => {
    let newTeams = [];

    let promises = [];

    team_ids.map((team_id) => {
      promises.push(
        axios.get("/api/teams/" + team_id).then((response) => {
          newTeams.push(response.data);
        })
      );
    });

    Promise.allSettled(promises).then((results) => {
      results.forEach((result) => console.log(/*result.status*/));

      newTeams = orderedTeams(newTeams, team_ids);

      _setTeams(newTeams);
    });
  };

  const orderedTeams = (teams, order) => {
    let orderedTeams = [];

    order.map((team_id) => {
      orderedTeams.push(teams.find((team) => team._id === team_id));
    });
    return orderedTeams;
  };

  function draftPlayer(player) {
    const data = {
      user_id: user.id,
    };

    axios
      .put("/api/drafts/" + id + "/draft/" + player._id, data)
      .then((res) => {
        setRoundLen(res.data.round_len);
        setOnClock(res.data.on_clock);
        setDraft(res.data);
        setTeams(res.data.teams);
        setStatus(res.data.status);
        setClockStart(res.data.clock_start);
        setRound(res.data.round);
        setRounds(res.data.rounds);
      })
      .catch((err) => {
        console.log("Error from League");
      });
  }

  useEffect(() => {
    let interval = setInterval(() => {
      axios
        .get("/api/drafts/" + id)
        .then((res) => {
          setRound(res.data.round);
          setOnClock(res.data.on_clock);
          setDraft(res.data);
          setStatus(res.data.status);
          setClockStart(res.data.clock_start);
          setRounds(res.data.rounds);
          setRoundLen(res.data.round_len);

          setTeams(res.data.teams);
        })
        .catch((err) => {
          console.log("Error from League");
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [round, onClock, id]);

  //memoization

  return (
    <div className="draft">
      <DraftBoard teams={teams} rounds={rounds} />

      <ActionBoard
        drafted={draft.drafted}
        draftPlayer={draftPlayer}
        allowAdd={allowAdd}
        setPlayerDialog={setPlayerDialog}
        round={round}
        roundLen={roundLen}
        clockStart={clockStart}
        status={status}
        owner={draft.owner}
      />
      <PlayerDialog player={playerDialog} />
    </div>
  );
}

export default Draft;
