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

import PlayerHeading from "./PlayerHeading";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "../../../styles/ActionBoard.css";

function PlayerFeed({
  players,
  draftPlayer,
  enabled,
  setSortBy,
  setPlayerDialog,
}) {
  const playerFeed = players.map((player, k) => (
    <PlayerHeading
      player={player}
      key={k}
      enabled={enabled}
      draftPlayer={draftPlayer}
      setSortBy={setSortBy}
      setPlayerDialog={setPlayerDialog}
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
      <div>{playerFeed}</div>
    </div>
    /*</SwipeableDrawer>*/
  );
}

export default PlayerFeed;
