import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Leagues.css";
import LeagueList from "../../components/league/LeagueList";
import AuthService from "../../services/auth.service";

function Dashboard() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      navigate("/login");
    }
    setUser(AuthService.getCurrentUser);
  }, []);

  return (
    <div>
      <h4>
        <LeagueList />
      </h4>
    </div>
  );
}

export default Dashboard;
