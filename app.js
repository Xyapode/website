// Gestion de base des tâches par date
const tasks = JSON.parse(localStorage.getItem("tasks")) || {};

function renderTasks() {
  const calendar = document.querySelector(".calendar-events");
  calendar.innerHTML = ""; // reset

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

// Exemple : ajouter une tâche manuellement
// Tu peux l'enlever ou transformer ça en formulaire
saveTask("2025-03-07", {
  title: "📧 Emails",
  time: "13:00",
  class: "emails",
  top: "316px",
  left: "calc(24px + (100% - 96px) / 5 + 8px)",
  height: "60px"
});

// Chargement initial
renderTasks();
