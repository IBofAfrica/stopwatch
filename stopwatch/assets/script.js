const startStopBtn = document.getElementById("start-stop-btn")
const resetBtn = document.getElementById("reset-btn")
const hourElement = document.getElementById("hour")
const minuteElement = document.getElementById("minute")
const secondsElement = document.getElementById("second")

let timeInSeconds = 0;
let timeInMinutes = 0;
let timeInHours = 0;


let stopwatchStarted = false;
let setIntervalId;
startStopBtn.addEventListener("click", () => {
    if (!stopwatchStarted) {
        stopwatchStarted = true;
        startStopBtn.textContent = "STOP"

        //SET THE TIME INTERVAL
        setIntervalId = setInterval(() => {
            
            // INCREMENT SECONDS
            timeInSeconds += 1;
            updateUI(timeInSeconds, secondsElement) 

            // FOR CONVERSION TO MINUTE
            if (timeInSeconds === 60) {
                timeInSeconds = 0
                secondsElement.textContent = "00"
                timeInMinutes += 1;
                updateUI(timeInMinutes, minuteElement)
            }

            // FOR CONVERSION TO HOUR
            if (timeInMinutes === 60) {
                timeInMinutes = 0
                minuteElement.textContent = "00"
                timeInHours += 1;

                // PREVENT THREE-DIGIT FIGURES
                if (timeInHours === 100) {
                    clearInterval(setIntervalId)
                    alert("Stopwatch cannot render three-digit figures and will now be reset")
                    resetHandler()
                    return
                }

                updateUI(timeInHours, hourElement)
            }
        }, 1000);
    } 
    else {
        stopTimer()
        startStopBtn.textContent = "RESUME"
    }
})
resetBtn.addEventListener("click", resetHandler)


function updateUI(time, timeElement) {
    const twoDigitTime = `0${time}`.slice(-2)
    timeElement.textContent = twoDigitTime
}

function stopTimer () {
    stopwatchStarted = false;
    clearInterval(setIntervalId)
}

function resetHandler () {
    stopTimer()
    startStopBtn.textContent = "START"
    timeInSeconds = timeInMinutes = timeInHours = 0;
    secondsElement.textContent = minuteElement.textContent = hour.textContent = "00"
}