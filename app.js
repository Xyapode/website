let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
let currentDate = new Date();

function renderTasks() {
  const calendar = document.querySelector(".calendar-events");
  if (!calendar) return;
  calendar.innerHTML = "";

  for (const [date, items] of Object.entries(tasks)) {
    items.forEach(event => {
      const div = document.createElement("div");
      div.className = `event ${event.class}`;
      div.style.top = event.top;
      div.style.left = event.left;
      div.style.height = event.height;
      div.innerHTML = `
        <div class="event-title">${event.title}</div>
        <div class="event-time">${event.time}</div>
      `;
      calendar.appendChild(div);
    });
  }
}

function saveTask(date, task) {
  if (!tasks[date]) tasks[date] = [];
  tasks[date].push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderCurrentDate(baseDate = new Date()) {
  const monthOptions = { month: 'long', year: 'numeric' };
  const currentMonth = baseDate.toLocaleDateString('fr-FR', monthOptions);
  document.getElementById("current-month").textContent = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  const weekNumber = getWeekNumber(baseDate);
  document.getElementById("current-week").textContent = `Semaine ${weekNumber}`;

  const daysHeader = document.getElementById("days-header");
  daysHeader.innerHTML = "";

  const monday = getMonday(baseDate);
  const formatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: '2-digit' });

  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const label = formatter.format(day);
    const num = day.getDate().toString().padStart(2, '0');
    const weekday = label.split(" ")[0];

    const col = document.createElement("div");
    col.className = "day-column";
    col.innerHTML = `<div class="day-number">${num}</div><div class="day-name">${weekday}</div>`;
    daysHeader.appendChild(col);
  }
}

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function getWeekNumber(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const diff = target - firstThursday;
  return 1 + Math.round(diff / (7 * 24 * 3600 * 1000));
}

function goToToday() {
  currentDate = new Date();
  renderCurrentDate(currentDate);
  renderTasks();
}

function changeWeek(offset) {
  currentDate.setDate(currentDate.getDate() + offset * 7);
  renderCurrentDate(currentDate);
  renderTasks();
}

// Initialisation
renderCurrentDate(currentDate);
renderTasks();