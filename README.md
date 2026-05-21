# ✦ Shine Native — Real Estate Website

A premium real estate website for **Shine Native** — fully static, ready to deploy on GitHub Pages.

---

## 🚀 Deploy to GitHub Pages (Step by Step)

### Option A — GitHub Web UI (Easiest)

1. Go to [github.com](https://github.com) and sign in (or create an account).
2. Click **"New repository"** (top right `+` button).
3. Name it: `shine-native` (or `yourusername.github.io` for a root domain).
4. Set visibility to **Public**.
5. Click **"Create repository"**.
6. On the next screen, click **"uploading an existing file"**.
7. Drag and drop **all files and folders** from this project:
   - `index.html`
   - `css/` (folder with `style.css` + `animations.css`)
   - `js/` (folder with `main.js`)
   - `_config.yml`
   - `README.md`
8. Click **"Commit changes"**.
9. Go to **Settings → Pages** (left sidebar).
10. Under **"Source"**, select branch: `main`, folder: `/ (root)`.
11. Click **Save**.
12. Wait ~60 seconds, then visit: `https://yourusername.github.io/shine-native/`

---

### Option B — Git CLI

```bash
# 1. Clone your new empty repo
git clone https://github.com/yourusername/shine-native.git
cd shine-native

# 2. Copy all project files into this folder

# 3. Push to GitHub
git add .
git commit -m "✦ Initial Shine Native launch"
git push origin main

# 4. Enable GitHub Pages in repo Settings → Pages → Branch: main
```

---

## 📁 File Structure

```
shine-native/
├── index.html          ← Main page (all sections)
├── css/
│   ├── style.css       ← Core styles, layout, components
│   └── animations.css  ← Keyframes, scroll reveal, transitions
├── js/
│   └── main.js         ← All interactivity (cursor, nav, counters, etc.)
├── _config.yml         ← GitHub Pages config
└── README.md           ← This file
```

---

## ✨ Features

- **Hero section** with animated orbs, stats counter, and floating property card
- **Property listings** with category filter (All / Residential / Luxury / Commercial)
- **Services grid** with 6 real estate service cards
- **About section** with stacked image layout
- **Testimonials** slider with auto-advance and touch/swipe support
- **CTA section** with forest green background
- **Contact form** with validation and success state
- **Sticky navigation** that changes on scroll
- **Mobile hamburger menu** with staggered animation
- **Custom cursor** with follower effect (desktop only)
- **Scroll reveal** animations throughout
- **Marquee band** between hero and properties
- **Page loader** on initial visit
- **Fully responsive** — mobile, tablet, desktop

---

## 🎨 Brand

| Token | Value |
|-------|-------|
| Primary Gold | `#C9A84C` |
| Forest Green | `#2D4A3E` |
| Charcoal | `#1C1C1E` |
| Cream | `#F5F0E8` |
| Display Font | Playfair Display |
| Body Font | DM Sans |
| Fine Font | Cormorant Garamond |

---

## 📝 Customization

- **Contact form**: Connect to [Formspree](https://formspree.io) or [Netlify Forms](https://docs.netlify.com/forms/setup/) for real email delivery.
- **Property images**: Replace the CSS gradient backgrounds in `style.css` with real `background-image: url(...)` references.
- **Phone / Email**: Update in `index.html` in the contact section.
- **Social links**: Update `href="#"` anchors in the footer.

---

*Built with care for Shine Native Real Estate — Est. 2015*
