import React, { useEffect } from "react";

function Stat({ statInput, name, setSortBy }) {
  let statDisplay;
  if (typeof statInput === "undefined") {
    statDisplay = "NA";
  } else if (name == "round") {
    statDisplay = statInput.round;
  } else if (name == "age") {
    statDisplay = getAge(statInput);
  }

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="stat" onClick={() => setSortBy(name)}>
      <p className="stat-name">{name}</p>
      <p className="stat-value">{statDisplay}</p>
    </div>
  );
}

export default Stat;
