const tasks = JSON.parse(localStorage.getItem("tasks")) || {};

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

function renderCurrentDate() {
  const now = new Date();
  const monthOptions = { month: 'long', year: 'numeric' };
  const currentMonth = now.toLocaleDateString('fr-FR', monthOptions);
  document.getElementById("current-month").textContent = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  const weekNumber = getWeekNumber(now);
  document.getElementById("current-week").textContent = `Semaine ${weekNumber}`;

  const daysHeader = document.getElementById("days-header");
  daysHeader.innerHTML = "";

  const monday = getMonday(now);
  const formatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: '2-digit' });

  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const [weekday, num] = formatter.format(day).split(" ");

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
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDay + 86400000) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDay.getDay() + 1) / 7);
}

function goToToday() {
  renderCurrentDate();
  renderTasks();
}

// Initialisation
renderCurrentDate();
renderTasks();
