
"use strict";

/*
  PERSONALIZE THESE VALUES BEFORE PUBLISHING.
  Leave a value empty if you do not have that link yet.
*/
const PORTFOLIO = {
  email: "", // Example: harman@example.com
  github: "", // Example: https://github.com/your-username
  linkedin: "", // Example: https://www.linkedin.com/in/your-profile/
  projectUrl: "" // URL of your deployed expense tracker
};

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Toggle navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after choosing a section
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Toggle navigation");
    menuToggle.textContent = "☰";
  });
});

// Highlight the navigation link for the visible section
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navigationLinks.forEach(link => {
      const active = link.getAttribute("href") ===
        `#${visible.target.id}`;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0, 0.2, 0.5]
  });

  sections.forEach(section => observer.observe(section));
}

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Email contact
const emailLink = document.getElementById("email-link");
const contactNote = document.getElementById("contact-note");

if (PORTFOLIO.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PORTFOLIO.email)) {
  emailLink.href = `mailto:${PORTFOLIO.email}`;
  emailLink.removeAttribute("aria-disabled");
  contactNote.hidden = true;
} else {
  emailLink.href = "#contact-note";
  emailLink.addEventListener("click", event => {
    event.preventDefault();
    contactNote.hidden = false;
    contactNote.textContent =
      "To activate email contact, add your email in the PORTFOLIO settings in script.js.";
  });
}

// Social profile links
function configureSocialLink(id, url, host) {
  const link = document.getElementById(id);

  try {
    const parsed = new URL(url);

    if (parsed.protocol === "https:" && parsed.hostname === host) {
      link.href = parsed.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return;
    }
  } catch {
    // Missing or invalid URL: keep the link inactive.
  }

  link.href = "#contact";
  link.removeAttribute("target");
  link.addEventListener("click", event => {
    event.preventDefault();
    contactNote.hidden = false;
    contactNote.textContent =
      `Add your ${id === "github-link" ? "GitHub" : "LinkedIn"} URL in script.js to activate this link.`;
    contactNote.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

configureSocialLink(
  "github-link",
  PORTFOLIO.github,
  "github.com"
);

configureSocialLink(
  "linkedin-link",
  PORTFOLIO.linkedin,
  "www.linkedin.com"
);

// Featured project link
const projectButton = document.getElementById("project-details-btn");
const projectNote = document.getElementById("project-note");

try {
  const projectURL = new URL("https://harman542.github.io/expense/");

  if (projectURL.protocol === "https:") {
    projectButton.addEventListener("click", () => {
      window.open(projectURL.href, "_blank", "noopener,noreferrer");
    });
  } else {
    projectButton.addEventListener("click", () => {
      projectNote.hidden = false;
    });
  }
} catch {
  projectButton.addEventListener("click", () => {
    projectNote.hidden = false;
    projectNote.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
}
