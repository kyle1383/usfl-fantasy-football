import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "../../styles/CreateLeague.css";
import axios from "axios";
import AuthService from "../../services/auth.service";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

function UpdateLeague() {
  let location = useLocation();
  const { league } = location.state || [];
  let { id } = useParams();
  let [name, setName] = useState(league.name);
  let [owner, setOwner] = useState("");
  let [size, setSize] = useState(league.size);
  let [scoring, setScoring] = useState("PPR");
  let [publishedDate, setPublishedDate] = useState("");
  const rosterPositions = league.settings.roster_spots;
  let [QBs, setQBs] = useState(rosterPositions.QB);
  let [RBs, setRBs] = useState(rosterPositions.RB);
  let [WRs, setWRs] = useState(rosterPositions.WR);
  let [TEs, setTEs] = useState(rosterPositions.TE);
  let [Ks, setKs] = useState(rosterPositions.K);
  let [FLEX, setFLEX] = useState(rosterPositions.FLEX);
  let [BENCH, setBENCH] = useState(rosterPositions.BENCH);

  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  //functions

  function onSubmit(e) {
    e.preventDefault();
    const newRoster = {
      QB: QBs,
      RB: RBs,
      WR: WRs,
      TE: TEs,
      K: Ks,
      FLEX: FLEX,
      BENCH: BENCH,
    };
    const data = {
      name: name,
      owner: user.id,
      size: size,
      published_date: Date.now,
      settings: {
        scoring: scoring,
        roster_spots: newRoster,
      },
    };

    axios
      .put("/api/leagues/" + id, data)
      .then((res) => {
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

  const RosterOptions = () => {
    let options = [];
    return (
      <div>
        <div className="position">
          Quarterbacks
          <div className="position-interval">
            <FiMinusCircle
              size="2rem"
              className="minus-btn"
              onClick={() => {
                setQBs(QBs - 1);
              }}
            />
            {QBs}
            <FiPlusCircle
              size="2rem"
              className="plus-btn"
              onClick={() => {
                setQBs(QBs + 1);
              }}
            />
          </div>
        </div>
        <div className="position">
          Runningbacks
          <div className="position-interval">
            <FiMinusCircle
              size="2rem"
              className="minus-btn"
              onClick={() => {
                setRBs(RBs - 1);
              }}
            />
            {RBs}
            <FiPlusCircle
              size="2rem"
              className="plus-btn"
              onClick={() => {
                setRBs(RBs + 1);
              }}
            />
          </div>
        </div>
        <div className="position">
          Wide Receivers
          <div className="position-interval">
            <FiMinusCircle
              size="2rem"
              className="minus-btn"
              onClick={() => {
                setWRs(WRs - 1);
              }}
            />
            {WRs}
            <FiPlusCircle
              size="2rem"
              className="plus-btn"
              onClick={() => {
                setWRs(WRs + 1);
              }}
            />
          </div>
        </div>
        <div className="position">
          Tight Ends
          <div className="position-interval">
            <FiMinusCircle
              size="2rem"
              className="minus-btn"
              onClick={() => {
                setTEs(TEs - 1);
              }}
            />
            {TEs}
            <FiPlusCircle
              size="2rem"
              className="plus-btn"
              onClick={() => {
                setTEs(TEs + 1);
              }}
            />
          </div>
        </div>
        <div className="position">
          Kickers
          <div className="position-interval">
            <FiMinusCircle
              size="2rem"
              className="minus-btn"
              onClick={() => {
                setKs(Ks - 1);
              }}
            />
            {Ks}
            <FiPlusCircle
              size="2rem"
              className="plus-btn"
              onClick={() => {
                setKs(Ks + 1);
              }}
            />
          </div>
        </div>
        <div className="position">
          Flex
          <div className="position-interval">
            <FiMinusCircle
              size="2rem"
              className="minus-btn"
              onClick={() => {
                setFLEX(FLEX - 1);
              }}
            />
            {FLEX}
            <FiPlusCircle
              size="2rem"
              className="plus-btn"
              onClick={() => {
                setFLEX(FLEX + 1);
              }}
            />
          </div>
        </div>
        <div className="position">
          Bench
          <div className="position-interval">
            <FiMinusCircle
              size="2rem"
              className="minus-btn"
              onClick={() => {
                setBENCH(BENCH - 1);
              }}
            />
            {BENCH}
            <FiPlusCircle
              size="2rem"
              className="plus-btn"
              onClick={() => {
                setBENCH(BENCH + 1);
              }}
            />
          </div>
        </div>
      </div>
    );
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

        <div className="form-group">
          Roster Spots
          <label>
            <RosterOptions />
          </label>
        </div>

        <input type="submit" className="btn btn-accent-5" />
      </form>
    </div>
  );
}

export default UpdateLeague;
