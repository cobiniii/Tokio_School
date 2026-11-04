const priceInput = document.querySelector("#project-price");
const priceRange = document.querySelector("#price-range");
const projectCount = document.querySelector("#project-count");
const estimate = document.querySelector("#estimate");
const form = document.querySelector("#income-form");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const copyButton = document.querySelector("#copy-prompt");
const copyFeedback = document.querySelector("#copy-feedback");

const formatCurrency = (amount) =>
  `${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(amount)} €`;

function updateEstimate() {
  const price = Math.max(1, Number(priceInput.value) || 0);
  const projects = Math.max(1, Number(projectCount.value) || 0);
  estimate.textContent = formatCurrency(price * projects);
}

priceInput.addEventListener("input", () => {
  const value = Number(priceInput.value);
  if (value >= Number(priceRange.min) && value <= Number(priceRange.max)) {
    priceRange.value = String(value);
  }
  updateEstimate();
});

priceRange.addEventListener("input", () => {
  priceInput.value = priceRange.value;
  updateEstimate();
});

projectCount.addEventListener("input", updateEstimate);

form.addEventListener("submit", (event) => event.preventDefault());

document.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const current = Number(projectCount.value) || 1;
    const next = Math.min(20, Math.max(1, current + Number(button.dataset.step)));
    projectCount.value = String(next);
    updateEstimate();
  });
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mainNav.classList.remove("is-open");
  });
});

copyButton.addEventListener("click", async () => {
  const prompt = "¿Qué tarea repetitiva te quita más tiempo cada semana y cómo la resuelves ahora?";
  try {
    await navigator.clipboard.writeText(prompt);
    copyFeedback.textContent = "Pregunta copiada. Ya puedes iniciar la conversación.";
  } catch (error) {
    copyFeedback.textContent = "Copia esta pregunta: «¿Qué tarea repetitiva te quita más tiempo cada semana?»";
  }
});

updateEstimate();
