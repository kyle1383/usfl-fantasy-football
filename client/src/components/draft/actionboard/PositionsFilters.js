import React, { useState } from "react";
import PositionFilter from "./PositionFilter";
import "../../../styles/ActionBoard.css";

function PositionFilters({ select, setSelect }) {
  return (
    <div className="position-filters">
      <PositionFilter position="All" selected={select} setSelect={setSelect} />
      <PositionFilter position="RB" selected={select} setSelect={setSelect} />
      <PositionFilter position="WR" selected={select} setSelect={setSelect} />
      <PositionFilter position="QB" selected={select} setSelect={setSelect} />
      <PositionFilter position="TE" selected={select} setSelect={setSelect} />
      <PositionFilter position="K" selected={select} setSelect={setSelect} />
    </div>
  );
}

export default PositionFilters;
