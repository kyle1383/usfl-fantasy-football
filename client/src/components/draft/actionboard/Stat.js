import React, { useEffect, useState } from "react";

function Stat({ statInput, name, setSortBy, league }) {
  let [statDisplay, setStatDisplay] = useState("");

  useEffect(() => {
    if (typeof statInput === "undefined") {
      setStatDisplay("NA");
    } else if (name === "round") {
      setStatDisplay(statInput.round);
    } else if (name === "age") {
      setStatDisplay(getAge(statInput));
    } else if (name === "points") {
      setStatDisplay(Math.round(getPoints() * 100) / 100);
    }
  }, [statInput]);
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

  function getPoints() {
    let total = 0;
    let scoringModifier;
    if (league.settings.scoring === "PPR") scoringModifier = 1;
    if (league.settings.scoring === "HALFPPR") scoringModifier = 0.5;
    if (league.settings.scoring === "PPR") scoringModifier = 0;
    //rushing
    statInput.forEach((category) => {
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

  return (
    <div className="stat" onClick={() => setSortBy(name)}>
      <p className="stat-name">{name}</p>
      <p className="stat-value">{statDisplay}</p>
    </div>
  );
}

export default React.memo(Stat);
