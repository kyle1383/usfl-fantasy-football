import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CreateLeague.css";
import axios from "axios";
import AuthService from "../../services/auth.service";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

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

  const SizeSelect = () => {
    let options = [];
    for (let i = 2; i <= 32; i += 2) {
      options.push(
        <div
          className={`size-option ${i == size ? "selected" : ""}`}
          key={i}
          onClick={() => setSize(i)}
        >
          {i}
        </div>
      );
    }
    return <div className="size-select">{options}</div>;
  };

  return (
    <div className="create-league">
      <h1 className="">{name || "New League"}</h1>

      <form noValidate onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="League Name"
            name="name"
            className="setting"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            League Size
            <SizeSelect />
          </label>
        </div>

        <input type="submit" className="btn btn-accent-5" />
      </form>
    </div>
  );
}

export default CreateLeague;
