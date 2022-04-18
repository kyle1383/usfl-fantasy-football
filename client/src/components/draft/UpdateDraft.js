import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

/**
 *
 * So this form needs to get the basic draft info. Things like roster size round length etc
 * It also needs to allow you to set order. To do this it will have a more complex form element
 * this element needs to pull in the teams in your league and allow you to sort them
 */
function UpdateDraft() {
  //state
  let [rosterSize, setRosterSize] = useState(13);
  let [roundLength, setRoundLength] = useState(120);
  let [order, setOrder] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  //let [usernames, setUserNames] = useState([]);
  //Life Cycle Functions
  useEffect(() => {
    axios
      .get("/api/drafts/" + id)
      .then((res) => {
        console.log(res.data);
        setOrder(res.data.teams);
        setRosterSize(res.data.rounds);
        setRoundLength(res.data.round_len);
      })
      .catch((err) => {
        console.log("Error from Draft");
      });
  }, [id]);
  //custom Functions
  function handleSubmit(e) {
    const data = {
      rounds: rosterSize,
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
    return (
      <div className="card">
        {user}
        <button onClick={(e) => arrayMove(e, user, -1)}>up</button>
        <button onClick={(e) => arrayMove(e, user, 1)}>down</button>
      </div>
    );
  };

  const orderedUsers = order.map((user, k) => <Card key={k} user={user} />);

  return (
    <div className="player-heading">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>Roster Size</label>
        <div className="form-group">
          <input
            type="number"
            max="50"
            placeholder="Roster Size"
            name="roster_size"
            value={rosterSize}
            onChange={(e) => setRosterSize(e.target.value)}
          />
        </div>
        <label>Round Length[seconds]</label>
        <div className="form-group">
          <input
            type="number"
            max="600"
            placeholder="Round Length"
            name="round_len"
            value={roundLength}
            onChange={(e) => setRoundLength(e.target.value)}
          />
        </div>
        <label>Draft Order</label>
        <button onClick={(e) => randomizeOrder(e)}>Randomize</button>
        {orderedUsers}
        <input type="submit" />
      </form>
    </div>
  );
}

export default UpdateDraft;
