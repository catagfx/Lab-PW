function setGreetingByHour() {
  const hour = new Date().getHours();
  const headerParagraph = document.querySelector("header p");
  if (!headerParagraph) return;

  let message = "";
  if (hour >= 6 && hour <= 11) {
    message = "Bună dimineața! Bine ai venit pe pagina mea.";
  } else if (hour >= 12 && hour <= 17) {
    message = "Bună ziua! Bine ai venit pe pagina mea.";
  } else {
    message = "Bună seara! Bine ai venit pe pagina mea.";
  }

  headerParagraph.textContent = message;
}

function setupContactFormValidation() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nume = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mesaj = document.getElementById("message").value.trim();

    // validări cerute
    if (nume.length < 2) {
      feedback.textContent = "Nume prea scurt! Minim 2 caractere.";
      feedback.style.color = "red";
      return;
    }

    if (!email.includes("@")) {
      feedback.textContent = "Email invalid! Trebuie să conțină @.";
      feedback.style.color = "red";
      return;
    }

    if (mesaj.length < 10) {
      feedback.textContent = "Mesaj prea scurt! Minim 10 caractere.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent = `Mulțumim, ${nume}! Mesajul a fost trimis.`;
    feedback.style.color = "green";

    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);

    form.reset();
  });
}

function setupDarkModeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function updateLabel() {
    const isDark = document.body.classList.contains("dark-mode");
    btn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  btn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    updateLabel();
  });

  updateLabel();
}

function setupSectionToggle() {
  const headings = document.querySelectorAll("main h2");

  headings.forEach(function (h2) {
    h2.style.cursor = "pointer";

    h2.addEventListener("click", function () {
      let el = h2.nextElementSibling;

      // ascunde/afișează toate elementele până la următorul H2 sau până se termină secțiunea
      while (el && el.tagName !== "H2") {
        el.classList.toggle("hidden");
        el = el.nextElementSibling;
      }
    });
  });
}

function setupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) btn.classList.remove("hidden");
    else btn.classList.add("hidden");
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setGreetingByHour();
  setupContactFormValidation();
  setupDarkModeToggle();
  setupSectionToggle();
  setupBackToTop();
});