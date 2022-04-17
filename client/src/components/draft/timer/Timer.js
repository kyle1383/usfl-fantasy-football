import React, { useState, useEffect } from "react";
import "../../../styles/Timer.css";
import axios from "axios";
/**
 *
 * Timer
 *
 *
 */

function Timer({ round, roundLen }) {
  const [seconds, setSeconds] = useState();
  useEffect(() => {
    if (typeof seconds === "undefined") {
      setSeconds(roundLen);
    } else {
      let interval;
      if (seconds > 0) {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [roundLen, round, seconds]);

  const TimeDisplay = ({ seconds }) => {
    return <div className="time-display">{seconds}</div>;
  };

  return (
    <div className="timer">
      <TimeDisplay seconds={seconds} />
    </div>
  );
}

export default Timer;
