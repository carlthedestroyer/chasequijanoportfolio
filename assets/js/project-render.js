/*
 * Client-side project page renderer.
 *
 * Each project page (projects/<slug>.html) is a thin shell: nav/footer/scripts
 * stay hardcoded in the HTML (site chrome), but the header and section content
 * are mounted at runtime from content/projects/<slug>.md.
 *
 * Content files are YAML (the ".md" extension is kept for the "markdown
 * content files" convention the site's editing workflow expects — see
 * content/projects/README.md for the schema). Prose fields inside that YAML
 * are plain Markdown and are rendered with marked.js.
 *
 * Requires (loaded via CDN before this script, see any projects/*.html head):
 *   - js-yaml   (window.jsyaml)
 *   - marked    (window.marked)
 */

(function () {
  'use strict';

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function md(text) {
    if (!text) return '';
    return window.marked.parse(text, { headerIds: false, mangle: false });
  }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    for (var k in attrs || {}) {
      if (attrs[k] == null) continue;
      node.setAttribute(k, attrs[k]);
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function tagsHtml(tags) {
    return (tags || []).map(function (t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join('');
  }

  function renderHeader(data, mount) {
    var pdfBtn = data.pdfHref
      ? '<a href="' + escapeHtml(data.pdfHref) + '" class="btn btn-secondary" download>Download 1-Page PDF Summary</a>'
      : '';
    var repoBtn = data.repoHref
      ? '<a href="' + escapeHtml(data.repoHref) + '" class="btn btn-secondary" target="_blank" rel="noopener">View Code on GitHub</a>'
      : '';
    var pubBadge = (data.publications && data.publications.badge)
      ? '<span class="tag tag-accent">' + escapeHtml(data.publications.badge) + '</span>'
      : '';
    mount.innerHTML =
      '<a href="../projects/" class="project-back">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>' +
        'All Projects' +
      '</a>' +
      '<div class="project-hero-number">' + escapeHtml(data.number) + ' · ' + escapeHtml(data.category) + '</div>' +
      '<h1 class="project-hero-title">' + escapeHtml(data.title) + '</h1>' +
      '<div class="project-hero-subtitle">' + escapeHtml(data.subtitle) + '</div>' +
      '<div class="project-hero-tags">' + tagsHtml(data.domainTags) + pubBadge + '</div>' +
      ((pdfBtn || repoBtn) ? '<div class="pd-actions">' + repoBtn + pdfBtn + '</div>' : '');
  }

  function renderDemoVideo(demo, mount) {
    if (!demo || !demo.src) { mount.innerHTML = ''; mount.style.display = 'none'; return; }
    mount.innerHTML =
      '<div class="pd-demo-label">Demo</div>' +
      '<div class="pd-demo-frame">' +
        '<video class="pd-demo-video" src="' + escapeHtml(demo.src) + '"' +
        (demo.poster ? ' poster="' + escapeHtml(demo.poster) + '"' : '') +
        (demo.caption ? ' aria-describedby="pd-demo-caption-text"' : '') +
        ' controls muted loop playsinline preload="metadata"' +
        ' onerror="this.parentElement.classList.add(\'media-missing\')"></video>' +
      '</div>' +
      (demo.caption ? '<div class="pd-demo-caption" id="pd-demo-caption-text">' + escapeHtml(demo.caption) + '</div>' : '');
  }

  function renderConfigVideos(data, mount) {
    var videos = data.configVideos;
    if (!videos || !videos.length) { mount.innerHTML = ''; mount.style.display = 'none'; return; }
    mount.innerHTML =
      '<div class="pd-section-label">' + escapeHtml(data.configVideosLabel || 'Demonstrations') + '</div>' +
      '<h2 class="pd-section-title">' + escapeHtml(data.configVideosTitle || 'Configuration Demonstrations') + '</h2>' +
      '<div class="config-video-grid">' +
      videos.map(function (v) {
        return (
          '<div class="config-video-card">' +
            '<div class="config-video-frame">' +
              '<video src="' + escapeHtml(v.src) + '"' +
              (v.poster ? ' poster="' + escapeHtml(v.poster) + '"' : '') +
              ' controls muted loop playsinline preload="metadata"' +
              ' onerror="this.parentElement.classList.add(\'media-missing\')"></video>' +
            '</div>' +
            (v.caption ? '<div class="config-video-caption">' + escapeHtml(v.caption) + '</div>' : '') +
          '</div>'
        );
      }).join('') +
      '</div>';
  }

  function renderLiveDemo(demo, mount) {
    if (!demo || !demo.src) { mount.innerHTML = ''; mount.style.display = 'none'; return; }
    mount.innerHTML =
      '<div class="pd-demo-label">' + escapeHtml(demo.label || 'Interactive Demo') + '</div>' +
      '<div class="pd-iframe-frame" style="' + (demo.height ? ('height:' + escapeHtml(demo.height) + ';') : '') + '">' +
        '<iframe src="' + escapeHtml(demo.src) + '" loading="lazy" ' +
        'title="' + escapeHtml(demo.caption || 'Interactive demo') + '" ' +
        'onerror="this.parentElement.classList.add(\'media-missing\')"></iframe>' +
      '</div>' +
      (demo.caption ? '<div class="pd-demo-caption">' + escapeHtml(demo.caption) + '</div>' : '');
  }

  function renderModel3d(model, mount) {
    if (!model || !model.src) { mount.innerHTML = ''; mount.style.display = 'none'; return; }
    mount.innerHTML =
      '<div class="pd-demo-label">3D Model</div>' +
      '<div class="pd-model-frame">' +
        '<model-viewer src="' + escapeHtml(model.src) + '"' +
        (model.poster ? ' poster="' + escapeHtml(model.poster) + '"' : '') +
        (model.caption ? ' aria-describedby="pd-model-caption-text"' : '') +
        ' camera-controls auto-rotate shadow-intensity="0.8" shadow-softness="0.75"' +
        ' exposure="0.85" tone-mapping="neutral" environment-image="neutral"' +
        ' loading="lazy" reveal="auto"' +
        ' alt="' + escapeHtml(model.caption || '3D model') + '">' +
          '<div slot="error" class="pd-model-error">3D model — coming soon</div>' +
        '</model-viewer>' +
      '</div>' +
      (model.caption ? '<div class="pd-demo-caption" id="pd-model-caption-text">' + escapeHtml(model.caption) + '</div>' : '');
  }

  function renderSplit(data, mount) {
    var specsRows = (data.specs || []).map(function (s) {
      return '<div class="specs-row"><span class="specs-row-label">' + escapeHtml(s.label) + '</span><span class="specs-row-value">' + escapeHtml(s.value) + '</span></div>';
    }).join('');

    mount.innerHTML =
      '<div>' +
        '<div class="pd-summary-label">Executive Summary &amp; Objective</div>' +
        '<div class="pd-summary">' + md(data.summary) + '</div>' +
      '</div>' +
      '<div class="specs-card card">' +
        '<div class="specs-card-title">Hardware Specs &amp; Technical Stack</div>' +
        specsRows +
      '</div>';
  }

  function renderDeepDives(deepDives, mount) {
    if (!deepDives || !deepDives.length) { mount.innerHTML = ''; mount.style.display = 'none'; return; }
    mount.innerHTML =
      '<div class="pd-section-label">Deep Dives</div>' +
      '<h2 class="pd-section-title">Detailed Write-Ups on This Program</h2>' +
      '<div class="project-card-grid">' +
      deepDives.map(function (d) {
        return (
          '<a href="' + escapeHtml(d.slug) + '.html" class="project-card card">' +
            '<div class="project-card-img-wrap"><img class="project-card-img" src="' + escapeHtml(d.image) + '" alt="' + escapeHtml(d.title) + '" loading="lazy" /></div>' +
            '<div class="project-card-body">' +
              '<h3 class="project-card-title">' + escapeHtml(d.title) + '</h3>' +
              '<p class="project-card-desc">' + escapeHtml(d.desc) + '</p>' +
              '<span class="project-card-link">Read Technical Breakdown →</span>' +
            '</div>' +
          '</a>'
        );
      }).join('') +
      '</div>';
  }

  function renderGallery(images, mount) {
    if (!images || !images.length) { mount.innerHTML = ''; mount.style.display = 'none'; return; }
    mount.className = 'gallery-grid' + (images.length === 1 ? ' gallery-full' : '');
    mount.innerHTML = images.map(function (img) {
      var figClass = 'gallery-figure' + (img.tall ? ' gallery-tall' : '');
      return (
        '<figure class="' + figClass + '">' +
          '<img src="' + escapeHtml(img.src) + '" alt="' + escapeHtml(img.alt || img.caption || '') + '" loading="lazy" ' +
          'onerror="this.parentElement.classList.add(\'media-missing\')" />' +
          (img.caption ? '<figcaption>' + escapeHtml(img.caption) + '</figcaption>' : '') +
        '</figure>'
      );
    }).join('');
  }

  function renderChallenges(data, mount) {
    if (!data.challenges) { mount.style.display = 'none'; return; }
    mount.innerHTML =
      '<div class="pd-section-label">Engineering Challenges &amp; Iterations</div>' +
      '<h2 class="pd-section-title">' + escapeHtml(data.challengesTitle || 'Failure Modes, Root Causes, and Design Iteration') + '</h2>' +
      '<div class="pd-section-body">' + md(data.challenges) + '</div>';
  }

  function renderResults(data, mount) {
    var results = data.results;
    if (!results) { mount.style.display = 'none'; return; }

    var metricsHtml = (results.metrics || []).map(function (m) {
      return '<div><div class="results-metric-value">' + escapeHtml(m.value) + '</div><div class="results-metric-label">' + escapeHtml(m.label) + '</div></div>';
    }).join('');

    var tableHtml = '';
    if (results.table && results.table.rows && results.table.rows.length) {
      tableHtml =
        '<table class="results-table"><thead><tr>' +
        (results.table.headers || []).map(function (h) { return '<th>' + escapeHtml(h) + '</th>'; }).join('') +
        '</tr></thead><tbody>' +
        results.table.rows.map(function (row) {
          return '<tr>' + row.map(function (cell) { return '<td>' + escapeHtml(cell) + '</td>'; }).join('') + '</tr>';
        }).join('') +
        '</tbody></table>';
    }

    mount.innerHTML =
      '<div class="pd-section-label">Quantitative Results &amp; Validation</div>' +
      '<h2 class="pd-section-title">Performance Against Spec</h2>' +
      '<div class="results-callout">' +
        '<div class="results-callout-label">Results</div>' +
        (results.narrative ? '<div class="results-callout-body">' + md(results.narrative) + '</div>' : '') +
        (metricsHtml ? '<div class="results-metrics">' + metricsHtml + '</div>' : '') +
        tableHtml +
      '</div>';
  }

  function renderPublications(data, mount) {
    var pubs = data.publications;
    if (!pubs || !pubs.items || !pubs.items.length) { mount.style.display = 'none'; return; }
    var itemsHtml = pubs.items.map(function (p) {
      return '<li>' + escapeHtml(p.authors) + ', "' + escapeHtml(p.title) + '," <em>' + escapeHtml(p.venue) + '</em>.</li>';
    }).join('');
    mount.innerHTML =
      '<div class="pd-section-label">Publications</div>' +
      '<h2 class="pd-section-title">' + escapeHtml(pubs.sectionTitle || 'Research Group Publications') + '</h2>' +
      '<div class="pd-section-body">' +
        (pubs.note ? '<p>' + escapeHtml(pubs.note) + '</p>' : '') +
        '<ol class="publications-list">' + itemsHtml + '</ol>' +
      '</div>';
  }

  function renderNav(nav, mount) {
    if (!nav) { mount.innerHTML = ''; return; }
    var html = '';
    if (nav.prev) {
      html +=
        '<a href="' + escapeHtml(nav.prev.slug) + '.html">← Previous' +
        '<span class="project-nav-title">' + escapeHtml(nav.prev.title) + '</span></a>';
    } else {
      html += '<span></span>';
    }
    if (nav.next) {
      html +=
        '<a href="' + escapeHtml(nav.next.slug) + '.html" class="next">Next Project →' +
        '<span class="project-nav-title">' + escapeHtml(nav.next.title) + '</span></a>';
    }
    mount.innerHTML = html;
  }

  async function renderProject(slug) {
    var headerMount = document.getElementById('pd-header');
    var splitMount = document.getElementById('pd-split');
    var demoMount = document.getElementById('pd-demo');
    var deepDivesMount = document.getElementById('pd-deepdives');
    var configVideosMount = document.getElementById('pd-configvideos');
    var liveDemoMount = document.getElementById('pd-livedemo');
    var galleryMount = document.getElementById('pd-gallery');
    var modelMount = document.getElementById('pd-model');
    var challengesMount = document.getElementById('pd-challenges');
    var resultsMount = document.getElementById('pd-results');
    var publicationsMount = document.getElementById('pd-publications');
    var navMount = document.getElementById('project-nav');

    var res = await fetch('../content/projects/' + slug + '.md');
    if (!res.ok) {
      throw new Error('Failed to load content for "' + slug + '": ' + res.status);
    }
    var raw = await res.text();
    var data = window.jsyaml.load(raw);

    document.title = data.title + ' - Chase Quijano';

    if (headerMount) renderHeader(data, headerMount);
    if (splitMount) renderSplit(data, splitMount);
    if (demoMount) renderDemoVideo(data.demoVideo, demoMount);
    if (deepDivesMount) renderDeepDives(data.deepDives, deepDivesMount);
    if (configVideosMount) renderConfigVideos(data, configVideosMount);
    if (liveDemoMount) renderLiveDemo(data.liveDemo, liveDemoMount);
    if (galleryMount) renderGallery(data.gallery, galleryMount);
    if (modelMount) renderModel3d(data.model3d, modelMount);
    if (challengesMount) renderChallenges(data, challengesMount);
    if (resultsMount) renderResults(data, resultsMount);
    if (publicationsMount) renderPublications(data, publicationsMount);
    if (navMount) renderNav(data.nav, navMount);
  }

  window.renderProject = renderProject;
})();
