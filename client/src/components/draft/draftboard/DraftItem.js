import React, { useState, useEffect } from "react";
import "../../../App.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function DraftItem({ player, round, index, boardView, draftSlot }) {
  //sub componenets
  const PickInfo = () => {
    if (boardView == "draft") {
      return round + 1 + "." + index;
    } else {
      return draftSlot;
    }
  };
  const Selection = () => {
    if (player) {
      return (
        <div
          className={`selection ${player.position} `}
          style={{
            backgroundColor: `var(--${player.position}-color)`,
          }}
        >
          <div className="selection-content">
            <div className="information">
              <p className="pos-team">
                {player.position}-{player.team}
              </p>
              <p className="pick-info">
                <PickInfo />
              </p>
            </div>
            <div className="pick-firstname">{player.first_name}</div>
            <div className="pick-lastname">{player.last_name}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="selection"
          style={{
            backgroundColor: "lightgray",
          }}
        >
          <div className="selection-content">
            <div className="information unpicked">
              <p className="pick-info">
                <PickInfo />
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return <Selection />;
}

export default React.memo(DraftItem);
