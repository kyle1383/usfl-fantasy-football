import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Leagues.css";
import LeagueHeader from "./LeagueHeader";
import Standings from "./Standings";
import AuthService from "../../services/auth.service";
import e from "cors";
import { FiSettings, FiGrid, FiList } from "react-icons/fi";

function Dashboard() {
  const user = AuthService.getCurrentUser();
  const [selectedLeague, _setSelectedLeague] = useState();
  const [leagues, setLeagues] = useState([]);
  const [standings, setStandings] = useState();
  const [status, setStatus] = useState();

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
    console.log("hi");
  }

  /**
   * Sub Componenets
   */

  const DraftPanel = () => {
    return (
      <div className="draft-section-header">
        <div className="draft-row">
          <p className="draft-title">Draft</p>
          <FiSettings
            size="1.5em"
            className="draft-settings"
            onClick={() => console.log("click")}
          />
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
    return (
      <div className="panel league-section">
        <div className="league-row">
          <div
            className="league-title-section"
            onClick={() => openLeagueSelector()}
          >
            <FiList size="1.5em" className="list-icon" />
            <p className="league-title">league</p>
          </div>
          <FiSettings
            size="1.5em"
            className="draft-settings"
            onClick={() => console.log("click")}
          />
        </div>
        <div className="league-row">
          {" "}
          <h2 className="league-name">{selectedLeague?.name}</h2>
        </div>
      </div>
      /*<select
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
      >
        {leagues.map((e, key) => {
          return (
            <option key={key} value={e.value}>
              {e.name}
            </option>
          );
        })}
      </select>*/
    );
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
