function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        console.log("Switching to light theme");
    }
    else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        console.log("Switching to dark theme");
    }
}

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
}

const toggleSwitch = document.querySelector("#theme-toggle");
toggleSwitch.addEventListener("click", toggleTheme, false);
