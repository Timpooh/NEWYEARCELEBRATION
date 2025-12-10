// Music control
let isPlaying = false;
let audio = null;

function toggleMusic() {
    const btn = document.getElementById('musicToggle');
    if (!isPlaying) {
        // Note: เพิ่ม URL เพลงที่นี่ เช่น:
        // audio = new Audio('your-music-file.mp3');
        // audio.loop = true;
        // audio.play();
        btn.textContent = '🎵 หยุดเพลง';
        btn.style.background = 'linear-gradient(135deg, #ff1493, #ff69b4)';
        isPlaying = true;
    } else {
        // audio.pause();
        btn.textContent = '🎵 เปิดเพลง';
        btn.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
        isPlaying = false;
    }
}

// Countdown Timer - นับเวลาที่อยู่ด้วยกัน (ตั้งแต่วันที่...)
function updateCountdown() {
    // เปลี่ยนวันที่นี้เป็นวันที่เริ่มคบกัน
    const startDate = new Date('2024-01-01T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = now - startDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Create floating hearts
function createHeart() {
    const heartsContainer = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['🤍', '🐨', '💗', '💛','⭐'][Math.floor(Math.random() * 5)];
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

// Add new message
function addMessage() {
    const input = document.getElementById('newMessage');
    const message = input.value.trim();
    
    if (message) {
        const container = document.getElementById('messagesContainer');
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble ' + (Math.random() > 0.5 ? 'left' : 'right');
        bubble.innerHTML = `<p>${message}</p>`;
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
        input.value = '';
    }
}

// Add event listener for Enter key on message input
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('newMessage');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addMessage();
            }
        });
    }
});

// Add new wish to tree
function addWish() {
    const input = document.getElementById('newWish');
    const wish = input.value.trim();
    
    if (wish) {
        const container = document.getElementById('wishesContainer');
        const tag = document.createElement('div');
        tag.className = 'wish-tag';
        tag.textContent = '💫 ' + wish;
        tag.style.top = (Math.random() * 70 + 10) + '%';
        tag.style.left = (Math.random() * 70 + 10) + '%';
        tag.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(tag);
        input.value = '';
    }
}

// Add event listener for Enter key on wish input
document.addEventListener('DOMContentLoaded', function() {
    const wishInput = document.getElementById('newWish');
    if (wishInput) {
        wishInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addWish();
            }
        });
    }
});

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

// Fireworks effect
function launchFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height / 2;
            this.speed = Math.random() * 3 + 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        update() {
            if (this.y > this.targetY) {
                this.y -= this.speed;
            } else {
                this.explode();
                return false;
            }
            return true;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
            return this.alpha > 0;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.1) {
            fireworks.push(new Firework());
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
            if (!fireworks[i].update()) {
                fireworks.splice(i, 1);
            } else {
                fireworks[i].draw();
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].update()) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }

        if (fireworks.length > 0 || particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 10000);
}

// Animate love meter
function animateLoveMeter() {
    const loveBar = document.getElementById('loveBar');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width++;
            loveBar.style.width = width + '%';
        }
    }, 20);
}

// Title typing animation
function typeTitle() {
    const title = document.getElementById('animatedTitle');
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    const typing = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
}

// Initialize animations
window.onload = function() {
    createStars();
    typeTitle();
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Create hearts periodically
    setInterval(createHeart, 1000);
    
    // Add sparkles to cards
    const messageCard = document.querySelector('.message-card');
    setInterval(() => {
        createSparkle(messageCard);
    }, 500);

    // Animate love meter after page load
    setTimeout(animateLoveMeter, 1000);
};