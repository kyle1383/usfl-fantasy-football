import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../styles/Draft.css";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";

/**
 *
 * So this form needs to get the basic draft info. Things like roster size round length etc
 * It also needs to allow you to set order. To do this it will have a more complex form element
 * this element needs to pull in the teams in your league and allow you to sort them
 */
function UpdateDraft() {
  //state
  let [roundLength, setRoundLength] = useState(120);
  let [order, setOrder] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  const { teams } = location.state || [];

  //Life Cycle Functions

  useEffect(() => {
    let team_obj = [];
    console.log(teams);
    team_obj.push(teams[0].team.name);
    team_obj.push(teams[1].team.name);

    axios
      .get("/api/drafts/" + id)
      .then((res) => {
        setOrder(res.data.teams);
        setRoundLength(res.data.round_len);
      })
      .catch((err) => {
        console.log("Error from Draft");
      });
  }, [id]);
  //custom Functions
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      round_len: roundLength,
      teams: order,
      on_clock: order[0],
    };
    axios
      .put("/api/drafts/" + id, data)
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("Error updating draft!");
      });
  }
  function arrayMove(e, user, increment) {
    e.preventDefault();
    const index = order.indexOf(user);

    if (!(index + increment > order.length - 1) && !(index + increment < 0)) {
      let orderCopy = [...order];
      let temp = orderCopy[index];
      orderCopy[index] = orderCopy[index + increment];
      orderCopy[index + increment] = temp;

      setOrder(orderCopy);
    }
  }
  function randomizeOrder(e) {
    e.preventDefault();
    let orderCopy = [...order];
    for (var i = orderCopy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = orderCopy[i];
      orderCopy[i] = orderCopy[j];
      orderCopy[j] = temp;
    }
    setOrder(orderCopy);
  }

  //sub components
  const Card = ({ user }) => {
    const userObj = teams.filter((team) => {
      return team.team._id === user;
    });
    const username = userObj[0].team.name;
    return (
      <div className="card">
        <p className="name">{username}</p>
        <FiArrowUpCircle
          size="1.5rem"
          onClick={(e) => arrayMove(e, user, -1)}
        />{" "}
        <FiArrowDownCircle
          size="1.5rem"
          onClick={(e) => arrayMove(e, user, 1)}
        />
      </div>
    );
  };

  const orderedUsers = order.map((user, k) => <Card key={k} user={user} />);

  return (
    <div className="draft-settings-form">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>Round Length[seconds]</label>
        <div className="form-group">
          <input
            type="number"
            max="600"
            placeholder="Round Length"
            name="round_len"
            value={roundLength}
            className="setting"
            onChange={(e) => setRoundLength(e.target.value)}
          />
        </div>
        <div className="order-settings">
          <label>Draft Order</label>
          <button onClick={(e) => randomizeOrder(e)}>Randomize</button>
          {orderedUsers}
        </div>
        <input type="submit" className="btn-accent-2 btn" />
      </form>
    </div>
  );
}

export default UpdateDraft;
