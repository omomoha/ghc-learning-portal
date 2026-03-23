// ========================================================================
// APP.JS — Paginated Learning Portal
// ========================================================================
(function () {
  "use strict";

  // ===== STATE =====
  const state = {
    completedModules: new Set(),
    assessmentScores: {},
    currentIndex: 0
  };
  try {
    const saved = JSON.parse(localStorage.getItem("ghc_progress") || "{}");
    if (saved.completed) saved.completed.forEach(id => state.completedModules.add(id));
    if (saved.scores) state.assessmentScores = saved.scores;
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem("ghc_progress", JSON.stringify({
        completed: [...state.completedModules],
        scores: state.assessmentScores
      }));
    } catch (e) {}
  }

  // ===== ELEMENTS =====
  const sidebar       = document.getElementById("leftSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebarToggle  = document.getElementById("sidebarToggle");
  const homeView      = document.getElementById("homeView");
  const moduleView    = document.getElementById("moduleView");
  const modulePage    = document.getElementById("modulePage");
  const moduleFooterNav = document.getElementById("moduleFooterNav");
  const navBreadcrumb = document.getElementById("navBreadcrumb");
  const w1List        = document.getElementById("w1List");
  const w2List        = document.getElementById("w2List");
  const grid1         = document.getElementById("grid1");
  const grid2         = document.getElementById("grid2");
  const startBtn      = document.getElementById("startBtn");

  // ===== SIDEBAR TOGGLE =====
  function openSidebar()  { sidebar.classList.add("open"); sidebarOverlay.classList.add("show"); }
  function closeSidebar() { sidebar.classList.remove("open"); sidebarOverlay.classList.remove("show"); }

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });
  sidebarOverlay.addEventListener("click", closeSidebar);

  // ===== BUILD SIDEBAR LINKS =====
  MODULES.forEach((m, idx) => {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href = "#module-" + m.id;
    a.dataset.moduleId = m.id;
    const isDone = state.completedModules.has(m.id);
    a.innerHTML =
      `<span class="mod-num">${m.id}</span>` +
      `<span style="flex:1">${m.title}</span>` +
      (isDone ? '<span class="mod-check">&#10003;</span>' : "");
    if (isDone) a.classList.add("completed");
    a.addEventListener("click", (e) => {
      e.preventDefault();
      closeSidebar();
      goToModule(idx);
    });
    li.appendChild(a);
    (m.workshop === 1 ? w1List : w2List).appendChild(li);
  });

  // ===== BUILD MODULE CARDS GRID =====
  MODULES.forEach((m, i) => {
    const grid = m.workshop === 1 ? grid1 : grid2;
    const isDone = state.completedModules.has(m.id);
    const card = document.createElement("div");
    card.className = "mc-card" + (isDone ? " done" : "");
    card.dataset.idx = i;
    card.innerHTML =
      `<div class="mc-card-num">${m.id}</div>` +
      `<h4>${m.title}</h4>` +
      `<div class="mc-card-time"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ${m.time}</div>` +
      (isDone ? '<div class="mc-done-tag"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Completed</div>' : "");
    card.addEventListener("click", () => goToModule(i));
    grid.appendChild(card);
  });

  // ===== SHOW HOME =====
  window.showHome = function () {
    homeView.style.display = "block";
    moduleView.style.display = "none";
    navBreadcrumb.innerHTML = "";
    history.replaceState(null, "", "#home");
    updateSidebarActive(-1);
    updateProgress();
    refreshCards();
  };

  // ===== GO TO MODULE =====
  window.goToModule = function (index) {
    if (index < 0 || index >= MODULES.length) return;
    state.currentIndex = index;
    const m = MODULES[index];

    homeView.style.display = "none";
    moduleView.style.display = "block";

    modulePage.classList.remove("visible");
    modulePage.innerHTML = buildModulePage(m, index);
    // Strip emoji from h4 headings inside injected content HTML
    modulePage.querySelectorAll("h4").forEach(h => {
      h.textContent = stripEmoji(h.textContent);
    });
    // Wrap tables in scroll containers for mobile overflow
    modulePage.querySelectorAll("table").forEach(tbl => {
      if (!tbl.parentElement.classList.contains("table-scroll")) {
        const wrap = document.createElement("div");
        wrap.className = "table-scroll";
        tbl.parentNode.insertBefore(wrap, tbl);
        wrap.appendChild(tbl);
      }
    });
    buildFooterNav(index);
    updateProgress();
    updateSidebarActive(m.id);
    navBreadcrumb.innerHTML =
      `<a onclick="showHome()">Home</a>` +
      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>` +
      `<span>Module ${m.id}: ${m.title}</span>`;

    history.replaceState(null, "", "#module-" + m.id);
    window.scrollTo({ top: 0, behavior: "instant" });
    closeSidebar();

    setTimeout(() => modulePage.classList.add("visible"), 30);
  };

  // ===== SIDEBAR ACTIVE =====
  function updateSidebarActive(moduleId) {
    document.querySelectorAll(".sidebar-module-list a").forEach(a => {
      a.classList.toggle("active", parseInt(a.dataset.moduleId) === moduleId);
    });
  }

  // ===== REFRESH CARDS =====
  function refreshCards() {
    document.querySelectorAll(".mc-card").forEach(card => {
      const m = MODULES[parseInt(card.dataset.idx)];
      const done = state.completedModules.has(m.id);
      card.classList.toggle("done", done);
      if (done && !card.querySelector(".mc-done-tag")) {
        card.insertAdjacentHTML("beforeend",
          '<div class="mc-done-tag"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Completed</div>');
        const num = card.querySelector(".mc-card-num");
        if (num) num.style.background = "var(--success)";
      }
    });
    // refresh sidebar checkmarks
    document.querySelectorAll(".sidebar-module-list a").forEach(a => {
      const id = parseInt(a.dataset.moduleId);
      const done = state.completedModules.has(id);
      a.classList.toggle("completed", done);
      if (done && !a.querySelector(".mod-check")) {
        a.insertAdjacentHTML("beforeend", '<span class="mod-check">&#10003;</span>');
      }
    });
  }

  // ===== BUILD MODULE PAGE =====
  function buildModulePage(m, index) {
    let html = `
      <div class="module-breadcrumb">
        <a onclick="showHome()">Home</a>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        Module ${m.id} of ${MODULES.length}
      </div>
      <div class="module-header-block">
        <div class="module-ws-tag">Workshop ${m.workshop} &mdash; ${m.workshop === 1 ? "Agentic Development &amp; AI Code Review" : "Skills, MCP &amp; Enterprise Governance"}</div>
        <h1>${m.title}</h1>
        <div class="module-meta-row">
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ${m.time}</span>
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> ${m.assessment ? m.assessment.questions.length + " questions" : "No assessment"}</span>
          ${state.completedModules.has(m.id) ? '<span style="color:var(--success);font-weight:600">&#10003; Completed</span>' : ""}
        </div>
      </div>

      <div class="objectives-block">
        <h3>Learning Objectives</h3>
        <ul>${m.objectives.map(o => `<li>${o}</li>`).join("")}</ul>
      </div>`;

    m.sections.forEach(s => {
      html += `<div class="content-section"><h3>${stripEmoji(s.title)}</h3>`;
      if (s.content) html += s.content;
      if (s.codeBlocks) s.codeBlocks.forEach(cb => { html += buildCodeBlock(cb); });
      if (s.image) html += `<div class="code-image"><img src="images/${s.image}" alt="${s.title}" loading="lazy"></div>`;
      html += `</div>`;
    });

    if (m.assessment) html += buildAssessment(m);

    const done = state.completedModules.has(m.id);
    const nextIdx = index + 1;
    const hasNext = nextIdx < MODULES.length;
    html += `<button class="module-complete-btn${done ? " done" : ""}" data-module-id="${m.id}"
      onclick="markComplete(${m.id}, ${hasNext ? nextIdx : -1})">
      ${done
        ? "&#10003; Module Completed"
        : (hasNext ? "Mark Complete &amp; Continue &rarr;" : "&#127881; Complete the Course")}
    </button>`;

    return html;
  }

  // Language metadata — label badge + colours matching VS Code icon theme
  const LANG_META = {
    javascript: { label:'JS',   bg:'#f7df1e', fg:'#000' },
    js:         { label:'JS',   bg:'#f7df1e', fg:'#000' },
    typescript: { label:'TS',   bg:'#3178C6', fg:'#fff' },
    ts:         { label:'TS',   bg:'#3178C6', fg:'#fff' },
    python:     { label:'PY',   bg:'#3776AB', fg:'#fff' },
    py:         { label:'PY',   bg:'#3776AB', fg:'#fff' },
    json:       { label:'{}',   bg:'#CBCB41', fg:'#000' },
    yaml:       { label:'YML',  bg:'#CB171E', fg:'#fff' },
    yml:        { label:'YML',  bg:'#CB171E', fg:'#fff' },
    markdown:   { label:'MD',   bg:'#519ABA', fg:'#fff' },
    md:         { label:'MD',   bg:'#519ABA', fg:'#fff' },
    bash:       { label:'SH',   bg:'#4EAA25', fg:'#fff' },
    shell:      { label:'SH',   bg:'#4EAA25', fg:'#fff' },
    sh:         { label:'SH',   bg:'#4EAA25', fg:'#fff' },
    html:       { label:'HTML', bg:'#E34C26', fg:'#fff' },
    css:        { label:'CSS',  bg:'#1572B6', fg:'#fff' },
    prompt:     { label:'AI',   bg:'#C792EA', fg:'#1e1e1e' },
  };

  // Activity bar SVG icons
  const ACT_ICONS = [
    // Explorer (active)
    { svg: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>', active: true },
    // Search
    { svg: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', active: false },
    // Source control
    { svg: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>', active: false },
    // Extensions
    { svg: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>', active: false },
  ];

  const actbarHtml = ACT_ICONS.map(ic =>
    `<div class="vsc-act${ic.active ? ' vsc-active' : ''}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${ic.svg}</svg>
    </div>`
  ).join('');

  function buildCodeBlock(cb) {
    const id   = "cb_" + Math.random().toString(36).slice(2, 10);
    const meta = LANG_META[cb.lang] || { label: (cb.lang||'').slice(0,4).toUpperCase()||'TXT', bg:'#555', fg:'#fff' };

    // Extract clean filename for the tab
    const raw      = cb.title || '';
    const stripped = raw.split(' \u2014 ')[0].split(' — ')[0].trim(); // remove "— descriptor"
    const tabName  = stripped.split('/').pop() || (cb.lang + '-snippet');

    // Breadcrumb: show path segments if title has slashes, else just filename
    const bcParts = stripped.includes('/')
      ? stripped.split('/')
      : [tabName];
    const bcHtml = bcParts.map((seg, i) => {
      const isLast = i === bcParts.length - 1;
      return isLast
        ? `<span class="vsc-bc-seg vsc-bc-active">${escHtml(seg)}</span>`
        : `<span class="vsc-bc-seg">${escHtml(seg)}</span><span class="vsc-bc-arrow">›</span>`;
    }).join('');

    // Line numbers
    const lines     = cb.code.replace(/\n$/, '').split('\n');
    const lineCount = lines.length;
    const gutter    = lines.map((_, i) => `<span class="vsc-ln">${i + 1}</span>`).join('');

    return `<div class="vsc-window">
      <div class="vsc-chrome">
        <div class="vsc-dots">
          <span class="vsc-dot vsc-red"></span>
          <span class="vsc-dot vsc-yellow"></span>
          <span class="vsc-dot vsc-green"></span>
        </div>
        <span class="vsc-chrome-label">Visual Studio Code</span>
        <button class="vsc-copy" onclick="copyCode('${id}')">Copy</button>
      </div>
      <div class="vsc-layout">
        <div class="vsc-actbar">${actbarHtml}</div>
        <div class="vsc-editor-area">
          <div class="vsc-tabstrip">
            <div class="vsc-tab">
              <span class="vsc-tab-badge" style="background:${meta.bg};color:${meta.fg}">${meta.label}</span>
              <span class="vsc-tab-filename">${escHtml(tabName)}</span>
              <span class="vsc-tab-x">&times;</span>
            </div>
          </div>
          <div class="vsc-breadcrumb">${bcHtml}</div>
          <div class="vsc-editor-body">
            <div class="vsc-gutter" aria-hidden="true">${gutter}</div>
            <div class="vsc-scroll">
              <pre class="vsc-code" id="${id}">${escHtml(cb.code)}</pre>
            </div>
          </div>
        </div>
      </div>
      <div class="vsc-statusbar">
        <div class="vsc-status-left">
          <span class="vsc-status-branch">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
            main
          </span>
          <span>0 errors, 0 warnings</span>
        </div>
        <div class="vsc-status-right">
          <span>${lineCount} lines</span>
          <span>${escHtml(cb.lang)}</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
      </div>
    </div>`;
  }

  function buildAssessment(m) {
    let html = `<div class="assessment" id="assessment_${m.id}">
      <div class="assessment-header">
        <h3>Module ${m.id} — Technical Assessment</h3>
        <p>Answer all questions then click Check. Pass mark: 70%.</p>
      </div>
      <div class="assessment-body">`;
    m.assessment.questions.forEach((q, qi) => {
      const qId = `q_${m.id}_${qi}`;
      html += `<div class="question" id="${qId}">
        <div class="question-text"><span class="q-num">Q${qi + 1}.</span> ${q.text}</div>
        <div class="options">`;
      q.options.forEach((opt, oi) => {
        html += `<label class="option" data-question="${qId}" data-option="${oi}"
          onclick="selectOption('${qId}',${oi},${m.id})">
          <input type="radio" name="${qId}">
          <span class="option-radio"></span>
          <span class="option-label">${opt}</span>
        </label>`;
      });
      html += `</div>
        <div class="feedback correct-fb" id="${qId}_correct">&#9989; Correct! ${q.explanation}</div>
        <div class="feedback incorrect-fb" id="${qId}_incorrect">&#10060; Incorrect. ${q.explanation}</div>
      </div>`;
    });
    html += `<button class="check-btn" id="check_${m.id}" onclick="checkAssessment(${m.id})" disabled>Check Answers</button>
      <div class="score-display" id="score_${m.id}"></div>
      </div></div>`;
    return html;
  }

  // ===== FOOTER NAV =====
  function buildFooterNav(index) {
    const prev = index > 0 ? MODULES[index - 1] : null;
    const next = index < MODULES.length - 1 ? MODULES[index + 1] : null;

    let html = '<div class="page-nav">';

    if (prev) {
      html += `<button class="page-nav-btn prev" onclick="goToModule(${index - 1})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        <span><span class="nav-label">Previous</span><span class="nav-title">${prev.title}</span></span>
      </button>`;
    } else {
      html += `<button class="page-nav-btn prev ghost" onclick="showHome()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        <span><span class="nav-label">Back to</span><span class="nav-title">Course Overview</span></span>
      </button>`;
    }

    html += '<div class="module-dots">';
    MODULES.forEach((mod, i) => {
      const done = state.completedModules.has(mod.id);
      const cur  = i === index;
      html += `<button class="module-dot${cur ? " current" : ""}${done ? " done" : ""}"
        onclick="goToModule(${i})" title="Module ${mod.id}: ${mod.title}"></button>`;
    });
    html += "</div>";

    if (next) {
      html += `<button class="page-nav-btn next" onclick="goToModule(${index + 1})">
        <span><span class="nav-label">Next</span><span class="nav-title">${next.title}</span></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>`;
    } else {
      html += `<button class="page-nav-btn next finish" onclick="showHome()">
        <span><span class="nav-label">Back to</span><span class="nav-title">Course Overview</span></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>`;
    }

    html += "</div>";
    moduleFooterNav.innerHTML = html;
  }

  // ===== PROGRESS =====
  function updateProgress() {
    const done = state.completedModules.size;
    const pct  = Math.round((done / MODULES.length) * 100);
    const pt = document.getElementById("progressText");
    const pf = document.getElementById("progressFill");
    if (pt) pt.textContent = `${done} / ${MODULES.length}`;
    if (pf) pf.style.width = `${pct}%`;
  }

  // ===== GLOBAL HANDLERS =====
  window.copyCode = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
      const btn = el.closest(".vsc-window")?.querySelector(".vsc-copy");
      if (btn) { btn.textContent = "Copied!"; btn.classList.add("copied"); }
      setTimeout(() => { if (btn) { btn.textContent = "Copy"; btn.classList.remove("copied"); } }, 2000);
    });
  };

  const answeredMap = {};
  window.selectOption = function (qId, optIdx, moduleId) {
    document.querySelectorAll(`[data-question="${qId}"]`).forEach(o => o.classList.remove("selected"));
    const opts = document.querySelectorAll(`[data-question="${qId}"]`);
    if (opts[optIdx]) opts[optIdx].classList.add("selected");

    if (!answeredMap[moduleId]) answeredMap[moduleId] = new Set();
    answeredMap[moduleId].add(qId);

    const m   = MODULES.find(x => x.id === moduleId);
    const btn = document.getElementById("check_" + moduleId);
    if (btn && m && m.assessment && answeredMap[moduleId].size >= m.assessment.questions.length) {
      btn.disabled = false;
    }
  };

  window.checkAssessment = function (moduleId) {
    const m = MODULES.find(x => x.id === moduleId);
    if (!m || !m.assessment) return;
    let correct = 0;
    m.assessment.questions.forEach((q, qi) => {
      const qId = `q_${moduleId}_${qi}`;
      const sel = document.querySelector(`[data-question="${qId}"].selected`);
      const cEl = document.getElementById(`${qId}_correct`);
      const iEl = document.getElementById(`${qId}_incorrect`);
      if (sel) {
        const idx = parseInt(sel.dataset.option);
        if (idx === q.correct) {
          correct++;
          sel.classList.add("correct");
          cEl && cEl.classList.add("show");
          iEl && iEl.classList.remove("show");
        } else {
          sel.classList.add("incorrect");
          const all = document.querySelectorAll(`[data-question="${qId}"]`);
          if (all[q.correct]) all[q.correct].classList.add("correct");
          iEl && iEl.classList.add("show");
          cEl && cEl.classList.remove("show");
        }
      }
    });
    const total = m.assessment.questions.length;
    const pct   = Math.round((correct / total) * 100);
    const sEl   = document.getElementById("score_" + moduleId);
    if (sEl) {
      sEl.textContent = `Score: ${correct}/${total} (${pct}%) — ` +
        (pct >= 70 ? "Passed! Mark this module complete." : "Review the material and retake.");
      sEl.className = `score-display show ${pct >= 70 ? "pass" : "fail"}`;
    }
    state.assessmentScores[moduleId] = { correct, total, pct };
    saveState();
    const btn = document.getElementById("check_" + moduleId);
    if (btn) btn.disabled = true;
  };

  window.markComplete = function (moduleId, nextIndex) {
    state.completedModules.add(moduleId);
    saveState();
    const btn = document.querySelector(`.module-complete-btn[data-module-id="${moduleId}"]`);
    if (btn) { btn.classList.add("done"); btn.innerHTML = "&#10003; Module Completed"; }
    updateProgress();
    updateSidebarActive(moduleId);
    refreshCards();
    buildFooterNav(state.currentIndex);
    if (nextIndex >= 0) setTimeout(() => goToModule(nextIndex), 350);
  };

  function escHtml(t) {
    const d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  }

  // Strip leading emoji + trailing space from heading text
  function stripEmoji(str) {
    return str.replace(/^[\p{Extended_Pictographic}\uFE0F\u20E3\u200D\u{1F3FB}-\u{1F3FF}]+\s*/gu, '');
  }

  // ===== ROUTER =====
  function router() {
    const hash = window.location.hash;
    if (!hash || hash === "#" || hash === "#home") {
      showHome();
    } else if (hash.startsWith("#module-")) {
      const id  = parseInt(hash.replace("#module-", ""));
      const idx = MODULES.findIndex(m => m.id === id);
      if (idx !== -1) goToModule(idx);
      else showHome();
    }
  }

  // Start button
  if (startBtn) {
    startBtn.addEventListener("click", () => goToModule(0));
  }

  // Legacy
  window.navigateToModule = function (id) {
    const idx = MODULES.findIndex(m => m.id === id);
    if (idx !== -1) goToModule(idx);
  };

  updateProgress();
  router();
  window.addEventListener("hashchange", router);

})();
