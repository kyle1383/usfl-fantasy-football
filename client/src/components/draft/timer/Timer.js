import React, { useState, useEffect } from "react";
import "../../../App.css";
import axios from "axios";
/**
 *
 * Timer
 *
 *
 */

function Timer({ round, roundLen, setAutoDraft }) {
  const [seconds, setSeconds] = useState();

  function endRound() {
    console.log("round over");
    setAutoDraft(true);
  }
  useEffect(() => {
    if (typeof seconds === "undefined") {
      setSeconds(roundLen);
    } else {
      let interval;
      if (seconds > 115) {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000);
      } else {
        clearInterval(interval);
        endRound();
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
