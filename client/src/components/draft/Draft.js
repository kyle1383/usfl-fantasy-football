import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PlayerFeed from "./PlayerFeed";
import Timer from "./timer/Timer";
import DraftBoard from "../draft/draftboard/DraftBoard";
import { useParams } from "react-router-dom";

function Draft(props) {
  const [round, setRound] = useState(0);
  const [roundLen, setRoundLen] = useState();
  const [clockStart, setStart] = useState();
  const [onClock, _setOnClock] = useState();
  const [draft, setDraft] = useState([]);
  const [allowAdd, setAllowAdd] = useState([false]);
  const [autoDraft, setAutoDraft] = useState(false);
  let { id } = useParams();

  const setOnClock = (onClock) => {
    _setOnClock(onClock);
    axios
      .get("http://localhost:5000/api/teams/" + onClock)
      .then((team) => {
        setAllowAdd(team.data.owner === props.auth.user._id);
      })
      .catch((err) => console.log(err));
  };

  function draftPlayer(player) {
    console.log(player._id);

    const data = {
      user_id: props.auth.user.id,
    };
    axios
      .put(
        "http://localhost:5000/api/drafts/" + id + "/draft/" + player._id,
        data
      )
      .then((res) => {
        console.log(res);
        setRoundLen(res.data.round_len);
        setDraft(res.data);
        setRound(res.data.round);

        setStart(res.data.clock_start);
        setOnClock(res.data.on_clock);
      })
      .catch((err) => {
        console.log("Error from League");
      });
    setAutoDraft(false);
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/players/exist")
      .then((res) => {
        if (!res.data) {
          axios
            .post("http://localhost:5000/api/players/refresh")
            .then((res) => {
              console.log("updated players");
            });
        }
      })
      .catch((err) => {
        console.log("Error from ShowLeagueList");
      });
    axios
      .get("http://localhost:5000/api/drafts/" + id)
      .then((res) => {
        setRoundLen(res.data.round_len);
        setDraft(res.data);
        setRound(res.data.round);
        setStart(res.data.clock_start);
        setOnClock(res.data.on_clock);
      })
      .catch((err) => {
        console.log("Error from League");
      });
  }, [round, onClock, id]);

  return (
    <div className="draft">
      <h1>Draft is here</h1>
      <DraftBoard draft={draft} />

      <PlayerFeed
        drafted={draft.drafted}
        draftPlayer={draftPlayer}
        enabled={allowAdd}
        autodraft={autoDraft}
      />
    </div>
  );
}

Draft.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Draft);
