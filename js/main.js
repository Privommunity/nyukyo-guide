// ========================================
// DOMContentLoaded - ページ読み込み完了時の初期化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // FAQアコーディオンの初期化
    initFAQ();
    
    // スムーススクロールの設定
    initSmoothScroll();
    
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
// 初期費用シミュレーション機能
// ========================================

// 入居日の最小値を今日に設定
document.addEventListener('DOMContentLoaded', function() {
    const moveInDateInput = document.getElementById('moveInDate');
    if (moveInDateInput) {
        const today = new Date().toISOString().split('T')[0];
        moveInDateInput.setAttribute('min', today);
    }
});

// 初期費用を計算する関数
function calculateCosts() {
    // 入力値の取得
    const moveInDate = document.getElementById('moveInDate').value;
    const rent = parseInt(document.getElementById('rent').value) || 0;
    const maintenance = parseInt(document.getElementById('maintenance').value) || 0;
    const deposit = parseFloat(document.getElementById('deposit').value) || 0;
    const keyMoney = parseFloat(document.getElementById('keyMoney').value) || 0;
    const parking = parseInt(document.getElementById('parking').value) || 0;
    const freeRent = document.getElementById('freeRent').checked;
    const petFee = document.getElementById('petFee').checked;
    const noAgentFee = document.getElementById('noAgentFee').checked;

    // バリデーション
    if (!moveInDate) {
        showMessage('error', '入居開始希望日を選択してください。');
        return;
    }
    if (rent <= 0) {
        showMessage('error', '賃料を入力してください。');
        return;
    }

    // 計算
    const costs = [];
    let total = 0;

    // 敷金
    const depositAmount = Math.floor(rent * deposit);
    if (depositAmount > 0) {
        costs.push({ name: '敷金', amount: depositAmount });
        total += depositAmount;
    }

    // 礼金
    const keyMoneyAmount = Math.floor(rent * keyMoney);
    if (keyMoneyAmount > 0) {
        costs.push({ name: '礼金', amount: keyMoneyAmount });
        total += keyMoneyAmount;
    }

    // 仲介手数料
    if (!noAgentFee) {
        const agentFee = Math.floor(rent * 1.1); // 賃料の1ヶ月分 + 消費税10%
        costs.push({ name: '仲介手数料', amount: agentFee });
        total += agentFee;
    }

    // 前家賃の計算
    const moveIn = new Date(moveInDate);
    const daysInMonth = new Date(moveIn.getFullYear(), moveIn.getMonth() + 1, 0).getDate();
    const remainingDays = daysInMonth - moveIn.getDate() + 1;
    const dailyRent = rent / daysInMonth;
    
    let advanceRent = 0;
    if (freeRent) {
        // フリーレントの場合、翌月分のみ
        advanceRent = rent + maintenance;
        costs.push({ name: '前家賃（翌月分）', amount: advanceRent });
    } else {
        // 日割り + 翌月分
        const dailyAmount = Math.floor(dailyRent * remainingDays);
        advanceRent = dailyAmount + maintenance + rent + maintenance;
        costs.push({ name: `前家賃（日割り${remainingDays}日分+翌月分）`, amount: advanceRent });
    }
    total += advanceRent;

    // 駐車場（翌月分も含む）
    if (parking > 0) {
        const parkingTotal = parking * 2; // 当月 + 翌月
        costs.push({ name: '駐車場（2ヶ月分）', amount: parkingTotal });
        total += parkingTotal;
    }

    // 火災保険料
    const insurance = 20000;
    costs.push({ name: '火災保険料', amount: insurance });
    total += insurance;

    // 保証会社保証料（初回）
    const monthlyTotal = rent + maintenance + parking;
    const guaranteeFee = Math.floor(monthlyTotal * 0.2); // 初回20%
    costs.push({ name: '保証会社保証料（初回20%）', amount: guaranteeFee });
    total += guaranteeFee;

    // ペット保証料
    if (petFee) {
        const petFeeAmount = rent;
        costs.push({ name: 'ペット保証料', amount: petFeeAmount });
        total += petFeeAmount;
    }

    // 結果を表示
    displayResults(costs, total);
}

// 結果を表示する関数
function displayResults(costs, total) {
    const resultDiv = document.getElementById('simulatorResult');
    const tableBody = document.getElementById('resultTableBody');
    const totalCostEl = document.getElementById('totalCost');

    // テーブルの内容をクリア
    tableBody.innerHTML = '';

    // 各項目を追加
    costs.forEach(cost => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cost.name}</td>
            <td class="text-right">${formatCurrency(cost.amount)}</td>
        `;
        tableBody.appendChild(row);
    });

    // 合計を表示
    totalCostEl.textContent = formatCurrency(total);

    // 結果エリアを表示
    resultDiv.style.display = 'block';

    // 結果エリアまでスムーススクロール
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// 通貨フォーマット関数
function formatCurrency(amount) {
    return '¥' + amount.toLocaleString('ja-JP');
}

// リセット関数
function resetSimulator() {
    // フォームをリセット
    document.getElementById('moveInDate').value = '';
    document.getElementById('rent').value = '';
    document.getElementById('maintenance').value = '0';
    document.getElementById('deposit').value = '1';
    document.getElementById('keyMoney').value = '1';
    document.getElementById('parking').value = '0';
    document.getElementById('freeRent').checked = false;
    document.getElementById('petFee').checked = false;
    document.getElementById('noAgentFee').checked = false;

    // 結果を非表示
    document.getElementById('simulatorResult').style.display = 'none';
}

// ========================================
// コンソールメッセージ
// ========================================
console.log('%c生活情報館 入居手続きガイド', 'color: #b8860b; font-size: 20px; font-weight: bold;');
console.log('%cご不明な点がございましたら、お気軽にお問い合わせください。', 'color: #64748b; font-size: 14px;');
