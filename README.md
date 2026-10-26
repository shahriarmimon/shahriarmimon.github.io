# Shahriar Mannan Imon Talukder - Academic & Research Portfolio

This is the source code for the personal academic website and research dossier of **Shahriar Mannan Imon Talukder**, hosted on GitHub Pages at:
👉 **[https://shahriarmimon.github.io](https://shahriarmimon.github.io)**

---

## 🌿 Overview

Designed for graduate admissions, faculty outreach, and academic dissemination. The site showcases:
* **Research Architecture:** 3 Core Pillars covering Plant Stress Biophysics & LLPS (SaProt 650M), Quantitative Breeding & Phenomics (SAU 5-generation tomato trials & Tree SHAP), and Bioactive Phytochemistry.
* **Publications & Preprints:** Filterable cards with direct DOI links, abstract previews, and one-click BibTeX citations.
* **Academic Trajectory:** Timeline of formal education (BSAg, GPA 3.99/4.00, Valedictorian) and research appointments.
* **Honours & Awards:** Syngenta Prayash National Scholarship, BARI Idea Competition Champion, and IUBAT Full Merit Waiver.
* **Referees & Contact:** Direct institutional verification links and referee contacts.

---

## 🚀 Key Features

* **Zero Build Dependencies:** Pure HTML5, modern CSS3 variables, and lightweight vanilla JavaScript. No node_modules, webpack, or build pipelines required for deployment.
* **Instant GitHub Pages Deployment:** Automatically served by GitHub Pages directly from the `main` branch.
* **Dark / Light Mode:** Built-in theme switch persisted in `localStorage` with system preference detection (`prefers-color-scheme`).
* **Interactive BibTeX Copier:** One-click copy for journal citations with toast notification.
* **Responsive & Accessible:** Fluid grid and flexbox layout optimized for desktops, tablets, and smartphones.
* **SEO & Academic Metadata:** Includes Open Graph tags, Twitter card tags, and Schema.org `Person` JSON-LD.

---

## 📁 Repository Structure

```
shahriarmimon.github.io/
├── index.html                   # Main landing page
├── 404.html                     # Custom 404 error page
├── README.md                    # Project documentation
└── assets/
    ├── css/
    │   └── style.css            # Custom CSS with light/dark theme variables
    ├── js/
    │   └── main.js              # Theme switcher, BibTeX copy, mobile navigation
    ├── docs/
    │   └── CV_Shahriar_Mannan_Imon_Talukder.pdf # Downloadable Curriculum Vitae
    └── images/
        ├── favicon.svg          # Botanical / DNA vector icon
        └── profile-avatar.svg   # Vector monogram avatar
```

---

## 🛠️ How to Edit & Update

1. **Update Profile & Bio:** Edit text in `index.html` under `<section id="about">`.
2. **Add New Publications:** Copy one of the `<article class="pub-card">` blocks inside `<section id="publications">` and fill in title, authors, DOI, and BibTeX.
3. **Update CV File:** Place your latest PDF in `assets/docs/` and keep the filename `CV_Shahriar_Mannan_Imon_Talukder.pdf`.
4. **Replace Avatar:** Drop a picture (e.g. `profile.jpg`) into `assets/images/` and change `src="assets/images/profile-avatar.svg"` to `assets/images/profile.jpg` in `index.html`.

---

## 🌐 Local Preview

You can preview the site locally simply by double-clicking `index.html` in your browser, or via Python's built-in HTTP server:

```powershell
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.
