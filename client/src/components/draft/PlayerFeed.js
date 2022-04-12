/**
 * WHere you draft from
 * should pull a list of all available players
 * sortable by
 *  ADP
 *  Stats
 *  All/available/drafted
 *  Other relevant stats we have, whatever they might be
 *
 * Each player should have a plus beside their name. Clicking this should trigger a confirmation, followed by a draft request
 *      Draft request need to verify that the player is on the clock, and that they have equivalent players to the current round
 * This plus should only be shown to the onTheClock User. This is stored in a global state
 * Draft element will keep track of time and rounds. After time runs up, or after a player is drafted, it will update the global state for onTheClock
 * in doing this it will push a request to the server that will also update this in the draft object
 * The draft element will be subscribed to this filed such that it will switch whenever the DB has changed
 */
import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import PlayerHeading from "./PlayerHeading";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));
const drawerBleeding = 56;

function PlayerFeed({ drafted, draftPlayer, enabled, autodraft }) {
  let [players, setPlayers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (drafted) {
      axios
        .get("http://localhost:5000/api/players")
        .then((res) => {
          const offensive_pos = ["QB", "WR", "RB", "TE", "K", "FB"];
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

      if (autodraft) {
        draftPlayer(players[0]);
      }
    }
  }, [drafted, autodraft]);

  const playerFeed = players.map((player, k) => (
    <PlayerHeading
      player={player}
      key={k}
      enabled={enabled}
      draftPlayer={draftPlayer}
    />
  ));
  return (
    /* <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    
      <Puller className="puller" />*/
    <div className="player-feed">
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <div>{playerFeed}</div>
      </List>
    </div>
    /*</SwipeableDrawer>*/
  );
}

export default PlayerFeed;
