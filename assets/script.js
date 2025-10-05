const startStopBtn = document.getElementById("start-stop-btn");
const resetBtn = document.getElementById("reset-btn");
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondsElement = document.getElementById("second");

let secondCounter = 0;
let minuteCounter = 0;
let hourCounter = 0;

let stopwatchStarted = false;
let setIntervalId;
startStopBtn.addEventListener("click", () => {
  if (!stopwatchStarted) {
    stopwatchStarted = true;
    startStopBtn.textContent = "STOP";

    //SET THE TIME INTERVAL
    setIntervalId = setInterval(() => {
      // INCREMENT SECONDS
      secondCounter += 1;
      updateUI(secondCounter, secondsElement);

      // FOR CONVERSION TO MINUTE
      if (secondCounter === 60) {
        secondCounter = 0;
        secondsElement.textContent = "00";
        minuteCounter += 1;
        updateUI(minuteCounter, minuteElement);
      }

      // FOR CONVERSION TO HOUR
      if (minuteCounter === 60) {
        minuteCounter = 0;
        minuteElement.textContent = "00";
        hourCounter += 1;

        // PREVENT THREE-DIGIT FIGURES
        if (hourCounter === 100) {
          clearInterval(setIntervalId);
          alert(
            "Stopwatch cannot render three-digit figures and will now be reset"
          );
          resetHandler();
          return;
        }

        updateUI(hourCounter, hourElement);
      }
    }, 1000);
  } else {
    stopTimer();
    startStopBtn.textContent = "RESUME";
  }
});
resetBtn.addEventListener("click", resetHandler);

function updateUI(time, timeElement) {
  const twoDigitTime = `0${time}`.slice(-2);
  timeElement.textContent = twoDigitTime;
}

function stopTimer() {
  stopwatchStarted = false;
  clearInterval(setIntervalId);
}

function resetHandler() {
  stopTimer();
  startStopBtn.textContent = "START";
  secondCounter = minuteCounter = hourCounter = 0;
  secondsElement.textContent = minuteElement.textContent = hour.textContent = "00";
}
