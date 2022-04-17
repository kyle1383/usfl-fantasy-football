function Timer() {
  let currentTime;
  let roundLen;
  let timer;
  let pause = false;
  return {
    init: function (time) {
      currentTime = time;
      roundLen = time;
    },
    getTime: function () {
      return currentTime;
    },
    start: function () {
      timer = setInterval(() => {
        if (!pause) {
          currentTime -= 1;
        }
        if (currentTime < 115) {
          this.stop();
        }
      }, 1000);
    },
    stop: function () {
      clearInterval(timer);
      console.log("stop");
    },
    togglePause: function () {
      pause = !pause;
    },
  };
}

module.exports = Timer;
