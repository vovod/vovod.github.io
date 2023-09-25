function show_hide_element() {
    var x = document.getElementById("nav-about-hide");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}