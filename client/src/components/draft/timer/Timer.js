import React, { useState, useEffect } from "react";
import "../../../styles/Timer.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthService from "../../../services/auth.service";
/**
 *
 * Timer
 *
 *
 */

function Timer({ round, roundLen, clockStart, status, owner }) {
  let timePassed = 0;
  const user = AuthService.getCurrentUser();
  const [seconds, setSeconds] = useState(9);
  let { id } = useParams();

  useEffect(() => {
    if (!seconds) setSeconds(roundLen);
    let interval = null;
    if (status == "ACTIVE") {
      interval = setInterval(() => {
        let start = Date.parse(clockStart);
        const currentTime = new Date().getTime();
        timePassed = (currentTime - start) / 1000;
        setSeconds(roundLen - timePassed);
      });
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, clockStart]);

  const secondsToMinutes = (secondTotal) => {
    let time = "--:--";
    if (secondTotal && secondTotal > 0) {
      let minutes = Math.floor(secondTotal / 60);
      let remSeconds = Math.round(secondTotal % 60);
      if (remSeconds / 60 == 1) {
        remSeconds = 0;
        minutes++;
      }

      if (remSeconds < 10) {
        remSeconds = "0" + remSeconds;
      }

      time = minutes + ":" + remSeconds;
    } else if (secondTotal) {
      time = "0:00";
    }

    return time;
  };
  const StartButton = () => {
    if (owner == user.id) {
      return (
        <button className="start-draft" onClick={() => start()}>
          Start
        </button>
      );
    } else {
      return null;
    }
  };
  const TimeDisplay = () => {
    if (status == "ACTIVE") {
      return <div className="time-display">{secondsToMinutes(seconds)}</div>;
    } else if (status == "PENDING") {
      return <StartButton />;
    } else {
      return null;
    }
  };

  function start() {
    axios
      .post("/api/drafts/start/" + id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="timer">
      <TimeDisplay />
    </div>
  );
}

export default React.memo(Timer);
/*



*/
