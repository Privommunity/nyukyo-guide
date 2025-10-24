// ========================================
// DOMContentLoaded - ページ読み込み完了時の初期化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // FAQアコーディオンの初期化
    initFAQ();
    
    // スムーススクロールの設定
    initSmoothScroll();
    
    // お問い合わせフォームの設定
    initContactForm();
    
    // スクロールアニメーションの設定
    initScrollAnimations();
});

// ========================================
// FAQアコーディオン機能
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // クリックされた項目のアクティブ状態をトグル
            const isActive = item.classList.contains('active');
            
            // 全てのFAQ項目を閉じる
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // クリックされた項目が閉じていた場合は開く
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// スムーススクロール機能
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // ハッシュのみのリンク（#）は無視
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// お問い合わせフォーム処理
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // バリデーション
            if (!validateForm(formData)) {
                return;
            }
            
            // 送信ボタンの状態変更
            const submitButton = form.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
            submitButton.disabled = true;
            
            // 実際の送信処理（ここでは仮の処理）
            // 実際にはサーバーにデータを送信する処理を実装
            try {
                // 仮の遅延処理（実際のAPI呼び出しに置き換える）
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // 成功メッセージ
                showMessage('success', 'お問い合わせを受け付けました。ご連絡ありがとうございます。');
                
                // フォームのリセット
                form.reset();
                
            } catch (error) {
                // エラーメッセージ
                showMessage('error', '送信中にエラーが発生しました。もう一度お試しください。');
            } finally {
                // ボタンを元に戻す
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// ========================================
// フォームバリデーション
// ========================================
function validateForm(data) {
    // 名前のチェック
    if (!data.name.trim()) {
        showMessage('error', 'お名前を入力してください。');
        return false;
    }
    
    // メールアドレスのチェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
        showMessage('error', 'メールアドレスを入力してください。');
        return false;
    }
    if (!emailRegex.test(data.email)) {
        showMessage('error', '正しいメールアドレスを入力してください。');
        return false;
    }
    
    // お問い合わせ内容のチェック
    if (!data.message.trim()) {
        showMessage('error', 'お問い合わせ内容を入力してください。');
        return false;
    }
    
    return true;
}

// ========================================
// メッセージ表示機能
// ========================================
function showMessage(type, text) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // メッセージ要素の作成
    const message = document.createElement('div');
    message.className = `form-message form-message-${type}`;
    message.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    // メッセージのスタイル
    message.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#b8860b' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        animation: slideDown 0.3s ease-out;
    `;
    
    // スタイルシートにアニメーションを追加
    if (!document.querySelector('#message-animation-style')) {
        const style = document.createElement('style');
        style.id = 'message-animation-style';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // メッセージを表示
    document.body.appendChild(message);
    
    // 3秒後に自動で削除
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// ========================================
// スクロールアニメーション
// ========================================
function initScrollAnimations() {
    // Intersection Observer APIを使用してスクロール時のアニメーションを実装
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を設定
    const animateElements = document.querySelectorAll('.flow-step, .document-card, .cost-card, .faq-item, .notice-card, .contact-info-card');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ========================================
// ヘッダーのスクロール時の動作
// ========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール量が50px以上の場合、ヘッダーに影をつける
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ページトップへ戻るボタン（オプション）
// ========================================
function createBackToTopButton() {
    // ボタンの作成
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.title = 'ページトップへ';
    
    // スタイル
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #b8860b 0%, #daa520 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(184, 134, 11, 0.4);
    `;
    
    // クリックイベント
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // スクロール時の表示/非表示
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // ボタンを追加
    document.body.appendChild(button);
}

// ページトップボタンの初期化
createBackToTopButton();

// ========================================
// コンソールメッセージ
// ========================================
console.log('%c生活情報館 入居手続きガイド', 'color: #b8860b; font-size: 20px; font-weight: bold;');
console.log('%cご不明な点がございましたら、お気軽にお問い合わせください。', 'color: #64748b; font-size: 14px;');
