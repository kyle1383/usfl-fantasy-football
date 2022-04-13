import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import axios from "axios";

function League() {
  //state
  let { id } = useParams();
  const [league, setLeague] = useState([]);

  //functions

  useEffect(() => {
    console.log(id);
    axios
      .get("/api/leagues/" + id)
      .then((res) => {
        // console.log("Print-showBookDetails-API-response: " + res.data);

        setLeague(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //sub components
  let LeagueItem = (
    <div>
      <table>
        <tbody>
          <tr>
            <th scope="row">2</th>
            <td>owner</td>
            <td>{league.owner}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{league.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="">
      <Link to="/">Show League List</Link>

      <h1>{league.name}</h1>

      <div>{LeagueItem}</div>

      <p>Invite Link: {window.location.href}/invite</p>

      <Link to={`/draft-settings/${league.drafts}`}>Draft Settings</Link>
      <Link to={`/draft/${league.drafts}`}>Draft</Link>
    </div>
  );
}

export default League;
