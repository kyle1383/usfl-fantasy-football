import React, { useState, useEffect } from "react";
import "../../../App.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function DraftItem({ player_id, round, index }) {
  const [player, setPlayer] = useState();
  useEffect(() => {
    if (player_id) {
      axios
        .get("/api/players/" + player_id)
        .then((resp) => {
          if (typeof resp.data !== "undefined") {
            setPlayer(resp.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [player_id]);

  //sub componenets
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
              <p className="pick-number">
                {round + 1}.{index}
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
              <p className="pick-number">
                {round + 1}.{index}
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
