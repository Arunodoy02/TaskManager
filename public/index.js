// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    
    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/tasks');
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Render tasks
    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskEl.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask('${task._id}', this.checked)">
                <span>${task.name}</span>
                <div class="task-actions">
                    <button class="edit-btn" onclick="editTask('${task._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
                </div>
            `;
            taskList.appendChild(taskEl);
        });
    };

    // Add new task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!taskInput.value.trim()) return;

        try {
            await fetch('http://localhost:5000/api/v1/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: taskInput.value })
            });
            taskInput.value = '';
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    // Delete task
    window.deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/v1/tasks/${id}`, { method: 'DELETE' });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Toggle task completion
    window.toggleTask = async (id, completed) => {
        try {
            await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed })
            });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Edit task
    window.editTask = async (id) => {
        const newName = prompt('Enter new task name:');
        if (newName) {
            try {
                await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newName })
                });
                fetchTasks();
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    // Initial fetch
    fetchTasks();
});