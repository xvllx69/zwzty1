const taskList = document.querySelector('#taskList');
const progressText = document.querySelector('#progressText');
const progressBar = document.querySelector('#progressBar');
const toast = document.querySelector('#toast');
const addTaskButton = document.querySelector('#addTaskButton');
const quickAddButton = document.querySelector('#quickAddButton');

function updateProgress() {
  const tasks = [...taskList.querySelectorAll('.task-item')];
  const completed = tasks.filter((task) => task.querySelector('input').checked).length;
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  progressText.textContent = `${completed} / ${tasks.length}`;
  progressBar.style.width = `${percent}%`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

taskList.addEventListener('change', (event) => {
  const input = event.target;
  if (!input.matches('input[type="checkbox"]')) return;
  input.closest('.task-item').classList.toggle('completed', input.checked);
  updateProgress();
});

function addTask() {
  const task = document.createElement('label');
  task.className = 'task-item';
  task.innerHTML = '<input type="checkbox" /><span class="checkmark">✓</span><span class="task-text">وقت إضافي لنفسي</span><span class="task-time">لاحقًا</span>';
  taskList.append(task);
  updateProgress();
  showToast('أضيفت مهمة جديدة إلى يومك');
}

addTaskButton.addEventListener('click', addTask);
quickAddButton.addEventListener('click', addTask);

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

updateProgress();
