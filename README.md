# Chase Quijano — Portfolio

## Quick Start

1. Upload this entire folder to your hosting (Vercel, Netlify, GitHub Pages, etc.)
2. That's it — no build step, no dependencies, just static HTML + CSS


## File Structure

```
portfolio/
├── index.html                  ← Homepage (glitch name, featured projects, skills, about, contact)
├── styles.css                  ← ALL styles in one file — edit this to change the whole site
├── resume.html                 ← Web-formatted resume
└── projects/
    ├── index.html              ← Filterable project archive (all 15 projects)
    ├── berta-medical.html      ← Berta Medical deep dive
    ├── exoskeleton.html        ← Exoskeleton PCB deep dive
    ├── digital-scale.html      ← Digital Scale deep dive
    ├── soft-robotics.html      ← Soft Robotics deep dive
    └── TEMPLATE.html           ← Copy this to create new project pages
```


## Things to Customize Before Going Live

Search the codebase for these and replace them:

| Find                    | Replace With                    | Files              |
|-------------------------|---------------------------------|--------------------|
| `chase@example.com`     | Your real email                 | index.html         |
| `href="#"` on GitHub    | Your GitHub URL                 | index.html, resume |
| `href="#"` on Resume    | Link to your resume PDF         | nav on all pages   |
| `href="#"` on Download  | Link to your resume PDF         | resume.html        |


## How to Change Colors

Open `styles.css` and edit the `:root` variables at the top:

```css
:root {
  --gold:        #C9983A;   /* ← Change this to change the accent color sitewide */
  --gold-bright: #DBA94A;   /* ← Slightly brighter version for hover states */
  --gold-dim:    rgba(201, 152, 58, 0.12);  /* ← Transparent version for tag backgrounds */
  --bg:          #0A0A0C;   /* ← Main background */
  --text:        #EFEDE8;   /* ← Main text color */
}
```

The entire site inherits from these variables, so changing `--gold` once changes every accent, button, tag, and label across all pages.


## How to Change Fonts

In the same `:root` block in `styles.css`:

```css
--heading: 'Outfit', -apple-system, sans-serif;   /* ← Headings + body */
--mono:    'Source Code Pro', 'SF Mono', monospace; /* ← Code/labels */
--display: 'Playfair Display', Georgia, serif;      /* ← Italic accent text */
```

If you swap these, also update the Google Fonts `@import` URL at the top of `styles.css`.


## How to Create a New Project Page

1. Copy `projects/TEMPLATE.html`
2. Rename it (e.g. `projects/ros-robot.html`)
3. Search for `TODO` in the file — there are 12 fields to fill in
4. Update the prev/next links at the bottom
5. Add it to `projects/index.html` (the archive) by copying an `archive-card` block
6. Optionally add it to the homepage grid in `index.html`

### Template Section Types

The template has 3 sections by default (Problem → Design → Results). To add more:

- Copy any `<div class="project-section">` block
- Change the `ps-label` (e.g. "Firmware", "Manufacturing", "Testing")
- Use `ps-content` for 2-column layout (text + visual)
- Use `ps-content ps-full` for full-width text only

### Visual Options in Each Section

```html
<!-- OPTION A: SVG wireframe (default) -->
<div class="ps-visual">
  <svg viewBox="0 0 300 200" fill="none" style="width:85%;">
    <!-- your SVG here -->
  </svg>
</div>

<!-- OPTION B: Architecture flow diagram -->
<div class="ps-visual">
  <div class="architecture-flow">
    <div class="arch-node">
      <div class="arch-node-title">Input</div>
      <div class="arch-node-sub">Description</div>
    </div>
    <div class="arch-arrow">→</div>
    <div class="arch-node">
      <div class="arch-node-title">Output</div>
      <div class="arch-node-sub">Description</div>
    </div>
  </div>
</div>

<!-- OPTION C: Image -->
<div class="ps-visual">
  <img src="your-image.jpg" alt="Description" style="width:100%; border-radius:4px;">
</div>
```

### Wireframe Accent Colors

Each featured project uses a different SVG stroke color for variety:

- `#C9983A` — Gold (Berta Medical)
- `#6B8EAE` — Steel Blue (Exoskeleton)
- `#D07242` — Copper (Digital Scale)
- `#5AB882` — Sage Green (Soft Robotics)

Use any of these (or pick your own) as the `stroke` color in your SVGs.


## Adding Real Images

When you have project photos, add them in two places:

1. **Featured project cards** (index.html) — Replace the `<svg>` inside `.fp-visual` with: `<img src="projects/images/your-photo.jpg" alt="..." style="width:100%; height:100%; object-fit:cover;">`

2. **Project detail pages** — Replace the `<svg>` inside `.ps-visual` with an `<img>` tag

Create a `projects/images/` folder for your photos.


## Deploying

### Vercel (recommended)
1. Push to a GitHub repo
2. Go to vercel.com → Import → Select repo
3. Deploy (zero config needed)

### Netlify
1. Drag and drop this folder onto netlify.com/drop

### GitHub Pages
1. Push to a repo
2. Settings → Pages → Deploy from branch → main → / (root)

### Custom Domain
After deploying, add your domain (e.g. chasequijano.com) in your host's settings and update DNS.
