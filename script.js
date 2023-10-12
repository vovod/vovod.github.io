// menu for media
var navLinks = document.getElementById("navLinks");
function showMenu() {
    navLinks.style.display = "block";
    setTimeout(() => {
        navLinks.style.right = "0";
    }, 100);
}
function hideMenu() {
    navLinks.style.right = "-150px";
    setTimeout(() => {
        navLinks.style.display = "none";
    }, 1000);
}


// change color on click
var background_index = 0;
if (sessionStorage.getItem("background_index") == null) {
    sessionStorage.setItem("background_index", background_index);
} else {
    background_index = sessionStorage.getItem("background_index");
}

const dir = './images/background/';
var files = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
function changeBg() {

    var img = document.getElementById("header");

    if (background_index < files.length - 1) {
        background_index++;
    } else {
        background_index = 0;
    }
    sessionStorage.setItem("background_index", background_index);
    img.style.backgroundImage = "linear-Gradient(rgba(206, 214, 247, 0.7), rgba(51, 57, 81, 0.7)), url(" + dir + files[background_index] + ")";
}
function getBg() {
    var img = document.getElementById("header");
    var files = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
    img.style.backgroundImage = "linear-Gradient(rgba(206, 214, 247, 0.7), rgba(51, 57, 81, 0.7)), url(" + dir + files[background_index] + ")";
}
