document.addEventListener("DOMContentLoaded", function () {

    fetch("../lesson-nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("lessonNav").innerHTML = data;

            const links = document.querySelectorAll(".lesson-link");
            const currentPath = window.location.pathname;

            links.forEach(link => {
                if (link.pathname === currentPath) {
                    link.classList.add("active");
                }
            });
        })
        .catch(error => console.log("Nav load error:", error));

});