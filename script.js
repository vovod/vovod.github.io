// menu for media
function showMenu() {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
}
function hideMenu() {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-150px";
}

// change color on click
var background_index = 0;
function changeBg() {
    const dir = './images/background/';
    var img = document.getElementById("header");
    var files = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
    if (background_index < files.length - 1) {
        background_index++;
    } else {
        background_index = 0;
    }
    img.style.backgroundImage = "linear-Gradient(rgba(206, 214, 247, 0.7), rgba(51, 57, 81, 0.7)), url(" + dir + files[background_index] + ")";
}
