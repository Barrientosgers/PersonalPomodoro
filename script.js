// Get references to HTML elements
const timerEl = document.querySelector('.timer');
const todoFormEl = document.querySelector('.todo form');
const todoListEl = document.querySelector('.todo ul');
const completedListEl = document.querySelector('.completed ul');

// Set initial timer values
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let timeLeft = workTime; // Start with work time
let isWorking = true; // Start with work timer active
let isRunning = false; // Start with timer paused
let timerInterval; // Placeholder for setInterval

// Initialize timer display
updateTimerDisplay(timeLeft);

// Handle timer button clicks
timerEl.addEventListener('click', function(e) {
  const button = e.target;

  // Start or pause timer
  if (button.classList.contains('start')) {
    if (!isRunning) {
      timerInterval = setInterval(countdown, 1000);
      isRunning = true;
      button.textContent = 'Pause';
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      button.textContent = 'Start';
    }
  }

  // Reset timer
  if (button.classList.contains('reset')) {
    clearInterval(timerInterval);
    isRunning = false;
    isWorking = true;
    timeLeft = workTime;
    updateTimerDisplay(timeLeft);
    button.textContent = 'Start';
  }

  // Switch between work and break times
  if (button.classList.contains('switch')) {
    if (isWorking) {
      timeLeft = breakTime;
      isWorking = false;
      button.textContent = 'Work';
      timerEl.style.backgroundColor = '#FF0000';
    } else {
      timeLeft = workTime;
      isWorking = true;
      button.textContent = 'Break';
      timerEl.style.backgroundColor = '#4CAF50';
    }
    updateTimerDisplay(timeLeft);
  }
});

// Handle to-do form submit
todoFormEl.addEventListener('submit', function(e) {
  e.preventDefault();
  const todoInput = e.target.elements['todo-item'];
  const todoText = todoInput.value.trim();

  // Add to-do item to list
  if (todoText !== '') {
    const li = document.createElement('li');
    li.textContent = todoText;
    todoListEl.appendChild(li);
    todoInput.value = '';
  }
});

// Handle to-do item completion
todoListEl.addEventListener('click', function(e) {
  const li = e.target;

  // Move completed to-do item to completed list
  if (li.parentNode === todoListEl) {
    completedListEl.appendChild(li);
  }
});

// Countdown function for timer
function countdown() {
  timeLeft--;

  // Update timer display
  updateTimerDisplay(timeLeft);

  // Switch between work and break times
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    isRunning = false;
    isWorking = !isWorking;
    if (isWorking) {
      timeLeft = workTime;
      timerEl.style.backgroundColor = '#4CAF50';
      timerEl.querySelector('.switch').textContent = 'Break';
    } else {
      timeLeft = breakTime;
      timerEl.style.backgroundColor = '#FF0000';
      timerEl.querySelector('.switch').textContent = 'Work';
    }

    // Add completed session to completed list
    const li = document.createElement('li');
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    li.textContent = `Completed ${isWorking ? 'work' : 'break'} session on ${dateString}`;
    completedListEl.appendChild(li);

    // Reset timer
    timeLeft = workTime;
    isWorking = true;
    updateTimerDisplay(timeLeft);
    timerEl.style.backgroundColor = '#4CAF50';
    timerEl.querySelector('.switch').textContent = 'Break';
  }
}


