import React, { useState, useEffect } from "react";
import "../../../App.css";
import axios from "axios";

function DraftBoard({ draft }) {
  return (
    <div className="timer">
      <p>HII</p>
      {console.log(draft.rounds)}
      {console.log(draft.teams)}
    </div>
  );
}

export default DraftBoard;
