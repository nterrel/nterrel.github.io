/**
 * Main JavaScript for Nicholas Terrel's personal website
 * Handles tab navigation and dynamic year in footer
 */

// Update copyright year
document.getElementById("y").textContent = new Date().getFullYear();

// Tab navigation
const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".panel")];

/**
 * Show specified panel(s) and update tab states
 * @param {string|string[]} ids - Panel ID(s) to show
 * @param {boolean} pushHash - Whether to update URL hash
 */
function show(ids, pushHash = true) {
  const want = new Set(Array.isArray(ids) ? ids : [ids]);

  // Show/hide panels based on IDs
  panels.forEach((p) => (p.hidden = !want.has(p.id)));

  // Update tab aria attributes
  tabs.forEach((t) => {
    const tabIds = (t.dataset.tabs ?? t.dataset.tab ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const selected = tabIds.length && tabIds.every((id) => want.has(id));
    t.setAttribute("aria-selected", selected ? "true" : "false");
    t.setAttribute("tabindex", selected ? "0" : "-1");
  });

  // Update URL hash with first ID
  if (pushHash) {
    const first = [...want][0];
    history.replaceState(null, "", "#" + first);
  }
}

// Add click handlers to tabs
tabs.forEach((t) =>
  t.addEventListener("click", () => {
    const ids = (t.dataset.tabs ?? t.dataset.tab ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    show(ids);
  })
);

// Initialize on page load
// If hash is #about or #contact, show combined view
const initial = (location.hash || "#about").slice(1);
if (initial === "about" || initial === "contact") {
  show(["about", "contact"], false);
} else {
  show(document.getElementById(initial) ? initial : "about", false);
}

// Add keyboard navigation for tabs (arrow keys)
tabs.forEach((tab, index) => {
  tab.addEventListener("keydown", (e) => {
    let newIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = tabs.length - 1;
    }

    if (newIndex !== undefined) {
      tabs[newIndex].focus();
      tabs[newIndex].click();
    }
  });
});
