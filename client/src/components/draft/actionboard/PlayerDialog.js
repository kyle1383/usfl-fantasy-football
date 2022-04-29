import React, { useEffect, useState } from "react";
import "../../../styles/PlayerDialog.css";
import { FiX } from "react-icons/fi";

function PlayerDialog({ player, setPlayerDialog, league }) {
  useEffect(() => {}, []);
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

  if (player) {
    let draft = "Draft not available";
    if (player.draft) {
      draft = player.draft.round;
    }

    //functions
    function getPoints(statsCategories) {
      let total = 0;
      let scoringModifier;
      if (league.settings.scoring === "PPR") scoringModifier = 1;
      if (league.settings.scoring === "HALFPPR") scoringModifier = 0.5;
      if (league.settings.scoring === "PPR") scoringModifier = 0;
      //rushing
      statsCategories.forEach((category) => {
        if (category.name === "rushing") {
          total += category.stats.yards / 10;
          total += category.stats.touchdowns * 6;
        } else if (category.name === "receiving") {
          total += category.stats.receptions * scoringModifier;
          total += category.stats.yards / 10;
          total += category.stats.touchdowns * 6;
        } else if (category.name === "passing") {
          total += category.stats.yards / 25;
          total += category.stats.touchdowns * 6;
        }
      });
      return total;
    }

    const StatsTable = ({ stats, name }) => {
      let rows = [];
      for (const stat in stats) {
        const formattedStat = stat.replace(/_/g, " ");
        rows.push(
          <tr key={stat}>
            <td>
              {formattedStat.charAt(0).toUpperCase() + formattedStat.slice(1)}
            </td>
            <td>{Math.round(stats[stat] * 100) / 100}</td>
          </tr>
        );
      }
      return (
        <div>
          <h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
          <table>
            <tbody>{rows}</tbody>
          </table>
        </div>
      );
    };

    const StatsTables = () => {
      const statsTables = [];
      player.stats_categories.forEach((category) => {
        statsTables.push(
          <StatsTable
            stats={category.stats}
            name={category.name}
            key={category.name}
          />
        );
      });
      return statsTables;
    };

    //content
    return (
      <div className="player-dialog">
        <div className="player-details">
          <p>Player Details</p>
          <FiX size="2rem" onClick={() => setPlayerDialog()} />
        </div>
        <div className="player-dialog-header panel">
          <div className="dialog-header-row">
            <div>
              <p className="player-name">{`${player.name} #${player.jersey}`}</p>
              <p className="player-pos">{`${player.position}-${player.team}`}</p>
            </div>
            <div className="points-box">
              <p className="points-label">points</p>
              <p className="points">{getPoints(player.stats_categories)}</p>
            </div>
          </div>
          <div className="dialog-header-row">
            <div>
              <p className="player-data">{`Age: ${getAge(
                player.birth_date
              )} | ${Math.floor(player.height / 12)}'${player.height % 12}" ${
                player.weight
              }lb`}</p>
            </div>
          </div>
        </div>

        <div className="general-stats">
          <div className="general-stats-row">
            <p>College</p>
            <p>{player.college}</p>
          </div>
          <div className="general-stats-row">
            <p>Draft Round</p>
            <p>{draft}</p>
          </div>
        </div>

        <StatsTables />
      </div>
    );
  } else {
    return null;
  }
}

export default React.memo(PlayerDialog);
