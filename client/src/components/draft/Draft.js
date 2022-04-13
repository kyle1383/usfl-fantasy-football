import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AuthService from "../../services/auth.service";
import PlayerFeed from "./PlayerFeed";
import Timer from "./timer/Timer";
import DraftBoard from "../draft/draftboard/DraftBoard";
import { useParams } from "react-router-dom";

function Draft() {
  const [round, setRound] = useState(0);
  const [roundLen, setRoundLen] = useState();
  const [clockStart, setStart] = useState();
  const [time, setTime] = useState();
  const [onClock, _setOnClock] = useState();
  const [draft, setDraft] = useState([]);
  const [allowAdd, setAllowAdd] = useState([false]);
  const [autoDraft, setAutoDraft] = useState(false);
  const user = AuthService.getCurrentUser();
  const [update, setUpdate] = useState(1);
  let { id } = useParams();

  const setOnClock = (onClock) => {
    _setOnClock(onClock);
    axios
      .get("/api/teams/" + onClock)
      .then((team) => {
        setAllowAdd(team.data.owner === user.id);
      })
      .catch((err) => console.log(err));
  };

  function draftPlayer(player) {
    const data = {
      user_id: user.id,
    };

    axios
      .put("/api/drafts/" + id + "/draft/" + player._id, data)
      .then((res) => {
        console.log("res" + res);
        setRoundLen(res.data.round_len);
        setDraft(res.data);
        setRound(res.data.round);

        setStart(res.data.clock_start);
        setOnClock(res.data.on_clock);
      })
      .catch((err) => {
        console.log("Error from League");
      });
    setAutoDraft(false);
  }
  useEffect(() => {
    let interval = setInterval(() => {
      axios
        .get("/api/players/exist/")
        .then((res) => {
          if (!res.data) {
            axios.post("/api/players/refresh").then((res) => {
              console.log("updated players");
            });
          }
        })
        .catch((err) => {
          console.log("Error from ShowLeagueList");
        });
      axios
        .get("/api/drafts/" + id)
        .then((res) => {
          setRoundLen(res.data.round_len);
          setDraft(res.data);
          setRound(res.data.round);
          setOnClock(res.data.on_clock);
        })
        .catch((err) => {
          console.log("Error from League");
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [round, onClock, id]);

  return (
    <div className="draft">
      <h1>Draft is here</h1>
      {round}
      <DraftBoard draft={draft} />
      On Clock {onClock}
      <PlayerFeed
        drafted={draft.drafted}
        draftPlayer={draftPlayer}
        enabled={allowAdd}
        autodraft={autoDraft}
      />
    </div>
  );
}

export default Draft;
