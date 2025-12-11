// Получаем элементы DOM
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Загружаем задачи из localStorage при старте
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Отображаем задачи
function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.textContent = todo.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleComplete(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', () => deleteTodo(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// Добавление новой задачи
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveToLocalStorage();
    renderTodos();
    input.value = '';
    input.focus();
  }
});

// Отметить как выполнено / невыполнено
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveToLocalStorage();
  renderTodos();
}

// Удалить задачу
function deleteTodo(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
}

// Сохранить в localStorage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Запуск приложения
renderTodos();