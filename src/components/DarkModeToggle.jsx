import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      className="btn btn-outline-light ms-2"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}
