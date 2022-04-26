import React, { useState, useEffect } from "react";
import "../../App.css";

function LeagueHeader({ leagues, setSelectedLeague }) {
  const LeagueLinks = () => {
    if (leagues) {
      /* let leagueLinks = leagues.map((league, key) => {
        return (
          <div key={key} onClick={() => setSelectedLeague(league)}>
            {league.name}
          </div>
        );
      });
      return leagueLinks;*/
    }
    return null;
  };
  return (
    <div className="">
      <LeagueLinks />
    </div>
  );
}

export default LeagueHeader;
