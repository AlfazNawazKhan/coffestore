# ☕ Brew Haven — Coffee Store Website

A complete, responsive coffee shop website built with **HTML5, CSS3, JavaScript (ES6+) and Bootstrap 5**.

## ✨ Features

| Section | What it does |
|---|---|
| **Hero** | Full-screen landing with parallax background, animated counters & floating info cards |
| **About** | Brand story with layered image stack and feature list |
| **Menu** | 14 products rendered dynamically from `js/products.js`, with category filters (Beans / Hot Drinks / Cold Brews / Pastries) |
| **Cart** | Slide-in offcanvas cart: add/remove items, change quantities, subtotal + free-shipping logic, persisted in `localStorage` |
| **Gallery** | Responsive photo grid with hover effects |
| **Testimonials** | Bootstrap carousel auto-generated from review data |
| **Newsletter** | Email validation with inline feedback |
| **Contact** | Validated contact form with success alert |
| **Extras** | Sticky navbar with scroll state, Bootstrap Scrollspy, toast notifications, fully responsive down to mobile |

## 🗂 Project structure

```
/workspace
├── index.html          # Single-page site markup
├── css/
│   └── style.css       # Custom theme on top of Bootstrap 5
└── js/
    ├── products.js     # Product catalog & review data
    └── main.js         # Rendering, cart logic, UI interactions
```

## 🚀 How to run

No build step required — just open the page:

```bash
# Option 1: open directly
open index.html            # macOS
xdg-open index.html        # Linux

# Option 2: serve locally (recommended so localStorage behaves per-origin)
python3 -m http.server 8000
# then visit http://localhost:8000
```

> Bootstrap 5, Bootstrap Icons and Google Fonts are loaded from CDN, so an internet connection is needed for full styling. Product images are hot-linked from Unsplash.

## 🛠 Tech choices

- **Bootstrap 5.3** — layout, components (navbar, carousel, offcanvas, toasts, grid, forms)
- **Vanilla JS** — no heavy framework needed for a static storefront; keeps the site fast and dependency-free beyond CSS
- **localStorage** — cart persistence across reloads
