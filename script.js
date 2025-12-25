// ========== Smooth Scroll & Animation ==========
document.addEventListener('DOMContentLoaded', function() {
    // เพิ่มเอฟเฟกต์เมื่อโหลดหน้า
    console.log('🎉 Happy New Year 2026!');
    
    // ถ้าต้องการเพิ่มเสียง เอฟเฟกต์ หรือฟังก์ชันพิเศษ ทำได้ที่นี่
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