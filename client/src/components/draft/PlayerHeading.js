import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function PlayerHeading({ player, enabled, draftPlayer, autodraft }) {
  useEffect(() => {});
  function alias() {
    //console.log(player.name + player.draft.team.alias);

    if (typeof player.draft !== "undefined") {
      return player.draft.team.alias;
    }
    return "NA";
  }
  function confirmDraft() {
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      draftPlayer(player);
    }
  }
  function showPlayerDetails() {
    console.log(player.draft);
  }

  return (
    <ListItem className="player-heading">
      <Button
        disabled={!enabled}
        variant="contained"
        type="button"
        onClick={() => confirmDraft()}
      >
        Add Player
      </Button>
      <ListItemButton onClick={() => showPlayerDetails()}>
        <ListItemText
          primary={player.name}
          secondary={alias() + " - " + player.position}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default PlayerHeading;
