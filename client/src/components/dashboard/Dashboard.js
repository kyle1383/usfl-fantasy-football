import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Leagues.css";
import LeagueHeader from "./LeagueHeader";
import Standings from "./Standings";
import AuthService from "../../services/auth.service";

import { FiSettings, FiGrid, FiList, FiCopy } from "react-icons/fi";

function Dashboard() {
  const user = AuthService.getCurrentUser();
  const [selectedLeague, _setSelectedLeague] = useState();
  const [leagues, setLeagues] = useState([]);
  const [standings, setStandings] = useState();
  const [status, setStatus] = useState();
  const [leagueSelectStatus, setLeagueSelectStatus] = useState("closed");

  useEffect(() => {
    axios
      .get("/api/leagues/users/" + user.id)
      .then((response) => {
        setLeagues(response.data);
        setSelectedLeague(response.data[0]);
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          console.log("Error: Network Error");
        } else {
          console.log(error.response.data.message);
        }
      });
  }, []);
  /**
   * FUNCTIONS
   */

  function setSelectedLeague(league) {
    _setSelectedLeague(league);
    setLeagueSelectStatus("closed");

    axios
      .get("/api/leagues/standings/" + league._id)
      .then((response) => {
        setStatus(response.data.status);
        setStandings(response.data);

        //setLeagues(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openLeagueSelector() {
    setLeagueSelectStatus("open");
  }

  function copyInviteLink() {
    let copyText = `${window.location.origin}/leagues/${selectedLeague._id}/invite`;
    navigator.clipboard.writeText(copyText).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  /**
   * Sub Componenets
   */

  const DraftPanel = () => {
    return (
      <div className="draft-section-header">
        <div className="draft-row">
          <p className="draft-title">Draft</p>
          <Link
            to={`/draft-settings/${selectedLeague?.drafts[0]}`}
            state={{ teams: standings?.teams }}
          >
            <FiSettings
              size="1.5rem"
              className="draft-settings"
              onClick={() => console.log("click")}
            />
          </Link>
        </div>
        <div className="draft-row">
          <nav className="btn-primary btn draft-btn">
            <Link to={`/draft/${selectedLeague?.drafts[0]}`}>Draft Board</Link>{" "}
            <FiGrid />
          </nav>
          <nav className="btn-accent-2 btn mock-btn">
            <Link to={`/draft/${selectedLeague?.drafts[0]}`}>Mock</Link>{" "}
          </nav>
        </div>
      </div>
    );
  };
  const LeagueSelect = () => {
    if (leagueSelectStatus == "closed") {
      return (
        <div className="panel league-section">
          <div className="league-row">
            <div
              className="league-title-section"
              onClick={() => openLeagueSelector()}
            >
              <FiList size="1.5em" className="list-icon" />
              <p className="league-title">{selectedLeague?.name}</p>
            </div>
            <Link
              to={`/league-settings/${selectedLeague?.drafts[0]}`}
              state={{ league: selectedLeague }}
            >
              <FiSettings
                size="1.5rem"
                className="league-settings"
                onClick={() => console.log("click")}
              />
            </Link>
          </div>
          <button className="btn btn-accent-5" onClick={() => copyInviteLink()}>
            Invite Link <FiCopy className="copy-icon" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="panel league-select-section">
          <ul>
            {leagues.map((e, key) => {
              return (
                <li
                  className="league-select-title"
                  key={key}
                  value={e.value}
                  onClick={() => setSelectedLeague(e)}
                >
                  {e.name}
                </li>
              );
            })}
            <li className=" ">
              <Link to="/new-league">Create A League</Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="dashboard">
      <LeagueSelect />

      <div>
        <LeagueHeader leagues={leagues} setSelectedLeague={setSelectedLeague} />
      </div>
      <div className="panel draft-section">
        <DraftPanel />

        <Standings standings={standings} status={status} />
      </div>
    </div>
  );
}

export default React.memo(Dashboard);
