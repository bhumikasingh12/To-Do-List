// ── State ──────────────────────────────────────────────────
let tasks  = JSON.parse(localStorage.getItem('gm_tasks') || '[]');
let filter = 'all';

// ── DOM refs ───────────────────────────────────────────────
const taskInput   = document.getElementById('task-input');
const addBtn      = document.getElementById('add-btn');
const taskList    = document.getElementById('task-list');
const emptyState  = document.getElementById('empty-state');
const emptyMsg    = document.getElementById('empty-msg');
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const dateLabel   = document.getElementById('date-label');
const clearDone   = document.getElementById('clear-done');

// ── Date ───────────────────────────────────────────────────
dateLabel.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric'
});

// ── Persist ────────────────────────────────────────────────
function save() {
  localStorage.setItem('gm_tasks', JSON.stringify(tasks));
}

// ── Render ─────────────────────────────────────────────────
function render() {
  taskList.innerHTML = '';

  const visible = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done')   return  t.done;
    return true;
  });

  const total = tasks.length;
  const done  = tasks.filter(t => t.done).length;

  // progress
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  progressFill.style.width = pct + '%';
  progressLabel.textContent = done + ' / ' + total + ' done';

  // empty state
  if (visible.length === 0) {
    emptyState.classList.remove('hidden');
    taskList.style.display = 'none';
    if (filter === 'done')   emptyMsg.textContent = 'No completed tasks yet.';
    else if (filter === 'active') emptyMsg.textContent = 'All done! Great job.';
    else emptyMsg.textContent = 'Nothing here yet. Add a task above.';
    return;
  }

  emptyState.classList.add('hidden');
  taskList.style.display = '';

  visible.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const check = document.createElement('div');
    check.className = 'task-check' + (t.done ? ' done' : '');
    check.addEventListener('click', () => { t.done = !t.done; save(); render(); });

    const label = document.createElement('span');
    label.className = 'task-label' + (t.done ? ' done' : '');
    label.textContent = t.text;

    const dot = document.createElement('span');
    dot.className = 'task-priority priority-' + (t.priority || 'medium');

    const del = document.createElement('button');
    del.className = 'task-del';
    del.textContent = '×';
    del.title = 'Delete';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(x => x.id !== t.id);
      save();
      render();
    });

    li.appendChild(check);
    li.appendChild(label);
    li.appendChild(dot);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

// ── Add task ───────────────────────────────────────────────
function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.style.borderColor = '#DD614A';
    setTimeout(() => taskInput.style.borderColor = '', 800);
    return;
  }

  // Simple priority heuristic: exclamation = high, ? = low, else medium
  let priority = 'medium';
  if (text.endsWith('!') || text.includes('urgent') || text.includes('asap')) priority = 'high';
  else if (text.endsWith('?') || text.includes('maybe') || text.includes('later')) priority = 'low';

  tasks.unshift({ id: Date.now(), text, done: false, priority });
  taskInput.value = '';
  save();
  render();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

// ── Filters ────────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    render();
  });
});

// ── Clear done ─────────────────────────────────────────────
clearDone.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

// ── Boot ───────────────────────────────────────────────────
if (tasks.length === 0) {
  tasks = [
    { id: 1, text: 'Try adding a task above!', done: false, priority: 'medium' },
    { id: 2, text: 'Click the circle to mark done', done: false, priority: 'low' },
    { id: 3, text: 'Hover a task to delete it', done: true, priority: 'high' }
  ];
}
render();