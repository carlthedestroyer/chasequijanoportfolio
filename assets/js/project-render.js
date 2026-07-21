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
    mount.innerHTML =
      '<a href="../projects/" class="project-back">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>' +
        'All Projects' +
      '</a>' +
      '<div class="project-hero-number">' + escapeHtml(data.number) + ' · ' + escapeHtml(data.category) + '</div>' +
      '<h1 class="project-hero-title">' + escapeHtml(data.title) + '</h1>' +
      '<div class="project-hero-subtitle">' + escapeHtml(data.subtitle) + '</div>' +
      '<div class="project-hero-tags">' + tagsHtml(data.domainTags) + '</div>' +
      (pdfBtn ? '<div class="pd-actions">' + pdfBtn + '</div>' : '');
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

  function renderGallery(images, mount) {
    if (!images || !images.length) { mount.innerHTML = ''; mount.style.display = 'none'; return; }
    mount.className = 'gallery-grid' + (images.length === 1 ? ' gallery-full' : '');
    mount.innerHTML = images.map(function (img) {
      var figClass = 'gallery-figure' + (img.tall ? ' gallery-tall' : '');
      return (
        '<figure class="' + figClass + '">' +
          '<img src="' + escapeHtml(img.src) + '" alt="' + escapeHtml(img.alt || img.caption || '') + '" loading="lazy" />' +
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
    var galleryMount = document.getElementById('pd-gallery');
    var challengesMount = document.getElementById('pd-challenges');
    var resultsMount = document.getElementById('pd-results');
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
    if (galleryMount) renderGallery(data.gallery, galleryMount);
    if (challengesMount) renderChallenges(data, challengesMount);
    if (resultsMount) renderResults(data, resultsMount);
    if (navMount) renderNav(data.nav, navMount);
  }

  window.renderProject = renderProject;
})();
