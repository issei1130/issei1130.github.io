/* ===== スクロールプログレスバー ===== */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  progressBar.style.width = (scrolled * 100) + '%';
}, { passive: true });

/* ===== ハンバーガーメニュー ===== */
const navToggle = document.querySelector('.nav-toggle');
const navList   = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('is-open');
  navList.classList.toggle('is-open');
  document.body.style.overflow = navList.classList.contains('is-open') ? 'hidden' : '';
});

navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('is-open');
    navList.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

/* ===== スクロール時にヘッダーに影 ===== */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,0.08)' : 'none';
}, { passive: true });

/* ===== ヒーロー テキストタイピング ===== */
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const lines = ['実績ゼロからのリアルな挑戦。', 'まず1件、一緒に作りましょう。'];
  let lineIndex = 0;
  let charIndex = 0;

  const type = () => {
    if (lineIndex >= lines.length) return;
    if (charIndex < lines[lineIndex].length) {
      const done = lines.slice(0, lineIndex).join('<br>');
      const current = lines[lineIndex].slice(0, charIndex + 1);
      heroSub.innerHTML = done + (lineIndex > 0 ? '<br>' : '') + current;
      charIndex++;
      setTimeout(type, 45);
    } else {
      lineIndex++;
      charIndex = 0;
      if (lineIndex < lines.length) setTimeout(type, 240);
    }
  };
  setTimeout(type, 700);
}

/* ===== スタット カウントアップ ===== */
const counters = document.querySelectorAll('.stat-num[data-target]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = parseInt(entry.target.dataset.target);
    const duration = 1200;
    const startTime = performance.now();
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      entry.target.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

/* ===== スクロールアニメーション ===== */
const fadeEls = document.querySelectorAll('.works-item, .price-card, .contact-card, .flow-item');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

/* ===== 画像エラー時プレースホルダー ===== */
document.querySelectorAll('.works-thumb img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const placeholder = document.createElement('p');
    placeholder.textContent = '画像準備中';
    placeholder.style.cssText = 'color:#999;font-size:0.85rem;font-weight:500;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);';
    img.parentElement.appendChild(placeholder);
  });
});
