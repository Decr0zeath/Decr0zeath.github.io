const body = document.body;
const toggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
	body.classList.add("dark");
	toggle.textContent = "☀️ Light";
} else {
	body.classList.remove("dark");
	toggle.textContent = "🌙 Dark";
}

// Toggle on click
toggle.addEventListener("click", () => {
	body.classList.toggle("dark");

	const isDark = body.classList.contains("dark");
	localStorage.setItem("theme", isDark ? "dark" : "light");
	toggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
});
