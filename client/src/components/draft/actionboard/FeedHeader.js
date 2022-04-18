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
  boardView,
  toggleBoard,
  owner,
}) {
  let { id } = useParams();
  const user = AuthService.getCurrentUser();
  const logoOptions = {
    draft: ["1.1", "1.2", "1.4", "1.3"],
    team: ["QB", "QB", "RB", "RB"],
  };

  const BoardToggle = () => {
    let logoText = logoOptions[boardView];
    return (
      <div className="board-toggle" onClick={() => toggleBoard()}>
        <div className="board-toggle-row">
          <div className="board-toggle-pick">{logoText[0]}</div>
          <div className="board-toggle-pick">{logoText[1]}</div>
        </div>
        <div className="board-toggle-row">
          <div className="board-toggle-pick">{logoText[2]}</div>
          <div className="board-toggle-pick">{logoText[3]}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="feed-header">
      <div className="feed-header-side">
        <Timer
          round={round}
          roundLen={roundLen}
          clockStart={clockStart}
          status={status}
          owner={owner}
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
        <BoardToggle />
      </div>
    </div>
  );
}

export default React.memo(FeedHeader);
