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
});

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

/* ===== 画像が読み込めない場合のプレースホルダー ===== */
document.querySelectorAll('.works-thumb img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    img.parentElement.style.background = '#ddd9d4';
    const placeholder = document.createElement('p');
    placeholder.textContent = '画像準備中';
    placeholder.style.cssText = 'color:#999;font-size:0.85rem;font-weight:500;';
    img.parentElement.appendChild(placeholder);
  });
});
