import React, { useState } from "react";
import PositionFilter from "./PositionFilter";
import Timer from "../timer/Timer";
import "../../../styles/ActionBoard.css";
import axios from "axios";
import AuthService from "../../../services/auth.service";
import { useParams } from "react-router-dom";

function FeedHeader({
  select,
  setSelect,
  round,
  roundLen,
  clockStart,
  status,
  owner,
}) {
  let { id } = useParams();
  const user = AuthService.getCurrentUser();
  function start() {
    axios
      .post("/api/drafts/start/" + id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  const StartButton = () => {
    if (owner == user.id) {
      return (
        <button className="start-draft" onClick={() => start()}>
          Start
        </button>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="feed-header">
      <div className="feed-header-side">
        <Timer
          round={round}
          roundLen={roundLen}
          clockStart={clockStart}
          status={status}
        />
      </div>

      <div className="position-filters">
        <PositionFilter
          position="All"
          selected={select}
          setSelect={setSelect}
        />
        <PositionFilter position="RB" selected={select} setSelect={setSelect} />
        <PositionFilter position="WR" selected={select} setSelect={setSelect} />
        <PositionFilter position="QB" selected={select} setSelect={setSelect} />
        <PositionFilter position="TE" selected={select} setSelect={setSelect} />
        <PositionFilter position="K" selected={select} setSelect={setSelect} />
      </div>
      <div className="feed-header-side">
        {" "}
        <StartButton />
      </div>
    </div>
  );
}

export default FeedHeader;
