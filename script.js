let timerInterval;
 let timeLeft = null;
let isBreakTime = false;
let isPaused = false;

const studyTimerElement = document.getElementById('study-timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const studyDurationSelect = document.getElementById('study-duration');
const breakDurationSelect = document.getElementById('break-duration');
const restMessage = document.getElementById('rest-message');
const timerLabel = document.getElementById('timer-label');

function updateTimerDisplay() {
    if (timeLeft === null) {
        studyTimerElement.textContent = '00:00';
    } else {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        studyTimerElement.textContent = `${minutes}:${seconds}`;
    }
}

function initializeTimer() {
    if (studyDurationSelect.value) {
        timeLeft = parseInt(studyDurationSelect.value) * 60;
        updateTimerDisplay();
        isBreakTime = false;
        timerLabel.textContent = "Waktu Belajar";
    }
    startButton.disabled = false;
    pauseButton.disabled = false;
    resetButton.disabled = false;
}

function startTimer() {
    if (timeLeft > 0 && !isPaused) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                if (!isBreakTime) {
                    alert("Waktu belajar telah selesai!👏👏");
                    isBreakTime = true;
                    timeLeft = parseInt(breakDurationSelect.value) * 60; // Set waktu istirahat sesuai pilihan pengguna
                    timerLabel.textContent = "Waktu Istirahat 😊";
                } else {
                    alert("Waktu istirahat telah selesai!👏👏");
                    isBreakTime = false;
                    timeLeft = parseInt(studyDurationSelect.value) * 60; // Reset ke waktu belajar
                    timerLabel.textContent = "Waktu Belajar";
                }
                updateTimerDisplay();
                startTimer(); // Mulai timer lagi untuk waktu berikutnya
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
}

function resumeTimer() {
    isPaused = false;
    startTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = parseInt(studyDurationSelect.value) * 60;
    updateTimerDisplay();
    restMessage.style.display = 'none';
    isPaused = false;
    isBreakTime = false;
    timerLabel.textContent = "Waktu Belajar";
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
studyDurationSelect.addEventListener('change', initializeTimer);
breakDurationSelect.addEventListener('change', () => {
    if (isBreakTime) {
        timeLeft = parseInt(breakDurationSelect.value) * 60; // Update waktu istirahat jika sudah dalam mode istirahat
        updateTimerDisplay();
    }
});

updateTimerDisplay();

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const deleteCompletedButton = document.getElementById('delete-completed');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function saveTasks() {
    const tasks = Array.from(todoList.children).map(task => ({
        text: task.querySelector('label').textContent,
        completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskText, completed = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (completed) li.classList.add('completed');
    
    li.innerHTML = `
        <div style="display: flex; align-items: center; flex-grow: 1;">
            <input type="checkbox" class="todo-checkbox" ${completed ? 'checked ' : ''}>
            <label>${taskText}</label>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    const checkbox = li.querySelector('.todo-checkbox');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed', this.checked);
        saveTasks();
    });

    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
    });

    todoList.appendChild(li);
    return li;
}

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText);
        todoInput.value = "";
        saveTasks();
    }
});

deleteCompletedButton.addEventListener('click', function() {
    const completedTasks = document.querySelectorAll('.todo-item.completed');
    completedTasks.forEach(task => task.remove());
    saveTasks();
});

document.addEventListener('DOMContentLoaded', loadTasks);

// Motivational Quotes
const motivasiArray = [
    "Belajarlah dengan tekun, karena pengetahuan yang Anda dapatkan akan menjadi bekal untuk kesuksesan Anda!",
    "Setiap langkah kecil adalah kemajuan, teruslah melangkah!",
    "Kesuksesan tidak datang dari apa yang Anda lakukan sesekali, tetapi dari apa yang Anda lakukan secara konsisten.",
    "Jangan pernah menyerah, karena hal-hal yang baik membutuhkan waktu.",
    "Percayalah pada dirimu sendiri dan semua yang kamu inginkan akan datang padamu pada waktu yang tepat."
];

let currentMotivasiIndex = 0;

function gantiMotivasi() {
    const motivasiTextElement = document.getElementById('motivasi-text');
    motivasiTextElement.textContent = motivasiArray[currentMotivasiIndex];
    currentMotivasiIndex = (currentMotivasiIndex + 1) % motivasiArray.length; // Loop kembali ke awal
}

// Ganti kata motivasi setiap 5 detik
setInterval(gantiMotivasi, 5000);

// Inisialisasi dengan kata motivasi pertama
gantiMotivasi();