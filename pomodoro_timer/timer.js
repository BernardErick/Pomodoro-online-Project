const pomodoroTimer = document.querySelector('#pomodoro-timer');

const startButton = document.querySelector('#pomodoro-start');
const stopButton = document.querySelector('#pomodoro-stop');

// INICIAR
startButton.addEventListener('click', () => {
    toggleClock();
    if(btn == 1){
        startButton.innerText = 'Start';
        btn *= -1;
    } 
    else{
        startButton.innerText = 'Pause';
        btn *= -1;
    } 
})

// REINICIAR
stopButton.addEventListener('click', () => {
    toggleClock(true);
})


let btn = -1;
let type = 'Work';
let isClockRunning = false;
// 25 mins
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

// 5 mins;
let breakSessionDuration = 300;


const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);
    // adicionando zeros à esquerda se for menor que 10
    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString();
}
const stopClock = () => {
    startButton.innerText = 'Start';
    btn *= -1;
    clearInterval(clockTimer)
    isClockRunning = false
    currentTimeLeftInSession = workSessionDuration
    displayCurrentTimeLeftInSession()
}
const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
      currentTimeLeftInSession--;
    } else if (currentTimeLeftInSession === 0) {
      stopClock();
      if (type === 'Work') {
        currentTimeLeftInSession = breakSessionDuration;
        type = 'Break';
      }else{
        currentTimeLeftInSession = workSessionDuration;
        type = 'Work';
      }
    }
    displayCurrentTimeLeftInSession()
  }
const toggleClock = (reset) => {
    if (reset) {
        //para o timer
        stopClock();
    } else {
        if (isClockRunning === true) {
            // pausa o timer
            clearInterval(clockTimer);
            isClockRunning = false;
        } else {
            // inicia o timer
            isClockRunning = true;
            clockTimer = setInterval(() => {
                stepDown();
            }, 1000)
        }
    }
}