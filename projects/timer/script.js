let startStopButton = document.getElementById('startStopButton');
let restartButton = document.getElementById('restartButton');
let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');

let hasStarted = false;
let desiredTime = 0;

let timeoutId;

function startTimer() {
    hasStarted = true;
    document.getElementById('startStopButton').value = 'Stop';
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    updateTime();
}

function stopTimer() {
    hasStarted = false;
    document.getElementById('startStopButton').value = 'Start';
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    clearTimeout(timeoutId);
}

function updateTime() {
    displayTime();

    let now = new Date();

    if (now.getTime() >= desiredTime.getTime()) {
        restartTimer();
        document.getElementById('alertAudio').play();
        return;
    }

    timeoutId = setTimeout(updateTime, 100);
}

function displayTime() {
    const now = new Date();
    const totalMilliseconds = desiredTime.getTime() - now.getTime();

    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 99);

    const treatedSeconds = String(seconds).padStart(2, '0');
    const treatedMinutes = String(minutes).padStart(2, '0');
    const treatedHours = String(hours).padStart(2, '0');

    secondsInput.value = treatedSeconds;
    minutesInput.value = treatedMinutes;
    hoursInput.value = treatedHours;

    document.title = `${treatedHours}:${treatedMinutes}:${treatedSeconds}`;
}

function treatInput(value) {
    if (value.length > 2) {
        value = value.substring(value.length - 2);
    }
    if (Number(value) > 59) {
        value = value.substring(value.length - 1);
    }
    return value.toString().padStart(2, '0');
}

hoursInput.addEventListener('input', () => {
    // I chose to add the code manually here so the user could
    // chose to have more than 59 hours of time
    let value = hoursInput.value;

    if (value.length > 2) {
        value = value.substring(value.length - 2);
    }

    hoursInput.value = value.toString().padStart(2, '0');
});

minutesInput.addEventListener('input', () => {
    minutesInput.value = treatInput(minutesInput.value);
});

secondsInput.addEventListener('input', () => {
    secondsInput.value = treatInput(secondsInput.value);
});

startStopButton.addEventListener('click', () => {
    let hours = Number(document.getElementById('hours').value);
    let minutes = Number(document.getElementById('minutes').value);
    let seconds = Number(document.getElementById('seconds').value);

    desiredTime = new Date();

    desiredTime.setHours(desiredTime.getHours() + hours);
    desiredTime.setMinutes(desiredTime.getMinutes() + minutes);
    desiredTime.setSeconds(desiredTime.getSeconds() + seconds);

    if (hasStarted) {
        stopTimer();
    } else {
        startTimer();
    }
});

function restartTimer() {

    if (hasStarted) {
        stopTimer();
    }
    document.title = 'Timer';
    clearTimeout(timeoutId);
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

restartButton.addEventListener('click', () => {
    restartTimer();
});

