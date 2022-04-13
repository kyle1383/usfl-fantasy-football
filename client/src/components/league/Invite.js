import React, { Component, useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import AuthService from "../../services/auth.service";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

/**
 * INVITE COMPONENT
 * 1st checks if you are logged in. If not, requests a login.
 */
function Invite() {
  const [user, setUser] = useState([]);
  const [league, setLeague] = useState();
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        console.log(response.data);
        setUser(AuthService.getCurrentUser());
        console.log("a");
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLeague(_content);
        console.log("b");
        navigate("/login");
      }
    );
  }, []);

  //functions
  function onJoinClick(e) {
    const data = {
      user: user.id,
    };

    axios
      .put("/api/leagues/join/" + id, data)
      .then((res) => {
        setUser(user);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("Error Joining League!");
      });
  }
  //sub componenets

  let LeagueItem = (
    <div>
      {console.log(user)}
      <h2>Hi {user.username}, you have been invited to a league</h2>
      <table>
        <tbody>
          <tr>
            <th scope="row">2</th>
            <td>owner</td>
            <td>{/*league.owner*/}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{/*league.date*/}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="">
      {console.log(league)}
      <h1>{/*league.name*/}</h1>

      <div>{LeagueItem}</div>
      <button onClick={(e) => onJoinClick(e)} className="">
        Join League
      </button>
    </div>
  );
}

export default Invite;

/*
axios
      .get("/api/leagues/" + id)
      .then((res) => {
        this.setState({
          league: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from League");
      });
*/
