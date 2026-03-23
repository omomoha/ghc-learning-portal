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
      html += `<div class="content-section"><h3>${s.title}</h3>`;
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

  function buildCodeBlock(cb) {
    const id = "cb_" + Math.random().toString(36).substr(2, 8);
    return `<div class="code-block">
      <div class="code-header">
        <span class="code-lang">${cb.lang}${cb.title ? " &mdash; " + cb.title : ""}</span>
        <button class="code-copy" onclick="copyCode('${id}')">Copy</button>
      </div>
      <pre class="code-content" id="${id}">${escHtml(cb.code)}</pre>
    </div>`;
  }

  function buildAssessment(m) {
    let html = `<div class="assessment" id="assessment_${m.id}">
      <div class="assessment-header">
        <h3>&#128302; Module ${m.id} — Technical Assessment</h3>
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
      const btn = el.parentElement.querySelector(".code-copy");
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
    if (btn && m && answeredMap[moduleId].size >= m.assessment.questions.length) {
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
