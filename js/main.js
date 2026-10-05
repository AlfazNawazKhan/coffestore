/* ============================================================
   Brew Haven — main.js
   Renders the menu, handles filtering, cart (localStorage),
   toasts, navbar behavior, counters and form validation.
   ============================================================ */

'use strict';

/* ---------------- Helpers ---------------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const money = (n) => `$${n.toFixed(2)}`;

/* ---------------- Product grid ---------------- */
function intensityIcons(level) {
  let out = '';
  for (let i = 1; i <= 5; i++) {
    out += `<i class="bi ${i <= level ? 'bi-fire-fill' : 'bi-fire'}"></i>`;
  }
  return out;
}

function productCard(p) {
  return `
    <div class="col-sm-6 col-lg-3 product-col fade-in-product" data-category="${p.category}">
      <article class="card product-card shadow-sm">
        <div class="product-img-wrap">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          <span class="badge-roast">${p.badge}</span>
        </div>
        <div class="product-body">
          <h5 class="mb-1">${p.name}</h5>
          <p class="product-desc mb-2">${p.desc}</p>
          <div class="intensity mb-2">Intensity: ${intensityIcons(p.intensity)}</div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="price">${money(p.price)}</span>
            <button class="add-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
              <i class="bi bi-bag-plus"></i> Add
            </button>
          </div>
        </div>
      </article>
    </div>`;
}

function renderProducts(filter = 'all') {
  const grid = $('#productGrid');
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  grid.innerHTML = list.map(productCard).join('');
}

function initFilters() {
  $('#filterBar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    $$('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
}

/* ---------------- Cart ---------------- */
const CART_KEY = 'brewhaven_cart_v1';
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartUI();
  showToast(`<i class="bi bi-check-circle-fill text-success me-2"></i>${product.name} added to cart!`, 'success');
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
}

function cartSubtotal() {
  return cart.reduce((sum, i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return p ? sum + p.price * i.qty : sum;
  }, 0);
}

function updateCartUI() {
  // badge count
  const count = cart.reduce((s, i) => s + i.qty, 0);
  $('#cartCount').textContent = count;

  // items list
  const box = $('#cartItems');
  const empty = $('#cartEmpty');
  if (cart.length === 0) {
    box.innerHTML = '';
    empty.classList.remove('d-none');
  } else {
    empty.classList.add('d-none');
    box.innerHTML = cart.map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      if (!p) return '';
      return `
        <div class="cart-item">
          <img src="${p.img}" alt="${p.name}" />
          <div class="flex-grow-1">
            <strong class="d-block small">${p.name}</strong>
            <span class="text-muted small">${money(p.price)} each</span>
            <div class="d-flex align-items-center gap-2 mt-1">
              <button class="qty-btn" data-dec="${p.id}" aria-label="Decrease quantity">−</button>
              <span class="small fw-semibold">${i.qty}</span>
              <button class="qty-btn" data-inc="${p.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="text-end">
            <div class="fw-bold small">${money(p.price * i.qty)}</div>
            <button class="remove-item small" data-remove="${p.id}" aria-label="Remove ${p.name}">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>`;
    }).join('');
  }

  // totals
  const sub = cartSubtotal();
  $('#cartSubtotal').textContent = money(sub);
  $('#cartShipping').textContent =
    sub === 0 ? '—' : sub >= 30 ? 'FREE 🎉' : money(4.99);
}

function initCartEvents() {
  // Add-to-cart buttons (event delegation on the grid)
  $('#productGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.add-btn');
    if (btn) addToCart(btn.dataset.id);
  });

  // Quantity / remove buttons inside offcanvas
  $('#cartItems').addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const rem = e.target.closest('[data-remove]');
    if (inc) changeQty(inc.dataset.inc, 1);
    if (dec) changeQty(dec.dataset.dec, -1);
    if (rem) removeItem(rem.dataset.remove);
  });

  // Open cart panel
  const cartPanelEl = $('#cartPanel');
  const cartOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartPanelEl);
  $('#cartToggle').addEventListener('click', () => cartOffcanvas.show());

  // Checkout
  $('#checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('<i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>Your cart is empty — add some coffee first!', 'warning');
      return;
    }
    const total = cartSubtotal();
    cart = [];
    saveCart();
    updateCartUI();
    cartOffcanvas.hide();
    showToast(
      `<i class="bi bi-cup-hot-fill text-success me-2"></i>Order placed! Total <strong>${money(total)}</strong>. Your beans will ship fresh within 48h. ☕`,
      'success'
    );
  });
}

/* ---------------- Toasts ---------------- */
function showToast(html, variant = 'light') {
  const wrap = document.createElement('div');
  wrap.className = `toast align-items-center text-bg-${variant} border-0`;
  wrap.setAttribute('role', 'alert');
  wrap.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${html}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  $('#toastArea').appendChild(wrap);
  const t = new bootstrap.Toast(wrap, { delay: 3200 });
  t.show();
  wrap.addEventListener('hidden.bs.toast', () => wrap.remove());
}

/* ---------------- Testimonials carousel ---------------- */
function renderReviews() {
  const track = $('#reviewTrack');
  const dots = $('#reviewDots');
  track.innerHTML = REVIEWS.map((r, idx) => {
    const stars = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
    return `
      <div class="carousel-item ${idx === 0 ? 'active' : ''}">
        <div class="review-card">
          <div class="stars">${stars}</div>
          <blockquote>“${r.text}”</blockquote>
          <img src="${r.avatar}" alt="${r.name}" class="review-avatar mx-auto d-block" />
          <div class="mt-2 fw-semibold text-white">${r.name}</div>
          <small class="opacity-75">${r.role}</small>
        </div>
      </div>`;
  }).join('');

  dots.innerHTML = REVIEWS.map((_, idx) => `
    <button type="button" data-bs-target="#reviewCarousel" data-bs-slide-to="${idx}"
      class="${idx === 0 ? 'active' : ''}" aria-label="Review ${idx + 1}"></button>`).join('');
}

/* ---------------- Navbar scroll state ---------------- */
function initNavbarScroll() {
  const nav = $('#mainNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------- Animated counters ---------------- */
function initCounters() {
  const counters = $$('.counter');
  const animate = (el) => {
    const target = +el.dataset.target;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));
}

/* ---------------- Forms ---------------- */
function initContactForm() {
  const form = $('#contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    $('#contactSuccess').classList.remove('d-none');
    form.reset();
    form.classList.remove('was-validated');
    setTimeout(() => $('#contactSuccess').classList.add('d-none'), 6000);
  });
}

function initNewsletter() {
  const form = $('#newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#newsletterEmail');
    const msg = $('#newsletterMsg');
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      msg.innerHTML = '<i class="bi bi-x-circle"></i> Please enter a valid email address.';
      msg.style.color = '#ffd9d9';
      return;
    }
    msg.innerHTML = '<i class="bi bi-check-circle"></i> You\'re in! Check your inbox for your 15% code.';
    msg.style.color = '#eaffea';
    form.reset();
  });
}

/* ---------------- Scrollspy refresh (Bootstrap) ---------------- */
function initScrollspy() {
  // Re-init after DOM ready so spy picks up section offsets correctly
  const spy = bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
    target: '#mainNav',
    rootMargin: '-25% 0px -60%',
    smoothScroll: false
  });
  spy.refresh();
  window.addEventListener('load', () => spy.refresh());
}

/* ---------------- Boot ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initFilters();
  updateCartUI();
  initCartEvents();
  renderReviews();
  initNavbarScroll();
  initCounters();
  initContactForm();
  initNewsletter();
  initScrollspy();
  $('#year').textContent = new Date().getFullYear();
});
