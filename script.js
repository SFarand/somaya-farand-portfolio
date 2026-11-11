// Theme switcher: remembers the visitor's choice on this device.
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");
const savedTheme = localStorage.getItem("somaya-portfolio-theme");
const preferredTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isLight = theme === "light";
  if (themeIcon) themeIcon.className = isLight ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
  if (themeLabel) themeLabel.textContent = isLight ? "Dark" : "Light";
  if (themeToggle) themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isLight ? "#f5f3ef" : "#10111b");
}
applyTheme(savedTheme || preferredTheme);
themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem("somaya-portfolio-theme", nextTheme);
});

// Portfolio interactions: collapse the mobile navigation after choosing a section.
document.querySelectorAll("#mainNav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector("#mainNav");
    if (nav && nav.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

// Highlight the current section in the navigation as the page is scrolled.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => observer.observe(section));
}
