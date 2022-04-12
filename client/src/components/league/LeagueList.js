import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LeagueCard from "./LeagueCard";
const config = require("../../../config");

class LeagueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${config.SERVER_URI}/api/leagues`)
      .then((res) => {
        this.setState({
          leagues: res.data,
        });
      })
      .catch((err) => {
        console.log("Leagues are: " + config.SERVER_URI);
      });
  }

  render() {
    const leagues = this.state.leagues;

    let leagueList;

    if (!leagues) {
      leagueList = "there is no book record!";
    } else {
      leagueList = leagues.map((league, k) => (
        <LeagueCard league={league} key={k} />
      ));
    }

    return (
      <div className="">
        <h2>Books List</h2>

        <Link to="/new-league">+ Add New Book</Link>

        <div>{leagueList}</div>
      </div>
    );
  }
}

export default LeagueList;
