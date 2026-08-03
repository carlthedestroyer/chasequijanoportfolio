# Project content files

Each file here (`content/projects/<slug>.md`) drives one page at `projects/<slug>.html`.
Edit the `.md` file, save, refresh the page in a browser — no HTML/JS edits needed.

**Format note:** despite the `.md` extension, each file is parsed whole as **YAML**, not
Markdown. This is deliberate: these pages have real structure (specs card, image
gallery, results callout) that plain Markdown can't express, so YAML holds that
structure. The prose *inside* YAML string fields (`summary:`, `challenges:`, etc.) is
genuine Markdown — headings (`####`), paragraphs, and `- ` lists — rendered with
marked.js.

## How rendering works

1. `projects/<slug>.html` is a thin shell: nav, footer, and `<script>` chrome are
   hardcoded (site-wide layout/CSS lives here, per the separation-of-concerns rule),
   but the header, split section, gallery, challenges, results, and nav are empty
   mount points (`#pd-header`, `#pd-split`, `#pd-gallery`, `#pd-challenges`,
   `#pd-results`, `#project-nav`).
2. `assets/js/project-render.js` fetches `content/projects/<slug>.md`, parses it with
   js-yaml, and builds the DOM for those mount points — every project page uses the
   *same* rendering logic, so the layout is identical across all of them by construction.
3. Both js-yaml and marked.js load from a CDN — no build step, no npm install. This
   means pages must be served over http(s) (e.g. `python -m http.server`, or your real
   host) — opening the HTML file directly (`file://`) will not work, because `fetch()`
   is blocked cross-origin under `file://`.

## Schema

```yaml
number: "001"                    # eyebrow number, e.g. "001 · Medical Startup"
category: "Medical Startup"
title: "Project Title"
subtitle: "Role · Org · Year"
pdfHref: "path/to/summary.pdf"   # optional — omit to hide the "Download PDF" button

domainTags: [Tag One, Tag Two]   # shown as pills under the title

summary: |                       # Executive Summary & Objective — markdown, 2-4 short paragraphs
  Paragraph one.

  Paragraph two.

specs:                           # Hardware Specs & Technical Stack card (right column)
  - label: "Microcontroller"     # keep to ~5-7 rows — datasheet-style, not prose
    value: "ESP32-C6"
  - label: "Communication"
    value: "RS-485, UART/SLIP framing"

deepDives:                       # optional — card grid linking to detailed sub-project pages
                                  # (e.g. a hub project like "exoskeleton" linking out to
                                  # "imu-sensing-system" / "test-rig-instrumentation"). Renders
                                  # right after the executive summary, using the same card styling
                                  # as the archive/homepage grids, so it reads as unmissable rather
                                  # than a buried inline link. Only add this on hub pages — sub-pages
                                  # don't need it.
  - slug: "imu-sensing-system"   # <slug>.html must exist as a real project page
    title: "IMU Sensing System"
    desc: "One or two sentences with concrete numbers — this card is often the only thing a skimming reader sees of that sub-project."
    image: "relative/path/to/image.jpg"   # same path convention as gallery[].src

gallery:                         # Visual Gallery Grid — 2 columns, ~6-10 images
  - src: "relative/path/to/image.jpg"   # resolved relative to projects/<slug>.html
    caption: "Technical caption shown under the image"
    tall: true                   # optional — use for schematics/diagrams (object-fit: contain,
                                  # auto height) instead of the default fixed-height photo crop

challenges: |                    # Engineering Challenges & Iterations — markdown
  #### Optional subheading
  Paragraph text describing failure modes, root cause analysis, and design solutions.
challengesTitle: "Optional custom heading"   # optional — defaults to a generic title

results:
  narrative: |                   # markdown, 1-2 paragraphs
    What was validated and how.
  metrics:                       # small stat row inside the callout
    - value: "400 Hz"
      label: "Sustained Sampling Rate"
  table:                         # optional — status table inside the callout
    headers: ["Subsystem", "Status"]
    rows:
      - ["Kalman-filtered tilt estimate", "Validated"]

nav:
  prev: { slug: "prev-project", title: "Prev Project Title" }
  next: { slug: "next-project", title: "Next Project Title" }
```

## Why raw image paths (not `/public/images/`)

Images live in their original per-project folders under `projects/` (e.g.
`Berta Medical/images/…`, `FOC Control Rig/Images/…` — casing varies, check the real
folder before writing a path). There's no single `/public/images/` directory in this
site, so `gallery[].src` values are just the same relative paths the old hand-built
pages already used.

## Reference implementation

`berta-medical.md` + `projects/berta-medical.html` is the full worked, verified example.
Use it as the template when converting or adding a page.

## Adding a new project page

1. Write `content/projects/<slug>.md` following the schema above.
2. Copy `projects/berta-medical.html`, rename it, and replace every `berta-medical`
   string (the `<title>`, the `renderProject('berta-medical')` call) with your new slug.
3. Add the new page to `projects/index.html`'s card grid and update `nav.prev`/`nav.next`
   on its neighbors.
