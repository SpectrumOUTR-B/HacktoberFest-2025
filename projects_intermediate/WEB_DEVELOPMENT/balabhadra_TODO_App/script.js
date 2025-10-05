const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterBtns = document.querySelectorAll(".filters button[data-filter]");
const clearAllBtn = document.getElementById("clear-all");
const totalTasksSpan = document.getElementById("total-tasks");
const completedTasksSpan = document.getElementById("completed-tasks");
const datetimeDiv = document.getElementById("datetime");
const modeToggle = document.getElementById("mode-toggle");
const filtersDiv = document.querySelector(".filters");
const filterToggleMobile = document.getElementById("filter-toggle-mobile");

const modalOverlay = document.getElementById("confirmation-modal");
const modalTaskText = document.getElementById("modal-task-text");
const modalConfirmBtn = document.getElementById("modal-confirm-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function hideModal() {
    modalOverlay.classList.remove('visible');
    modalConfirmBtn.dataset.actionType = '';
    modalConfirmBtn.dataset.taskIndex = '';
    modalConfirmBtn.textContent = 'Delete';
}

function showModal(actionType, index = null) {
    if (actionType === 'single' && index !== null) {
        const taskName = tasks[index].text;
        modalTaskText.innerHTML = `Are you sure you want to delete the task: <strong>"${taskName}"</strong>?`;
        modalConfirmBtn.dataset.taskIndex = index;
        modalConfirmBtn.dataset.actionType = 'single';
        modalConfirmBtn.textContent = 'Delete';
    } else if (actionType === 'all') {
        modalTaskText.innerHTML = `Are you sure you want to delete <strong>ALL</strong> ${tasks.length} tasks? This action cannot be undone.`;
        modalConfirmBtn.dataset.actionType = 'all';
        modalConfirmBtn.dataset.taskIndex = '';
        modalConfirmBtn.textContent = 'Delete All';
    } else return;
    modalOverlay.classList.add('visible');
}

modalConfirmBtn.addEventListener('click', () => {
    const actionType = modalConfirmBtn.dataset.actionType;
    if (actionType === 'single') {
        const index = parseInt(modalConfirmBtn.dataset.taskIndex);
        if (!isNaN(index)) tasks.splice(index, 1);
    } else if (actionType === 'all') tasks = [];
    saveTasks();
    const currentFilter = document.querySelector('.filters button.active')?.dataset.filter || 'all';
    renderTasks(currentFilter);
    hideModal();
});

modalCancelBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) hideModal();
});

function renderTasks(filter="all") {
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if(filter === "completed") filteredTasks = tasks.filter(t => t.completed);
    if(filter === "pending") filteredTasks = tasks.filter(t => !t.completed);
    filteredTasks.forEach((task, index) => {
        const originalIndex = tasks.findIndex(t => t === task); 
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        const numberSpan = document.createElement("span");
        numberSpan.className = "task-number";
        numberSpan.textContent = `${index + 1}. `;
        li.appendChild(numberSpan);
        const span = document.createElement("span");
        span.className = "task-text"; 
        span.textContent = task.text;
        span.contentEditable = !task.completed;
        span.addEventListener("blur", () => editTask(originalIndex, span.textContent));
        li.appendChild(span);
        const timeSpan = document.createElement("span");
        timeSpan.className = "task-time";
        timeSpan.textContent = task.completed ? `Completed: ${task.completedTime}` : `Added: ${task.addedTime}`;
        li.appendChild(timeSpan);
        const badge = document.createElement("span");
        badge.className = `badge ${task.completed ? 'completed' : 'pending'}`;
        badge.textContent = task.completed ? 'Completed' : 'Pending';
        li.appendChild(badge);
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "task-actions";
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = task.completed ? "↩" : "✔";
        toggleBtn.title = task.completed ? "Mark as Pending" : "Mark as Completed";
        toggleBtn.addEventListener("click", () => toggleComplete(originalIndex));
        actionsDiv.appendChild(toggleBtn);
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => showModal('single', originalIndex)); 
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
    updateCounts();
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if(text) {
        const now = new Date();
        const addedTime = now.toLocaleString();
        tasks.push({text, completed: false, addedTime, completedTime: null});
        saveTasks();
        taskInput.value = "";
        const currentFilter = document.querySelector('.filters button.active')?.dataset.filter || 'all';
        renderTasks(currentFilter); 
    }
});

function editTask(index, newText) {
    if (tasks[index].text !== newText && !tasks[index].completed) {
        tasks[index].text = newText;
        saveTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks[index].completedTime = tasks[index].completed ? new Date().toLocaleString() : null;
    saveTasks();
    const currentFilter = document.querySelector('.filters button.active')?.dataset.filter || 'all';
    renderTasks(currentFilter);
}

clearAllBtn.addEventListener("click", () => {
    if (tasks.length === 0) {
        alert("Your TO-DO list is already empty!");
        return;
    }
    showModal('all'); 
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTasks(btn.dataset.filter);
        if (window.innerWidth <= 600) {
            filtersDiv.classList.remove('active');
            filterToggleMobile.textContent = 'Filter Tasks ▼';
        }
    });
});

filterToggleMobile.addEventListener("click", () => {
    filtersDiv.classList.toggle("active");
    filterToggleMobile.textContent = filtersDiv.classList.contains('active') ? 'Filter Tasks ▲' : 'Filter Tasks ▼';
});

document.querySelector('.filters button[data-filter="all"]').classList.add('active');

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounts() {
    totalTasksSpan.textContent = `Total Tasks: ${tasks.length}`;
    completedTasksSpan.textContent = `Completed: ${tasks.filter(t => t.completed).length}`;
}

function updateDateTime() {
    datetimeDiv.textContent = new Date().toLocaleString();
}
setInterval(updateDateTime, 1000); 
updateDateTime();

modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    modeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});

renderTasks();
