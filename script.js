// Get DOM elements
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Initialize tasks array
let tasks = [];

// Define loadTasks function
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach((task) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.onclick = () => {
                removeTask(taskItem, task);
            };
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }
}

// Define addTask function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    tasks.push(taskText);
    saveTasksToLocalStorage();

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = () => {
        removeTask(taskItem, taskText);
    };

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    taskInput.value = '';
}

// Define removeTask function
function removeTask(taskItem, taskText) {
    taskList.removeChild(taskItem);
    tasks = tasks.filter((task) => task !== taskText);
    saveTasksToLocalStorage();
}

// Define saveTasksToLocalStorage function
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from Local Storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
