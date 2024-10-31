document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('modeButton').addEventListener('click', toggleMode);

let studyTime, breakTime;
let timerInterval;
let isStudyTime = true;
let isPaused = false;
let timeRemaining;

const endSound = document.getElementById('endSound');

function startTimer() {
  const studyHours = document.getElementById('studyTimeHours').value;
  const studyMinutes = document.getElementById('studyTimeMinutes').value;
  const studySeconds = document.getElementById('studyTimeSeconds').value;

  const breakHours = document.getElementById('breakTimeHours').value;
  const breakMinutes = document.getElementById('breakTimeMinutes').value;
  const breakSeconds = document.getElementById('breakTimeSeconds').value;

  if (!validateInput(studyHours, studyMinutes, studySeconds) || !validateInput(breakHours, breakMinutes, breakSeconds)) {
    alert('Por favor, insira valores válidos para horas, minutos e segundos.');
    return;
  }

  studyTime = convertToSeconds(studyHours, studyMinutes, studySeconds);
  breakTime = convertToSeconds(breakHours, breakMinutes, breakSeconds);

  isStudyTime = true;
  isPaused = false;
  updateStatus();
  startCountdown(studyTime);
}

function convertToSeconds(hours, minutes, seconds) {
  return parseInt(hours || 0) * 3600 + parseInt(minutes || 0) * 60 + parseInt(seconds || 0);
}

function validateInput(hours, minutes, seconds) {
  if (hours < 0 || hours > 24 || minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
    return false;
  }
  return true;
}

function startCountdown(duration) {
  clearInterval(timerInterval);
  timeRemaining = duration;

  timerInterval = setInterval(() => {
    if (!isPaused) {
      let hours = Math.floor(timeRemaining / 3600);
      let minutes = Math.floor((timeRemaining % 3600) / 60);
      let seconds = timeRemaining % 60;

      document.getElementById('timerDisplay').textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endSound.play();
        isStudyTime = !isStudyTime;
        updateStatus();
        startCountdown(isStudyTime ? studyTime : breakTime);
      }

      timeRemaining--;
    }
  }, 1000);
}

function updateStatus() {
  document.getElementById('statusDisplay').textContent = isStudyTime ? 'Tempo de Estudo' : 'Tempo de Descanso';
}

function toggleMode() {
  const body = document.body;
  const modeImage = document.getElementById('modeImage');

  if (body.classList.contains('claro')) {
    body.classList.remove('claro');
    body.classList.add('noturno');
    modeImage.src = 'src/imagem/sol.png';
  } else {
    body.classList.remove('noturno');
    body.classList.add('claro');
    modeImage.src = 'src/imagem/lua.png';
  }
}

function pauseTimer() {
  isPaused = !isPaused;
  document.getElementById('pauseButton').innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
}
