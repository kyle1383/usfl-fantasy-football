import React, { useEffect } from "react";

import "../../../styles/ActionBoard.css";

function PositionFilter({ position, selected, setSelect }) {
  const selectedClass = selected == position ? `selected-${position}` : "";

  return (
    <button
      className={`position-filter ${selectedClass}`}
      onClick={() => setSelect(position)}
    >
      <p>{position}</p>
    </button>
  );
}

export default PositionFilter;
