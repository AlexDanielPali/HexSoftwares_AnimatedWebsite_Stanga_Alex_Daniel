/* Planet data */
const PLANETS = [
  { id: "mercury", name: "Mercury", color: "#cbd5e1", size: 10, radius: 100, period: 10,
    description: "Smallest planet, closest to the Sun.", facts: { diameter: "4,879 km", distance: "0.39 AU", moons: 0 } },
  { id: "venus", name: "Venus", color: "#f59e0b", size: 14, radius: 140, period: 15,
    description: "Similar size to Earth, thick atmosphere.", facts: { diameter: "12,104 km", distance: "0.72 AU", moons: 0 } },
  { id: "earth", name: "Earth", color: "#22c55e", size: 14, radius: 180, period: 20,
    description: "Our home planet, supports life.", facts: { diameter: "12,742 km", distance: "1 AU", moons: 1 } },
  { id: "mars", name: "Mars", color: "#ef4444", size: 12, radius: 220, period: 25,
    description: "The Red Planet with polar ice caps.", facts: { diameter: "6,779 km", distance: "1.52 AU", moons: 2 } },
  { id: "jupiter", name: "Jupiter", color: "#f97316", size: 22, radius: 270, period: 30,
    description: "Largest planet, a gas giant with the Great Red Spot.", facts: { diameter: "139,820 km", distance: "5.2 AU", moons: 95 } },
  { id: "saturn", name: "Saturn", color: "#eab308", size: 20, radius: 320, period: 35,
    description: "Gas giant famous for its spectacular rings.", facts: { diameter: "116,460 km", distance: "9.58 AU", moons: 83 } },
  { id: "uranus", name: "Uranus", color: "#38bdf8", size: 18, radius: 370, period: 40,
    description: "Ice giant that rotates on its side.", facts: { diameter: "50,724 km", distance: "19.2 AU", moons: 27 } },
  { id: "neptune", name: "Neptune", color: "#3b82f6", size: 18, radius: 420, period: 45,
    description: "Distant ice giant with supersonic winds.", facts: { diameter: "49,244 km", distance: "30.1 AU", moons: 14 } },
  { id: "pluto", name: "Pluto", color: "#a78bfa", size: 8, radius: 460, period: 50,
    description: "Dwarf planet in the Kuiper Belt.", facts: { diameter: "2,377 km", distance: "39.5 AU", moons: 5 } }
];

/* Dynamic scaling based on window width */
function getScaleFactor() {
  const w = window.innerWidth;
  if (w <= 400) return 0.48;
  if (w <= 600) return 0.6;
  if (w <= 768) return 0.7;
  if (w <= 992) return 0.8;
  if (w <= 1200) return 0.9;
  return 1;
}

/* Render nav */
function renderNav() {
  const navList = document.getElementById("nav-list");
  PLANETS.forEach(p => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${p.id}`;
    a.textContent = p.name;
    li.appendChild(a);
    navList.appendChild(li);
  });
}

/* Render solar system */
function renderVisualization() {
  const container = document.getElementById("solar-container");
  container.innerHTML = '<div class="sun"></div>'; // clear before redraw
  const scale = getScaleFactor();
  PLANETS.forEach(p => {
    const orbit = document.createElement("div");
    orbit.className = "orbit";
    orbit.style.width = `${p.radius*2*scale}px`;
    orbit.style.height = `${p.radius*2*scale}px`;
    container.appendChild(orbit);

    const planet = document.createElement("div");
    planet.className = "planet";
    planet.style.setProperty("--radius", `${p.radius*scale}px`);
    planet.style.animationDuration = `${p.period}s`;

    const body = document.createElement("span");
    body.className = "planet-body";
    body.style.setProperty("--size", `${p.size*scale}px`);
    body.style.setProperty("--color", p.color);
    if(p.id === "saturn") body.classList.add("saturn");

    const label = document.createElement("span");
    label.className = "planet-label";
    label.textContent = p.name;

    planet.appendChild(body);
    planet.appendChild(label);
    container.appendChild(planet);
  });
}

/* Render planet cards */
function renderPlanetSections() {
  const sections = document.getElementById("planet-sections");
  sections.innerHTML = '';
  PLANETS.forEach((p,i)=>{
    const card = document.createElement("section");
    card.className="planet-card";
    card.id = p.id;
    card.style.animationDelay = `${0.15 + i*0.1}s`;
    card.innerHTML = `
      <h2>${p.name}</h2>
      <p>${p.description}</p>
      <ul>
        <li><strong>Diameter:</strong> ${p.facts.diameter}</li>
        <li><strong>Distance from Sun:</strong> ${p.facts.distance}</li>
        <li><strong>Moons:</strong> ${p.facts.moons}</li>
      </ul>
    `;
    sections.appendChild(card);
  });
}

/* Dark mode */
function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark":"light");
  root.setAttribute("data-theme", initial);
  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme")==="dark"?"light":"dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* Smooth scroll */
function setupSmoothScroll() {
  const navList = document.getElementById("nav-list");
  navList.addEventListener("click", e => {
    const link = e.target.closest("a[href^='#']");
    if(!link) return;
    e.preventDefault();
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
  });
}

/* Mobile nav toggle */
function setupNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const navList = document.getElementById("nav-list");
  toggle?.addEventListener("click",()=>navList.classList.toggle("open"));
}

/* Redraw planets on resize */
window.addEventListener("resize", renderVisualization);

/* Init */
function init() {
  renderNav();
  renderVisualization();
  renderPlanetSections();
  setupThemeToggle();
  setupSmoothScroll();
  setupNavToggle();
}

document.addEventListener("DOMContentLoaded", init);
