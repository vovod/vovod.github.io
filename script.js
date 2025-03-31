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

// change media volume
document.addEventListener("click", function () {
    let audio = document.getElementById("audio");
    if (audio.volume !== 0.2) {
        audio.volume = 0.2; // Đặt volume khi user click vào trang
    }
});

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
    
    // Set audio volume
    let vid = document.getElementById("audio");
    if (vid) vid.volume = 0.85;
    
    // Fetch repositories
    fetchRepositories();
}

// GitHub Repositories Carousel
let currentSlide = 0;
let starredRepos = [];
let itemsPerSlide = 3;

// Fetch repositories from GitHub API
function fetchRepositories() {
    fetch('https://api.github.com/users/vovod/repos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(repos => {
            // Filter repos with stars > 0 and sort by stars
            starredRepos = repos.filter(repo => repo.stargazers_count > 0)
                .sort((a, b) => b.stargazers_count - a.stargazers_count);
            
            renderRepos();
            updateItemsPerSlide();
            
            // Update items per slide when window is resized
            window.addEventListener('resize', updateItemsPerSlide);
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById('repoTrack').innerHTML = 
                `<div class="loading-repos">
                    <i class="fa fa-exclamation-circle"></i> Failed to load repositories
                </div>`;
        });
}

// Update number of items per slide based on screen width
function updateItemsPerSlide() {
    const width = window.innerWidth;
    
    if (width <= 700) {
        itemsPerSlide = 1;
    } else if (width <= 900) {
        itemsPerSlide = 2;
    } else {
        itemsPerSlide = 3;
    }
    
    currentSlide = 0; // Reset to first slide when resizing
    renderRepos();
}

// Render repositories in the carousel
function renderRepos() {
    const trackElement = document.getElementById('repoTrack');
    if (!trackElement) return;
    
    // Clear the track
    trackElement.innerHTML = '';
    
    if (starredRepos.length === 0) {
        trackElement.innerHTML = `
            <div class="loading-repos">
                No starred repositories found
            </div>`;
        return;
    }
    
    // Create a card for each repository
    starredRepos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        
        // Format description (handle null case)
        const description = repo.description || 'No description available';
        
        // Format topics (show up to 3)
        let topicsHTML = '';
        if (repo.topics && repo.topics.length > 0) {
            topicsHTML = '<div class="repo-topics">' + 
                repo.topics.slice(0, 3).map(topic => 
                    `<span class="repo-topic">${topic}</span>`
                ).join('') + 
                '</div>';
        }
        
        // Format date
        const updatedDate = new Date(repo.updated_at).toLocaleDateString();
        
        // Build card HTML
        card.innerHTML = `
            <a href="${repo.html_url}" class="repo-name" target="_blank">${repo.name}</a>
            <div class="repo-desc">${description}</div>
            ${topicsHTML}
            <div class="repo-stats">
                <div class="repo-stat">
                    <i class="fa fa-star"></i> ${repo.stargazers_count}
                </div>
                <div class="repo-stat">
                    <i class="fa fa-code-fork"></i> ${repo.forks_count}
                </div>
                <div class="repo-stat">
                    <i class="fa fa-calendar"></i> ${updatedDate}
                </div>
            </div>
        `;
        
        trackElement.appendChild(card);
    });
    
    updateSlidePosition();
}

// Update slide position
function updateSlidePosition() {
    const trackElement = document.getElementById('repoTrack');
    if (!trackElement) return;
    
    const maxSlide = Math.max(0, Math.ceil(starredRepos.length / itemsPerSlide) - 1);
    
    // Ensure current slide is within valid range
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    if (currentSlide < 0) currentSlide = 0;
    
    // Calculate and apply translation
    const slideWidth = 100 / itemsPerSlide;
    const offset = currentSlide * -slideWidth * itemsPerSlide;
    trackElement.style.transform = `translateX(${offset}%)`;
    
    // Update button states (optional - can disable buttons at limits)
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    
    if (prevButton) {
        prevButton.disabled = currentSlide === 0;
        prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
    }
    
    if (nextButton) {
        nextButton.disabled = currentSlide >= maxSlide;
        nextButton.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
    }
}

// Next slide handler
function nextSlide() {
    const maxSlide = Math.ceil(starredRepos.length / itemsPerSlide) - 1;
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateSlidePosition();
    }
}

// Previous slide handler
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlidePosition();
    }
}