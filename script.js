// ========== ระบบเพลงพื้นหลัง (แบบใหม่ - เล่นต่อเนื่อง) ==========
let bgMusic = null;
let isMusicPlaying = false;

function initMusic() {
    // ใช้ audio element ที่มีอยู่ใน HTML
    bgMusic = document.getElementById('bgMusic');
    
    if (!bgMusic) {
        console.error('❌ ไม่พบ audio element');
        return;
    }
    
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
    
    // ตรวจสอบว่าเพลงกำลังเล่นอยู่หรือไม่
    if (!bgMusic.paused) {
        musicBtn.textContent = '🎶';
        musicBtn.classList.add('playing');
        isMusicPlaying = true;
    }
    
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
        console.log('⏸️ หยุดเพลง');
    } else {
        bgMusic.play().then(() => {
            musicBtn.textContent = '🎶';
            musicBtn.classList.add('playing');
            isMusicPlaying = true;
            console.log('▶️ เล่นเพลง');
        }).catch(err => {
            console.log('❌ ไม่สามารถเล่นเพลงได้:', err);
        });
    }
}

function tryAutoplay() {
    // พยายามเล่นทันที
    bgMusic.play().then(() => {
        const musicBtn = document.getElementById('musicBtn');
        musicBtn.textContent = '🎶';
        musicBtn.classList.add('playing');
        isMusicPlaying = true;
        console.log('✅ เพลงเล่นอัตโนมัติสำเร็จ');
    }).catch(err => {
        console.log('⚠️ เบราว์เซอร์บล็อก autoplay - คลิกที่ไหนก็ได้เพื่อเปิดเพลง');
        
        // ถ้าเล่นอัตโนมัติไม่ได้ ให้เล่นเมื่อผู้ใช้คลิกที่ไหนก็ได้
        const playOnInteraction = function() {
            if (!isMusicPlaying && bgMusic.paused) {
                const musicBtn = document.getElementById('musicBtn');
                bgMusic.play().then(() => {
                    musicBtn.textContent = '🎶';
                    musicBtn.classList.add('playing');
                    isMusicPlaying = true;
                    console.log('✅ เพลงเริ่มเล่นหลังจากมี interaction');
                }).catch(e => {
                    console.log('❌ ยังไม่สามารถเล่นเพลงได้:', e);
                });
            }
            // ลบ event listeners หลังจากเล่นแล้ว
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
        };
        
        // ฟังหลาย events เพื่อให้แน่ใจว่าจะเล่นได้
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
    });
}

// ========== Smooth Scroll & Animation ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Happy New Year 2026!');
    
    // เริ่มต้นระบบเพลง
    initMusic();
});

// ========== ฟังก์ชันสำหรับนับจำนวนหน้าที่อ่านแล้ว ==========
function trackProgress() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('q')) {
        const pageNumber = currentPage.match(/q(\d+)/)?.[1];
        console.log(`📖 อ่านถึงคำถามที่ ${pageNumber} แล้ว`);
    }
}

trackProgress();

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