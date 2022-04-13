import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import AuthService from "../../services/auth.service";

function CreateLeague() {
  let [name, setName] = useState("");
  let [owner, setOwner] = useState("");
  let [size, setSize] = useState(8);
  let [publishedDate, setPublishedDate] = useState("");
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  //functions

  function onSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      owner: user.id,
      size: size,
      published_date: Date.now,
    };

    axios
      .post("/api/leagues/", data)
      .then((res) => {
        setName("");
        setOwner(user.id);
        setSize(8);
        setPublishedDate(Date.now);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("Error in CreateLeague!");
      });
  }

  return (
    <div className="CreateLeague">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Leagues
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add League</h1>
            <p className="lead text-center">Create new league</p>

            <form noValidate onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="League Name"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>
                  Team Size
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                  </select>
                </label>
              </div>
              <br />

              <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLeague;
