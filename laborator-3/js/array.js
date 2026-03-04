document.addEventListener("DOMContentLoaded", () => {
  const educationOl = document.querySelector("#education ol");
  if (!educationOl) {
    console.warn("Nu am găsit #education ol în pagină.");
    return;
  }

  const educationItems = Array.from(educationOl.querySelectorAll("li"))
    .map(li => li.textContent.trim());

  console.log("Ex.1 - Array educație:", educationItems);
  const filter2024 = educationItems.filter(item => item.includes("2024"));
  const filterColegiul = educationItems.filter(item => item.toLowerCase().includes("colegiul"));

  console.log("Ex.2 - Elemente care conțin '2024':", filter2024);
  console.log("Ex.2 - Elemente care conțin 'colegiul':", filterColegiul);
  const firstWords = educationItems.map(item => {
    const afterColon = item.includes(":") ? item.split(":")[1].trim() : item;
    return afterColon.split(/\s+/)[0]; // primul cuvânt
  });

  console.log("Ex.3 - Primul cuvânt din fiecare element:", firstWords);
  const currentYear = new Date().getFullYear();

  function getDurationYears(text) {
    const match = text.match(/(\d{4})\s*-\s*(\d{4}|prezent)/i);
    if (!match) return 0;

    const start = Number(match[1]);
    const endRaw = match[2].toLowerCase();
    const end = endRaw === "prezent" ? currentYear : Number(endRaw);
    return Math.max(0, end - start);
  }

  const totalYears = educationItems.reduce((sum, item) => {
    return sum + getDurationYears(item);
  }, 0);

  console.log(`Ex.4 - Total ani de studiu: ${totalYears}`);
  const localProjects = [
    { name: "Site prezentare", tech: "HTML/CSS/JS", done: true },
    { name: "Formular contact validat", tech: "JavaScript", done: true },
    { name: "Dark Mode Toggle", tech: "CSS Variables + JS", done: false },
    { name: "Galerie foto", tech: "HTML/CSS", done: false }
  ];

  const projectsList = document.getElementById("projects-list");
  const projectsSummary = document.getElementById("projects-summary");

  function renderProjects(projects) {
    if (!projectsList || !projectsSummary) return;

    projectsList.innerHTML = projects
      .map(p => `<li><strong>${p.name}</strong> — ${p.tech} ${p.done ? "✅" : "⏳"}</li>`)
      .join("");

    const doneCount = projects.filter(p => p.done).length;
    projectsSummary.textContent = `Finalizate: ${doneCount} din ${projects.length}`;
  }

  renderProjects(localProjects);
  async function loadProjectsFromJson() {
    try {
      const res = await fetch("data/projects.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const projectsFromJson = await res.json();
      renderProjects(projectsFromJson);
      console.log("Ex.6 - Proiecte încărcate din JSON:", projectsFromJson);
    } catch (err) {
      console.error("Ex.6 - Eroare la fetch (pornește cu Live Server):", err);
    }
  }

  loadProjectsFromJson();
});