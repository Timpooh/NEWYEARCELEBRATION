// Create floating hearts
function createHeart() {
    const heartsContainer = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['🤍', '🐨', '💗', '💛','⭐'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '⭐';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Create sparkles around elements
function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    element.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Open gift modal
function openGift() {
    document.getElementById('giftModal').style.display = 'block';
    // Add confetti effect
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
}

// Close gift modal
function closeGift() {
    document.getElementById('giftModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('giftModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Initialize animations
window.onload = function() {
    createStars();
    
    // Create hearts periodically
    setInterval(createHeart, 1000);
    
    // Add sparkles to cards
    const messageCard = document.querySelector('.message-card');
    setInterval(() => {
        createSparkle(messageCard);
    }, 500);
};