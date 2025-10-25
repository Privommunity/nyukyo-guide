// ========================================
// 営業時間ステータス表示
// ========================================
function updateBusinessStatus() {
    // ヘッダー用の営業ステータス
    const statusElement = document.getElementById('businessStatus');
    
    // 新しいコンパクト営業状況カード
    const statusCard = document.getElementById('businessStatusCard');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const statusDetail = document.getElementById('statusDetail');

    const now = new Date();
    const day = now.getDay(); // 0 = 日曜, 1 = 月曜, ..., 6 = 土曜
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    // 祝日リスト（2025年）
    const holidays = [
        '2025-01-01', '2025-01-13', '2025-02-11', '2025-02-23', '2025-02-24',
        '2025-03-20', '2025-04-29', '2025-05-03', '2025-05-04', '2025-05-05',
        '2025-07-21', '2025-08-11', '2025-09-15', '2025-09-23', '2025-10-13',
        '2025-11-03', '2025-11-23', '2025-11-24'
    ];
    
    const today = now.toISOString().split('T')[0];
    const isHoliday = holidays.includes(today);
    
    // 営業時間設定
    let openTime, closeTime;
    let isWeekend = (day === 0 || day === 6);
    let isWednesday = (day === 3);
    
    if (isWeekend) {
        openTime = 10 * 60; // 10:00
        closeTime = 16 * 60; // 16:00
    } else {
        openTime = 9 * 60; // 9:00
        closeTime = 18 * 60; // 18:00
    }

    let isOpen = false;
    let mainText = '';
    let detailText = '';
    
    if (isWednesday || isHoliday) {
        // 定休日
        isOpen = false;
        mainText = '本日は定休日です';
        detailText = isHoliday ? '祝日のため休業' : '水曜定休日';
    } else if (currentTime >= openTime && currentTime < closeTime) {
        // 営業中
        isOpen = true;
        const closeHour = Math.floor(closeTime / 60);
        mainText = '営業中';
        detailText = `本日は${closeHour}:00まで営業`;
    } else {
        // 営業時間外
        isOpen = false;
        mainText = '営業時間外';
        
        if (currentTime < openTime) {
            const openHour = Math.floor(openTime / 60);
            detailText = `本日は${openHour}:00から営業`;
        } else {
            // 次の営業日を計算
            if (day === 6) { // 土曜日
                detailText = '次回は日曜 10:00から';
            } else if (day === 0) { // 日曜日
                detailText = '次回は月曜 9:00から';
            } else if (day === 2) { // 火曜日
                detailText = '次回は木曜 9:00から';
            } else if (day === 5) { // 金曜日
                detailText = '次回は土曜 10:00から';
            } else {
                detailText = '本日の営業は終了しました';
            }
        }
    }

    // コンパクトカードの更新
    if (statusCard && statusIcon && statusText && statusDetail) {
        const indicator = statusCard.querySelector('.status-indicator');
        
        if (isOpen) {
            indicator.className = 'status-indicator open';
            statusIcon.style.color = '#10b981';
        } else {
            indicator.className = 'status-indicator closed';
            statusIcon.style.color = '#ef4444';
        }
        
        statusText.textContent = mainText;
        statusDetail.textContent = detailText;
    }

    // ヘッダー用の更新（既存のコード）
    if (statusElement) {
        let statusHTML = '<i class="fas fa-circle"></i>';
        
        if (isWednesday || isHoliday) {
            statusHTML += '<span class="status-text">ただいま、定休日です（水曜・祝日定休）</span>';
            statusElement.className = 'business-status closed';
        } else if (isOpen) {
            if (isWeekend) {
                statusHTML += '<span class="status-text">ただいま、営業中です（土日 10:00〜16:00）</span>';
            } else {
                statusHTML += '<span class="status-text">ただいま、営業中です（平日 9:00〜18:00）</span>';
            }
            statusElement.className = 'business-status open';
        } else {
            statusHTML += '<span class="status-text">ただいま、営業時間外です</span>';
            statusElement.className = 'business-status closed';
        }
        
        statusElement.innerHTML = statusHTML;
    }
}

// ========================================
// モバイルメニュー
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 営業時間ステータスを更新
    updateBusinessStatus();
    // 1分ごとに更新
    setInterval(updateBusinessStatus, 60000);

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // アニメーション用のクラス
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // リンククリック時にメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
});

// ========================================
// スムーススクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // 空のハッシュや単なる#の場合はスキップ
        if (href === '#' || href === '#!') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ヘッダーのスクロール効果
// ========================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // 下にスクロールした時
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// スタイルの初期設定
header.style.transition = 'transform 0.3s ease';

// ========================================
// アクティブナビゲーション
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// スクロールアニメーション（フェードイン）
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .news-item, .company-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// ページトップに戻るボタン
// ========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gold);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(190, 175, 136, 0.4);
    z-index: 999;
    font-size: 1.2rem;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.background = 'var(--accent-gold)';
    this.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.background = 'var(--gold)';
    this.style.transform = 'translateY(0)';
});
