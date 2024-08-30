// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Функция для получения списка задач
    function fetchTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.dataset.id = task.id;
                    li.className = task.completed ? 'completed' : '';
                    li.innerHTML = `
                        <span>${task.title}</span>
                        <button class="delete">Delete</button>
                        <button class="toggle">${task.completed ? 'Unmark' : 'Mark'}</button>
                    `;
                    taskList.appendChild(li);
                });
            });
    }

    // Функция для добавления задачи
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskInput.value.trim();
        if (title) {
            fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            })
            .then(() => {
                taskInput.value = '';
                fetchTasks();
            });
        }
    });

    // Функция для обработки нажатий на кнопки в списке задач
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const id = e.target.parentElement.dataset.id;
            fetch(`/tasks/${id}`, { method: 'DELETE' })
                .then(() => fetchTasks());
        }

        if (e.target.classList.contains('toggle')) {
            const id = e.target.parentElement.dataset.id;
            const completed = e.target.parentElement.classList.contains('completed');
            fetch(`/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            })
            .then(() => fetchTasks());
        }
    });

    // Получаем задачи при загрузке страницы
    fetchTasks();
});
