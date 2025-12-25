// ========== ระบบเพลงพื้นหลัง ==========
let bgMusic = null;
let isMusicPlaying = false;

function initMusic() {
    // สร้าง audio element
    bgMusic = new Audio(/music/bgmusic.mp3); // ⚠️ เปลี่ยนชื่อไฟล์ตรงนี้ตามชื่อเพลงของคุณ
    bgMusic.loop = true; // วนซ้ำ
    bgMusic.volume = 0.3; // ระดับเสียง (0.0 - 1.0)
    
    // สร้างปุ่มควบคุมเพลง
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = `
        <button class="music-btn" id="musicBtn" title="เปิด/ปิดเพลง">
            🎵
        </button>
    `;
    document.body.appendChild(musicControl);
    
    // เพิ่มฟังก์ชันกดปุ่ม
    const musicBtn = document.getElementById('musicBtn');
    musicBtn.addEventListener('click', toggleMusic);
    
    // พยายามเล่นเพลงอัตโนมัติเมื่อโหลดหน้า
    tryAutoplay();
}

function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        bgMusic.play().catch(err => {
            console.log('ไม่สามารถเล่นเพลงได้:', err);
        });
        musicBtn.textContent = '🎶';
        musicBtn.classList.add('playing');
        isMusicPlaying = true;
    }
}

function tryAutoplay() {
    // เบราว์เซอร์ส่วนใหญ่บล็อก autoplay ดังนั้นจะเล่นเมื่อผู้ใช้คลิกที่ไหนก็ได้
    document.addEventListener('click', function playOnFirstClick() {
        if (!isMusicPlaying) {
            const musicBtn = document.getElementById('musicBtn');
            bgMusic.play().then(() => {
                musicBtn.textContent = '🎶';
                musicBtn.classList.add('playing');
                isMusicPlaying = true;
            }).catch(err => {
                console.log('รอการคลิกเพื่อเปิดเพลง');
            });
        }
        document.removeEventListener('click', playOnFirstClick);
    }, { once: true });
}

// ========== Smooth Scroll & Animation ==========
document.addEventListener('DOMContentLoaded', function() {
    // เพิ่มเอฟเฟกต์เมื่อโหลดหน้า
    console.log('🎉 Happy New Year 2026!');
    
    // เริ่มต้นระบบเพลง
    initMusic();
});

// ========== ตัวอย่าง: ฟังก์ชันสำหรับนับจำนวนหน้าที่อ่านแล้ว ==========
// (ไม่จำเป็นต้องใช้ แต่เก็บไว้เผื่ออยากเพิ่มฟีเจอร์)
function trackProgress() {
    const currentPage = window.location.pathname;
    
    // เก็บข้อมูลว่าอ่านถึงหน้าไหนแล้ว
    if (currentPage.includes('q')) {
        const pageNumber = currentPage.match(/q(\d+)/)?.[1];
        console.log(`อ่านถึงคำถามที่ ${pageNumber} แล้ว`);
    }
}

// เรียกใช้ฟังก์ชัน
trackProgress();

// ========== เพิ่ม Confetti Effect (ถ้าต้องการ) ==========
// สามารถเพิ่มลูกบอลหรือ animation พิเศษได้
function createConfetti() {
    // ตัวอย่างโค้ดสำหรับทำ confetti effect
    // สามารถเพิ่มได้ในอนาคต
}

// ========== Keyboard Navigation ==========
// กด Arrow Left/Right เพื่อไปหน้าก่อนหน้า/ถัดไป
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        const prevButton = document.querySelector('.btn-prev');
        if (prevButton) prevButton.click();
    } else if (e.key === 'ArrowRight') {
        const nextButton = document.querySelector('.btn-next');
        if (nextButton) nextButton.click();
    }
});

// ========== สุ่มสีพื้นหลัง (ถ้าต้องการ) ==========
// ตัวอย่าง: สุ่มโทนสีแต่ละครั้งที่โหลดหน้า
const warmGradients = [
    'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
    'linear-gradient(135deg, #ffe6f0 0%, #ffd4e5 100%)',
    'linear-gradient(135deg, #fff0db 0%, #ffe5c2 100%)'
];

function setRandomBackground() {
    const randomGradient = warmGradients[Math.floor(Math.random() * warmGradients.length)];
    document.body.style.background = randomGradient;
}

// เรียกใช้ฟังก์ชัน (ถ้าต้องการให้สีสุ่ม ให้เอา comment ออก)
// setRandomBackground();