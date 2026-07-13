/* ══════════════════════════════════════════════════════
   John Gil Mayor — Portfolio Script  v5.0
   Full overhaul: Events tab, Python viewer, Depth effect,
   Org carousel, Updated nav tabs, Air reveal observer
   ══════════════════════════════════════════════════════ */

/* ── Year ──────────────────────────────────────────── */
document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());

/* ══════════════════════════════════════════════════════
   SIMPLE MODE — TAB SYSTEM  (defined first)
   ══════════════════════════════════════════════════════ */
const airRevealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('s-visible');
      airRevealObserver.unobserve(e.target);
    }
  });
}, { threshold: .1, rootMargin: '0px 0px -30px 0px' });

function activateSimpleTab(tabId) {
  document.querySelectorAll('.s-tab-panel').forEach(p => p.classList.remove('s-active'));
  document.querySelectorAll('.snav-tab, .sftab').forEach(b => b.classList.remove('active'));

  const panel = document.getElementById('stab-' + tabId);
  if (panel) {
    panel.classList.add('s-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger s-reveal elements in this panel
    setTimeout(() => {
      panel.querySelectorAll('.s-reveal').forEach(el => {
        airRevealObserver.observe(el);
      });
      // Re-trigger skill bars
      if (tabId === 'about') {
        setTimeout(() => {
          panel.querySelectorAll('.s-bar-fill').forEach(f => {
            f.style.width = '0';
            setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 80);
          });
        }, 100);
      }
    }, 80);
  }

  document.querySelectorAll(`[data-stab="${tabId}"]`).forEach(el => {
    if (el.classList.contains('snav-tab') || el.classList.contains('sftab')) {
      el.classList.add('active');
    }
  });
}

// Delegate all [data-stab] clicks
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-stab]');
  if (!trigger) return;
  activateSimpleTab(trigger.dataset.stab);
});

// Navigate home when clicking brand logo
document.addEventListener('click', e => {
  const brand = e.target.closest('.jonvoyor-brand');
  if (brand) {
    if (ModeManager && ModeManager.getCurrentMode() === 'dev') {
      if (typeof activateDevTab === 'function') activateDevTab('home');
    } else {
      if (typeof activateSimpleTab === 'function') activateSimpleTab('home');
    }
  }
});

/* ══════════════════════════════════════════════════════
   DRAWER LINKS  (updates based on mode)
   ══════════════════════════════════════════════════════ */
function updateDrawerLinks(mode) {
  const container = document.getElementById('drawerLinks');
  if (!container) return;

  // SVG icon helpers
  const icons = {
    home: `<svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
    about: `<svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
    events: `<svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    works: `<svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    contact: `<svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  };

  const socials = `
    <div class="drawer-socials">
      <a href="https://www.facebook.com/JgTrek/" target="_blank" rel="noopener" class="drawer-social-link" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
      </a>
      <a href="https://www.instagram.com/jm_voyor/" target="_blank" rel="noopener" class="drawer-social-link" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/john-myr22/" target="_blank" rel="noopener" class="drawer-social-link" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
    </div>`;

  const resumeIcon = `<svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  const resumeLink = `<a href="file sources/JohnGilMayor_Resume.pdf" download="JohnGilMayor_Resume.pdf" class="drawer-resume-link" data-close>${resumeIcon}Download Resume</a>`;

  if (mode === 'dev') {
    container.innerHTML = `
      <button class="drawer-link" data-tab="home"    data-close>${icons.home}Home</button>
      <button class="drawer-link" data-tab="about"   data-close>${icons.about}About</button>
      <button class="drawer-link" data-tab="events"  data-close>${icons.events}Events</button>
      <button class="drawer-link" data-tab="works"   data-close>${icons.works}Works</button>
      <button class="drawer-link btn-drawer" data-tab="contact" data-close>${icons.contact}Get in Touch</button>
      ${resumeLink}
      ${socials}`;
  } else {
    container.innerHTML = `
      <button class="drawer-link" data-stab="home"    data-close>${icons.home}Home</button>
      <button class="drawer-link" data-stab="about"   data-close>${icons.about}About</button>
      <button class="drawer-link" data-stab="works"   data-close>${icons.works}Works</button>
      <button class="drawer-link btn-drawer" data-stab="contact" data-close>${icons.contact}Get in Touch</button>
      ${resumeLink}
      ${socials}`;
  }
}

/* ══════════════════════════════════════════════════════
   MODE MANAGER
   ══════════════════════════════════════════════════════ */
const ModeManager = (() => {
  const html       = document.documentElement;
  const curtain    = document.getElementById('modeCurtain');
  const modeToggle = document.getElementById('modeToggle');

  let currentMode = localStorage.getItem('jg-mode') || 'air';
  if (currentMode === 'simple') {
    currentMode = 'air';
    localStorage.setItem('jg-mode', 'air');
  }

  let transitioning = false;

  function applyMode(mode, skipTransition) {
    html.setAttribute('data-mode', mode);
    currentMode = mode;
    localStorage.setItem('jg-mode', mode);
    updateDrawerLinks(mode);

    ['cursorDot','cursorRing','cursorTrail'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.opacity = mode === 'dev' ? '1' : '0';
    });

    // Clear any accessibility filter classes from BOTH content layers on switch
    // so filters don't bleed across modes (e.g. contrast persisting into Air Mode)
    const filterCls = ['acc-grayscale','acc-invert','acc-hi-con','acc-cb-prot','acc-cb-deut','acc-cb-trit'];
    ['devMode','airMode'].forEach(id => {
      const el = document.getElementById(id);
      if (el) filterCls.forEach(c => el.classList.remove(c));
    });
    // Also reset saved accessibility filter state so it doesn't reload on next visit
    try {
      const saved = JSON.parse(localStorage.getItem('acc_v2') || '{}');
      if (saved.fw) { Object.keys(saved.fw).forEach(k => { saved.fw[k] = false; }); }
      if (saved.cbIdx) saved.cbIdx = 0;
      localStorage.setItem('acc_v2', JSON.stringify(saved));
    } catch(_) {}

    if (mode === 'air') {
      setTimeout(() => activateSimpleTab('home'), 50);
    }

    document.dispatchEvent(new CustomEvent('jg-mode-applied', {
      detail: { mode, initial: !!skipTransition }
    }));
  }

  function switchTo(newMode) {
    if (transitioning || newMode === currentMode) return;
    transitioning = true;

    curtain.classList.remove('opening');
    curtain.classList.add('closing');

    setTimeout(() => {
      applyMode(newMode, false);

      if (newMode === 'air') {
        if (typeof window.playAirIntro === 'function') {
          window.playAirIntro();
        }
      }

      if (newMode === 'dev') {
        if (typeof window.playDevIntro === 'function') {
          window.playDevIntro();
        }
      }

      curtain.classList.remove('closing');
      curtain.classList.add('opening');

      setTimeout(() => {
        curtain.classList.remove('opening');
        transitioning = false;
      }, 400);
    }, 350);
  }

  function init() {
    applyMode(currentMode, true);

    const switchModeFn = () => switchTo(currentMode === 'dev' ? 'air' : 'dev');

    if (modeToggle) {
      modeToggle.addEventListener('click', switchModeFn);
    }
    
    const modeToggleMobile = document.getElementById('modeToggleMobile');
    if (modeToggleMobile) {
      modeToggleMobile.addEventListener('click', switchModeFn);
    }
  }


  function getCurrentMode() { return currentMode; }

  return { init, getCurrentMode, switchTo };
})();

/* ══════════════════════════════════════════════════════
   MODE SUGGESTION POPOUT — 10s hint to try the other mode
   ══════════════════════════════════════════════════════ */
(function initModeTipPopout() {
  const popout   = document.getElementById('modeTipPopout');
  const btn      = document.getElementById('modeTipBtn');
  const closeBtn = document.getElementById('modeTipClose');
  const infoBtn  = document.getElementById('modeTipInfo');
  const descEl   = document.getElementById('modeTipDesc');
  const toggle   = document.getElementById('modeToggle');
  if (!popout || !btn || !toggle || !descEl) return;

  const SHOW_MS = 10000;
  let hideTimer = null;
  let showTimer = null;
  let pendingMode = 'air';

  const MODE_INFO = {
    air: '<strong>Air Mode</strong> is corporate-focused — best for hiring teams, HR, and recruiters.',
    dev: '<strong>Dev Mode</strong> is built for IT teams, tech enthusiasts, and developer audiences.'
  };

  function otherMode() {
    return ModeManager.getCurrentMode() === 'dev' ? 'air' : 'dev';
  }

  function modeLabel(mode) {
    return mode === 'dev' ? 'Dev Mode' : 'Air Mode';
  }

  function closeDesc() {
    descEl.hidden = true;
    descEl.innerHTML = '';
    if (infoBtn) {
      infoBtn.classList.remove('is-active');
      infoBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleDesc() {
    if (!descEl.hidden) {
      closeDesc();
      positionTip();
      return;
    }
    descEl.innerHTML = MODE_INFO[pendingMode] || '';
    descEl.hidden = false;
    if (infoBtn) {
      infoBtn.classList.add('is-active');
      infoBtn.setAttribute('aria-expanded', 'true');
    }
    positionTip();
  }

  function positionTip() {
    const rect = toggle.getBoundingClientRect();
    const gap = 10;
    const margin = 12;
    const width = popout.offsetWidth || Math.min(300, window.innerWidth - 24);
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
    popout.style.left = left + 'px';
    popout.style.top = (rect.bottom + gap) + 'px';
    const tailX = rect.left + rect.width / 2 - left - 8;
    popout.style.setProperty('--mode-tip-tail-x', Math.max(18, Math.min(tailX, width - 26)) + 'px');
  }

  function hideTip() {
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    closeDesc();
    if (popout.hidden) return;
    popout.classList.add('is-hiding');
    popout.classList.remove('is-visible');
    setTimeout(() => {
      popout.hidden = true;
      popout.classList.remove('is-hiding');
    }, 360);
  }

  function showTip() {
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    const target = otherMode();
    pendingMode = target;
    btn.textContent = 'Try ' + modeLabel(target);
    btn.dataset.targetMode = target;
    closeDesc();
    if (infoBtn) {
      infoBtn.setAttribute('aria-label', 'Learn about ' + modeLabel(target));
      infoBtn.setAttribute('aria-expanded', 'false');
    }
    popout.hidden = false;
    popout.classList.remove('is-hiding');
    positionTip();
    void popout.offsetWidth;
    popout.classList.add('is-visible');
    hideTimer = setTimeout(hideTip, SHOW_MS);
  }

  function scheduleTip(delay) {
    clearTimeout(showTimer);
    showTimer = setTimeout(showTip, delay);
  }

  btn.addEventListener('click', () => {
    const target = btn.dataset.targetMode;
    hideTip();
    if (target) ModeManager.switchTo(target);
  });
  closeBtn && closeBtn.addEventListener('click', hideTip);
  infoBtn && infoBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleDesc();
  });
  window.addEventListener('resize', () => {
    if (!popout.hidden) positionTip();
  });

  document.addEventListener('jg-mode-applied', e => {
    const { mode, initial } = e.detail || {};
    if (initial) {
      const key = 'jg-mode-tip-' + mode;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
      scheduleTip(2800);
    } else {
      scheduleTip(900);
    }
  });
})();

/* ══════════════════════════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════════════════════════ */
(function initCursor() {
  const dot   = document.getElementById('cursorDot');
  const ring  = document.getElementById('cursorRing');
  const trail = document.getElementById('cursorTrail');
  if (!dot) return;

  let mx=-200, my=-200, rx=-200, ry=-200, tx=-200, ty=-200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  (function animCursor() {
    rx += (mx-rx)*.18; ry += (my-ry)*.18;
    tx += (mx-tx)*.08; ty += (my-ty)*.08;
    ring.style.left  = rx+'px'; ring.style.top  = ry+'px';
    trail.style.left = tx+'px'; trail.style.top = ty+'px';
    requestAnimationFrame(animCursor);
  })();

  const sel = 'a, button, .chip, .tag, .project-card, .about-card, .clink, .skill-item, .s-project, .mode-toggle, .gdg-id-card, .depth-scene, .event-photo-card, .cisco-badge-sq, .org-item, .s-affil-sq, .s-badge-sq';
  document.addEventListener('mouseover', e => { if (e.target.closest(sel)) document.body.classList.add('cursor-hover'); });
  document.addEventListener('mouseout',  e => { if (e.target.closest(sel)) document.body.classList.remove('cursor-hover'); });
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; trail.style.opacity='0'; });
  document.addEventListener('mouseenter', () => {
    if (ModeManager.getCurrentMode() === 'dev') {
      dot.style.opacity='1'; ring.style.opacity='1'; trail.style.opacity='1';
    }
  });

  // Magnetic hover
  const magEls = document.querySelectorAll('.nav-cta, .btn-primary, .profile-btn');
  magEls.forEach(el => {
    el.addEventListener('mousemove', e => {
      if(ModeManager.getCurrentMode() !== 'dev') return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      if(ModeManager.getCurrentMode() === 'dev') el.style.transform = '';
    });
  });
})();

/* ══════════════════════════════════════════════════════
   INTRO OVERLAYS — mutual hide + mode-aware init
   ══════════════════════════════════════════════════════ */
window._forceHideDevIntro = function() {
  const intro = document.getElementById('intro');
  if (!intro) return;
  if (window._devIntroRaf) cancelAnimationFrame(window._devIntroRaf);
  window._devIntroRaf = null;
  intro.classList.add('hide', 'done');
  intro.style.display = 'none';
  intro.style.pointerEvents = 'none';
};

window._forceHideAirIntro = function() {
  const airIntro = document.getElementById('airIntro');
  if (!airIntro) return;
  airIntro.classList.remove('open');
  airIntro.classList.add('done');
  airIntro.style.display = 'none';
  airIntro.style.pointerEvents = 'none';
};

/* ══════════════════════════════════════════════════════
   DEV MODE INTRO OVERLAY — Space Constellation Network
   ══════════════════════════════════════════════════════ */
window.playDevIntro = function() {
  window._forceHideAirIntro();

  const intro  = document.getElementById('intro');
  const fill   = document.getElementById('introFill');
  const pctEl  = document.getElementById('introPct');
  const canvas = document.getElementById('introCanvas');
  if (!intro) return;

  intro.classList.remove('hide', 'done');
  intro.style.display = 'flex';
  intro.style.pointerEvents = 'all';

  if(fill) fill.style.width = '0%';
  if(pctEl) pctEl.textContent = '0%';

  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resizeI() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resizeI();
  window.addEventListener('resize', resizeI);

  // Stars (twinkling background) — reduced count for perf
  const stars = Array.from({length: 40}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 0.5 + Math.random() * 1.5,
    alpha: 0.2 + Math.random() * 0.6,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }));

  // Constellation nodes — reduced count for perf
  const CONN_DIST = 140;
  const COLORS = ['0,255,200', '100,140,255', '140,80,255', '0,200,255'];
  const nodes = Array.from({length: 18}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 1.5 + Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  function drawI() {
    ctx.clearRect(0, 0, W, H);

    // Draw twinkling stars
    stars.forEach(s => {
      s.pulse += s.pulseSpeed;
      const a = s.alpha * (0.5 + 0.5 * Math.sin(s.pulse));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${a})`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < CONN_DIST) {
          const alpha = (1 - dist / CONN_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${nodes[i].color},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw & move nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},0.7)`;
      ctx.fill();
      // Glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},0.08)`;
      ctx.fill();

      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    window._devIntroRaf = requestAnimationFrame(drawI);
  }
  drawI();

  let progress = 0, done = false;
  let start = null;
  const DURATION = 4000;

  function tick(now) {
    if (done) return;
    if (!start) start = now;
    progress = Math.min(((now - start) / DURATION) * 100, 100);
    if (isNaN(progress)) progress = 0;
    if (fill)  fill.style.width = Math.max(0, progress) + '%';
    if (pctEl) pctEl.textContent = Math.floor(Math.max(0, progress)) + '%';
    if (progress < 100) { requestAnimationFrame(tick); }
    else { setTimeout(dismiss, 200); }
  }
  requestAnimationFrame(tick);

  function dismiss() {
    if (done) return; done = true;
    if (window._devIntroRaf) cancelAnimationFrame(window._devIntroRaf);
    window._devIntroRaf = null;
    intro.classList.add('hide');
    setTimeout(() => { intro.style.display = 'none'; }, 550);
  }

  intro.addEventListener('click', dismiss);
  document.addEventListener('keydown', dismiss, {once: true});
  document.getElementById('introSkip')?.addEventListener('click', dismiss);
};

/* ══════════════════════════════════════════════════════
   AIR MODE INTRO OVERLAY — Cloud Drift with Loading
   ══════════════════════════════════════════════════════ */
window.playAirIntro = function() {
  window._forceHideDevIntro();

  const airIntro = document.getElementById('airIntro');
  const airFill  = document.getElementById('airIntroFill');
  const airPct   = document.getElementById('airIntroPct');
  if (!airIntro) return;

  airIntro.classList.remove('done');
  airIntro.classList.add('open');
  airIntro.style.display = 'flex';
  airIntro.style.pointerEvents = 'all';

  if (airFill) airFill.style.width = '0%';
  if (airPct) airPct.textContent = '0%';

  let progress = 0, done = false;
  let start = null;
  const DURATION = 4000;

  function tick(now) {
    if (done) return;
    if (!start) start = now;
    progress = Math.min(((now - start) / DURATION) * 100, 100);
    if (isNaN(progress)) progress = 0;
    if (airFill) airFill.style.width = Math.max(0, progress) + '%';
    if (airPct)  airPct.textContent = Math.floor(Math.max(0, progress)) + '%';
    if (progress < 100) { requestAnimationFrame(tick); }
    else { setTimeout(dismiss, 200); }
  }
  requestAnimationFrame(tick);

  function dismiss() {
    if (done) return; done = true;
    airIntro.classList.remove('open');
    airIntro.classList.add('done');
    airIntro.style.pointerEvents = 'none';
    setTimeout(() => { airIntro.style.display = 'none'; }, 550);
    airIntro.removeEventListener('click', dismiss);
  }

  airIntro.addEventListener('click', dismiss);
  document.addEventListener('keydown', dismiss, {once: true});
};

(function initModeIntro() {
  const mode = ModeManager.getCurrentMode();
  if (mode === 'dev') window.playDevIntro();
  else window.playAirIntro();
})();

/* ══════════════════════════════════════════════════════
   BACKGROUND CANVAS — Futuristic Particle Network
   ══════════════════════════════════════════════════════ */
(function initBg() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // Reduced particle count for better performance
  const PARTICLE_COUNT = 45;
  const CONNECTION_DIST = 140;
  const COLORS = ['0,255,200', '100,120,255', '180,80,255', '0,200,255'];

  let particles = [];
  let bgRaf;

  function mkParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r:  1.2 + Math.random() * 1.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.016,
    }));
  }

  // Scan line
  let scanY = -50;
  let scanSpeed = 0.55;

  function draw() {
    // Pause BG canvas when not in Dev Mode
    if (ModeManager.getCurrentMode() !== 'dev') {
      bgRaf = requestAnimationFrame(draw);
      return;
    }
    ctx.clearRect(0, 0, W, H);

    // Scan line sweep
    scanY += scanSpeed;
    if (scanY > H + 50) scanY = -50;
    const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
    scanGrad.addColorStop(0,   'rgba(0,255,200,0)');
    scanGrad.addColorStop(0.5, 'rgba(0,255,200,0.035)');
    scanGrad.addColorStop(1,   'rgba(0,255,200,0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 60, W, 120);

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.pulse += p.pulseSpeed;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      const glow = 0.5 + 0.5 * Math.sin(p.pulse);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + glow * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${0.5 + glow * 0.4})`;
      ctx.fill();
    });

    // Draw connections — skip glow rings for perf
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${a.color},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    bgRaf = requestAnimationFrame(draw);
  }

  resize(); mkParticles(); draw();
  window.addEventListener('resize', () => { resize(); mkParticles(); });

  // Throttled mouse repel for performance
  let lastMouseMove = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastMouseMove < 50) return; // throttle to 20fps
    lastMouseMove = now;
    particles.forEach(p => {
      const dx = p.x - e.clientX, dy = p.y - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.vx += (dx / dist) * 0.5;
        p.vy += (dy / dist) * 0.5;
        const maxV = 2.5;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxV) { p.vx = (p.vx / speed) * maxV; p.vy = (p.vy / speed) * maxV; }
      }
    });
  });
})();


/* ══════════════════════════════════════════════════════
   NAVBAR  (scroll shadow)
   ══════════════════════════════════════════════════════ */
(function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 24), {passive:true});
})();

/* ══════════════════════════════════════════════════════
   DEV MODE — TAB SYSTEM
   ══════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold:.1, rootMargin:'0px 0px -40px 0px' });

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold:.5 });

function activateDevTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));

  const panel = document.getElementById('tab-' + tabId);
  if (panel) {
    panel.classList.add('active');
    window.scrollTo({ top:0, behavior:'smooth' });
    setTimeout(() => {
      panel.querySelectorAll('.reveal').forEach(el => { el.classList.remove('visible'); revealObserver.observe(el); });
      panel.querySelectorAll('.skill-fill').forEach(f => { f.style.width='0'; skillObserver.observe(f); });
    }, 50);
  }

  document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(el => {
    if (el.classList.contains('nav-tab')) el.classList.add('active');
  });
}

// Initial reveals
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
document.querySelectorAll('.skill-fill').forEach(f => skillObserver.observe(f));

// Delegate [data-tab] clicks (Dev Mode)
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-tab]');
  if (!trigger || trigger.closest('.mode-toggle')) return;
  const tabId = trigger.dataset.tab;
  if (tabId) activateDevTab(tabId);
});

/* ══════════════════════════════════════════════════════
   MOBILE DRAWER
   ══════════════════════════════════════════════════════ */
(function initDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('drawer');
  const overlay   = document.getElementById('drawerOverlay');

  if (!hamburger || !drawer || !overlay) return;

  function open() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.removeAttribute('aria-hidden');
  }
  function close() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    drawer.classList.contains('open') ? close() : open();
  });

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  drawer.addEventListener('click', e => {
    const link = e.target.closest('[data-tab], [data-stab], [data-close], a');
    if (!link) return;

    const isContinuous = document.documentElement.dataset.scroll === 'continuous';

    if (isContinuous) {
      let targetId = null;
      if (link.dataset.tab)  targetId = 'tab-'  + link.dataset.tab;
      if (link.dataset.stab) targetId = 'stab-' + link.dataset.stab;

      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          const navH = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-h')) || 70;
          const top = el.getBoundingClientRect().top + window.scrollY - navH - 12;
          close();
          setTimeout(() => window.scrollTo({ top, behavior: 'smooth' }), 280);
          return;
        }
      }
    }

    if (link.hasAttribute('data-close') || link.closest('[data-close]')) {
      close();
    }
  });
})();

/* ══════════════════════════════════════════════════════
   TYPING EFFECT  (Dev Mode hero)
   ══════════════════════════════════════════════════════ */
(function initTyping() {
  const el = document.getElementById('typeText');
  if (!el) return;
  const words = ['beautiful UIs.', 'real systems.', 'things that help people.', 'clean code.'];
  let w=0, i=0, del=false;
  function loop() {
    el.textContent = words[w].slice(0, i);
    if (!del) { i++; if (i > words[w].length) { del=true; setTimeout(loop,1100); return; } }
    else { i--; if (i===0) { del=false; w=(w+1)%words.length; } }
    setTimeout(loop, del ? 38 : 52);
  }
  loop();
})();

/* ══════════════════════════════════════════════════════
   3D DEPTH EFFECT  (Dev Mode Casual Photo)
   ══════════════════════════════════════════════════════ */
(function initDepthEffect() {
  const scene = document.getElementById('depthScene');
  const photo = document.getElementById('depthPhoto');
  if (!scene) return;

  scene.addEventListener('mousemove', e => {
    const rect = scene.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    scene.style.transform = `perspective(600px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
    if (photo) photo.style.transform = `translateZ(20px) scale(1.02) translate(${x * -8}px, ${y * -8}px)`;
  });

  scene.addEventListener('mouseleave', () => {
    scene.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
    if (photo) photo.style.transform = '';
  });
})();

/* ══════════════════════════════════════════════════════
   RUN CODE — Python Skills Trick
   ══════════════════════════════════════════════════════ */
(function initRunCode() {
  const btn      = document.getElementById('runCodeBtn');
  const label    = document.getElementById('runCodeLabel');
  const terminal = document.getElementById('rcaTerminal');
  const termBody = document.getElementById('rcaTermBody');
  const grid     = document.getElementById('skillsGrid');
  if (!btn || !terminal || !grid) return;

  const SKILLS = [
    { name: 'HTML',       pct: 90 },
    { name: 'CSS',        pct: 80 },
    { name: 'JavaScript', pct: 70 },
    { name: 'PHP',        pct: 80 },
    { name: 'MySQL',      pct: 70 },
    { name: 'C++',        pct: 30 },
    { name: 'Python',     pct: 70 },
  ];

  let hasRun = false;

  function bar(pct) {
    const filled = Math.round(pct / 10);
    return '█'.repeat(filled) + '░'.repeat(10 - filled);
  }

  function addLine(html, cls, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'rca-line ' + (cls || '');
        span.innerHTML = html;
        termBody.appendChild(span);
        termBody.scrollTop = termBody.scrollHeight;
        resolve();
      }, delay);
    });
  }

  function unlockSkill(item, pct, delay) {
    setTimeout(() => {
      item.classList.remove('skill-locked');
      item.classList.add('skill-unlocked');
      // Update pct label
      const pctEl = item.querySelector('.skill-pct');
      if (pctEl) pctEl.textContent = pct + '%';
      // Animate fill bar
      const fill = item.querySelector('.skill-fill');
      if (fill) {
        fill.style.transition = 'width 1s cubic-bezier(0.22,1,0.36,1)';
        fill.style.width = pct + '%';
      }
    }, delay);
  }

  btn.addEventListener('click', () => {
    if (hasRun) return; // prevent double-run
    hasRun = true;

    // ── Button: Running state
    btn.classList.add('rca-running');
    btn.disabled = true;
    label.textContent = '⏳ Running...';

    // ── Show terminal
    terminal.removeAttribute('hidden');
    termBody.innerHTML = '';

    // ── Sequence of terminal lines
    const lines = [
      { html: '<span class="rca-prompt">$</span> python skills_analyzer.py', cls: '', t: 200 },
      { html: '→ Loading skill dataset...', cls: 'rca-output', t: 700 },
      { html: `→ Found ${SKILLS.length} languages.`, cls: 'rca-output', t: 1200 },
      { html: '→ Computing proficiency scores...', cls: 'rca-output', t: 1700 },
    ];

    // Per-skill output lines
    SKILLS.forEach((s, i) => {
      lines.push({
        html: `<span style="color:rgba(255,255,255,.4)">  ${s.name.padEnd(13, '\u00a0')}</span><span class="rca-result">[${bar(s.pct)}] ${s.pct}%</span>`,
        cls: '',
        t: 2300 + i * 260,
      });
    });

    const doneT = 2300 + SKILLS.length * 260 + 200;
    lines.push({ html: '✅ Analysis complete! Rendering visuals...', cls: 'rca-success', t: doneT });

    // Fire all lines
    lines.forEach(l => addLine(l.html, l.cls, l.t));

    // ── Unlock skill bars staggered, after per-skill lines
    const skillItems = grid.querySelectorAll('.skill-item');
    SKILLS.forEach((s, i) => {
      const item = skillItems[i];
      if (item) unlockSkill(item, s.pct, 2300 + i * 260 + 120);
    });

    // ── Button done state
    setTimeout(() => {
      btn.classList.remove('rca-running');
      btn.classList.add('rca-done');
      label.textContent = '✓ Done';
    }, doneT + 400);
  });
})();

/* ══════════════════════════════════════════════════════
   TILT EFFECT (About Cards)
   ══════════════════════════════════════════════════════ */
(function initTilts() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    const shine = card.querySelector('.card-shine');
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.05s linear';
    });
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width/2, cy = r.height/2;
      card.style.transform = `perspective(700px) rotateX(${((y-cy)/cy)*-5}deg) rotateY(${((x-cx)/cx)*5}deg) scale(1.02)`;
      if (shine) shine.style.background = `radial-gradient(circle at ${(x/r.width*100).toFixed(0)}% ${(y/r.height*100).toFixed(0)}%, rgba(255,255,255,.15), transparent 55%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)';
      card.style.transform = '';
      if (shine) shine.style.background = '';
    });
  });
})();

/* ══════════════════════════════════════════════════════
   CONTACT FORMS — Formspree Integration
   ══════════════════════════════════════════════════════ */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meevnwba';

/* ── TOAST NOTIFICATION SYSTEM ── */
let toastTimer = null;

function showToast(type, message) {
  const toast = document.getElementById('toastNotif');
  if (!toast) return;

  // Clear any running auto-dismiss
  if (toastTimer) clearTimeout(toastTimer);

  // Determine mode for theme
  const mode = document.documentElement.getAttribute('data-mode') || 'dev';

  // Icons
  const icons = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    sending: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="toast-spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`,
    warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  };

  toast.className = `toast-visible toast-${type} toast-${mode}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.success}</div>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="dismissToast()" aria-label="Dismiss">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;

  // Auto dismiss after 5s (not for 'sending')
  if (type !== 'sending') {
    toastTimer = setTimeout(dismissToast, 5000);
  }
}

function dismissToast() {
  const toast = document.getElementById('toastNotif');
  if (!toast) return;
  toast.className = 'toast-dismiss';
  if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }
  setTimeout(() => { toast.className = ''; toast.innerHTML = ''; }, 400);
}

/* ── FORM SETUP ── */
function setupForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const nameInput    = form.querySelector('input[type="text"]');
    const emailInput   = form.querySelector('input[type="email"]');
    const subjectInput = form.querySelectorAll('input[type="text"]')[1] || null;
    const msgInput     = form.querySelector('textarea');

    const name    = nameInput?.value?.trim()    || '';
    const email   = emailInput?.value?.trim()   || '';
    const subject = subjectInput?.value?.trim() || '(No subject)';
    const message = msgInput?.value?.trim()     || '';

    if (!name || !email || !message) {
      showToast('warning', 'Please fill in all required fields.');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    showToast('sending', 'Sending your message…');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (response.ok) {
        showToast('success', `Message sent! Thanks${name ? ', ' + name : ''}. I'll get back to you soon.`);
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        const errMsg = data?.errors?.map(err => err.message).join(', ') || 'Submission failed. Please try again.';
        showToast('error', errMsg);
      }
    } catch (err) {
      showToast('error', 'Network error. Check your connection and try again.');
    } finally {
      btn.disabled = false;
      btn.textContent = originalBtnText;
    }
  });
}

setupForm('devContactForm');
setupForm('simpleContactForm');

/* ══════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════ */
ModeManager.init();

// Initial air reveals for default active s-tab
document.querySelectorAll('#stab-home .s-reveal').forEach(el => airRevealObserver.observe(el));

/* ══════════════════════════════════════════════════════
   MOBILE VIEW TOGGLE
   ══════════════════════════════════════════════════════ */
(function initMobileView() {
  const btn = document.getElementById('mobileViewToggle');
  if (!btn) return;

  const html = document.documentElement;
  let isMobile = localStorage.getItem('jg-mobile-view') === 'true';

  function applyMobile(on) {
    isMobile = on;
    html.classList.toggle('mobile-preview', on);
    btn.classList.toggle('mv-active', on);
    localStorage.setItem('jg-mobile-view', on);
    // Hide on actual mobile screens (button is for desktop preview)
    if (window.innerWidth <= 768) {
      btn.style.display = 'none';
    } else {
      btn.style.display = '';
    }
  }

  btn.addEventListener('click', () => applyMobile(!isMobile));
  applyMobile(isMobile);
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      btn.style.display = 'none';
      if (isMobile) applyMobile(false);
    } else {
      btn.style.display = '';
    }
  });
})();

/* ══════════════════════════════════════════════════════
   GDG STORIES — Instagram-style cycling images
   ══════════════════════════════════════════════════════ */
(function initGDGStories() {
  const STORY_COUNT   = 7;
  const STORY_DUR_MS  = 3000; // 3 seconds per story (faster rotation)
  const EMOJIS        = ['❤️','🧡','💛','💚','💙','💜','🤍','💖','💗','💘'];

  let currentStory  = 0;
  let storyTimer    = null;
  let isRunning     = false;

  const imgWrap     = document.getElementById('gdgStoriesImgWrap');
  const floodEl     = document.getElementById('gdgHeartFlood');
  if (!imgWrap || !floodEl) return;

  function getStoryImg(i)  { return document.getElementById('gdgStory' + i); }
  function getStorySeg(i)  { return document.getElementById('gdgSeg' + i);   }
  function getStoryFill(i) { return document.getElementById('gdgFill' + i);  }

  function showStory(idx) {
    currentStory = (idx + STORY_COUNT) % STORY_COUNT;

    // Update image visibility
    for (let i = 0; i < STORY_COUNT; i++) {
      const img = getStoryImg(i);
      if (img) img.classList.toggle('active', i === currentStory);
    }

    // Update progress segments
    for (let i = 0; i < STORY_COUNT; i++) {
      const seg  = getStorySeg(i);
      const fill = getStoryFill(i);
      if (!seg || !fill) continue;

      seg.classList.remove('active', 'done');
      fill.style.animation = 'none';
      // Force reflow so animation restarts
      void fill.offsetWidth;

      if (i < currentStory) {
        seg.classList.add('done');
      } else if (i === currentStory) {
        seg.style.setProperty('--story-dur', (STORY_DUR_MS / 1000) + 's');
        seg.classList.add('active');
        fill.style.animation = '';
      }
    }

    // Auto advance
    clearTimeout(storyTimer);
    storyTimer = setTimeout(() => {
      showStory(currentStory + 1);
    }, STORY_DUR_MS);
  }

  /* ── Hearts flood on click ── */
  function spawnHeartFlood() {
    const count = 28;
    for (let i = 0; i < count; i++) {
      const emoji = document.createElement('span');
      emoji.className = 'flood-emoji';
      const em = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      emoji.textContent = em;

      // Random horizontal position inside the wrap
      const leftPct = 5 + Math.random() * 90;
      emoji.style.left = leftPct + '%';

      // Slight random rotation
      const rot = (Math.random() - 0.5) * 40;
      emoji.style.setProperty('--rot', rot + 'deg');

      // Stagger delay
      const delay = (Math.random() * 0.6).toFixed(2);
      emoji.style.setProperty('--delay', delay + 's');

      // Random duration
      const dur = (0.9 + Math.random() * 0.7).toFixed(2);
      emoji.style.setProperty('--dur', dur + 's');

      // Size variation
      const size = 16 + Math.floor(Math.random() * 14);
      emoji.style.fontSize = size + 'px';

      floodEl.appendChild(emoji);

      // Remove after animation
      const totalMs = (parseFloat(delay) + parseFloat(dur)) * 1000 + 200;
      setTimeout(() => emoji.remove(), totalMs);
    }
  }

  imgWrap.addEventListener('click', () => {
    spawnHeartFlood();
  });

  // Start the stories loop
  showStory(0);
})();

/* ══════════════════════════════════════════════════════
   CYBER-NETWORK ROTATING GLOBE
   ══════════════════════════════════════════════════════ */
(function initContactGlobe() {
  const canvas = document.getElementById('contactGlobe');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  
  const w = 1200; 
  const h = 1200;
  canvas.width = w;
  canvas.height = h;

  const dots = [];
  const DOT_COUNT = 400; // Reduced from 800 for better performance
  const GLOBE_RADIUS = 500;
  
  // Lightweight 64x32 ASCII Earth Data Mask
  const EARTH_MAP = [
    "                                                                ",
    "                                                                ",
    "                  #######                                       ",
    "                 #########       #####                          ",
    "           #    ###########    #########   ##                   ",
    "          ###  #############  ###################               ",
    "         ###################  ####################              ",
    "          ##################  #####################             ",
    "          #################   #####################             ",
    "           ##############     #####################             ",
    "            ##########        #####################             ",
    "             ######             ##################              ",
    "              ###                ################  #            ",
    "              ##                 ############### ###            ",
    "             ##                  ##############  ###            ",
    "             ###                  ############  ####  #         ",
    "             ####                 ############ #####            ",
    "             ####                 ###########  ####             ",
    "             ####                 ##########   ###              ",
    "              ####                 ########    ##               ",
    "              ###                  #######     ##     ##        ",
    "               ##                   #####            ####       ",
    "               #                    ####             ####       ",
    "                                     ##              ###        ",
    "                                                     ##         ",
    "                                                      #         ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "               ###########                                      ",
    "          ###########################                           ",
    "        #####################################                   "
  ];
  
  // Fibonacci sphere to distribute dots
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < DOT_COUNT; i++) {
    const y = 1 - (i / (DOT_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    // Map spherical coordinates to 2D Earth Data
    const lon = Math.atan2(x, z);
    const lat = Math.asin(y);
    const u = (lon + Math.PI) / (Math.PI * 2);
    const v = (Math.PI / 2 - lat) / Math.PI;
    const pxCheck = Math.max(0, Math.min(63, Math.floor(u * 64)));
    const pyCheck = Math.max(0, Math.min(31, Math.floor(v * 32)));
    
    const isLand = EARTH_MAP[pyCheck][pxCheck] === '#';
    
    dots.push({ 
       x, y, z, 
       isLand, 
       isMarker: false, 
       links: [], 
       ripple: 0 
    });
  }

  // Scatter green location pings across land masses with even spacing
  const MARKER_COUNT = 22;
  const MIN_MARKER_DIST_SQ = 0.14 * 0.14;
  const landIndices = dots.map((d, i) => i).filter(i => dots[i].isLand);
  for (let i = landIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [landIndices[i], landIndices[j]] = [landIndices[j], landIndices[i]];
  }
  const markerIndices = [];
  for (const idx of landIndices) {
    if (markerIndices.length >= MARKER_COUNT) break;
    const d = dots[idx];
    const tooClose = markerIndices.some(ci => {
      const o = dots[ci];
      const dx = d.x - o.x, dy = d.y - o.y, dz = d.z - o.z;
      return dx * dx + dy * dy + dz * dz < MIN_MARKER_DIST_SQ;
    });
    if (!tooClose) {
      markerIndices.push(idx);
      d.isMarker = true;
      d.ripple = Math.random();
      d.rippleSpeed = 0.008 + Math.random() * 0.012;
    }
  }
  
  // Precompute nearest neighbors for full cyber-network sphere effect
  for (let i = 0; i < DOT_COUNT; i++) {
    const d1 = dots[i];
    const dists = [];
    for (let j = 0; j < DOT_COUNT; j++) {
      if (i === j) continue;
      const d2 = dots[j];
      const distSq = (d1.x-d2.x)**2 + (d1.y-d2.y)**2 + (d1.z-d2.z)**2;
      dists.push({ dot: d2, distSq });
    }
    // Connect to 2 nearest nodes (reduced from 3 for perf)
    dists.sort((a,b) => a.distSq - b.distSq);
    for(let k=0; k<2; k++) {
       if (dists[k]) d1.links.push(dists[k].dot);
    }
  }

  let rotationY = 0;
  const rotationX = 0.3; // Slight tilt
  let isContactVisible = false;

  const contactPanel = document.getElementById('tab-contact');
  if (contactPanel) {
    const visibilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { isContactVisible = entry.isIntersecting; });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    visibilityObserver.observe(contactPanel);
  }
  
  function draw() {
    const isDevMode = ModeManager.getCurrentMode() === 'dev';
    if (!isDevMode || !isContactVisible) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.clearRect(0, 0, w, h);
    
    // Deep core glow
    const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, GLOBE_RADIUS * 1.5);
    grad.addColorStop(0, 'rgba(120, 45, 255, 0.65)');
    grad.addColorStop(0.4, 'rgba(95, 35, 210, 0.24)');
    grad.addColorStop(1, 'rgba(90, 30, 200, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    
    // Project and order
    const projected = dots.map(dot => {
      const x1 = dot.x * cosY - dot.z * sinY;
      const z1 = dot.z * cosY + dot.x * sinY;
      const y1 = dot.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + dot.y * sinX;
      
      const perspective = 1200 / (1200 - z2 * GLOBE_RADIUS * 0.4);
      const px = w/2 + x1 * GLOBE_RADIUS * perspective;
      const py = h/2 + y1 * GLOBE_RADIUS * perspective;
      
      // Update ripple for markers
      if (dot.isMarker) {
         dot.ripple += dot.rippleSpeed || 0.012;
         if (dot.ripple > 1) dot.ripple = 0;
      }
      
      return { px, py, z: z2, isLand: dot.isLand, isMarker: dot.isMarker, links: dot.links, perspective, ripple: dot.ripple };
    });

    // Draw full network lines
    ctx.lineWidth = 1.2;
    projected.forEach(dot => {
       if(!dot.links.length) return;
       const isFront = dot.z < 0;
       
       // Keep land networks bright, but still draw oceans
       const alphaMult = dot.isLand ? 1 : 0.45;
       const lineAlpha = isFront ? (0.42 * alphaMult) : (0.06 * alphaMult);
       
       ctx.strokeStyle = `rgba(170, 115, 255, ${lineAlpha})`;
       ctx.beginPath();
       
       dot.links.forEach(tOrigDot => {
          // Manually project target
          const x1 = tOrigDot.x * cosY - tOrigDot.z * sinY;
          const z1 = tOrigDot.z * cosY + tOrigDot.x * sinY;
          const y1 = tOrigDot.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + tOrigDot.y * sinX;
          const targetPersp = 1200 / (1200 - z2 * GLOBE_RADIUS * 0.4);
          const tpx = w/2 + x1 * GLOBE_RADIUS * targetPersp;
          const tpy = h/2 + y1 * GLOBE_RADIUS * targetPersp;
          
          ctx.moveTo(dot.px, dot.py);
          ctx.lineTo(tpx, tpy);
       });
       ctx.stroke();
    });

    // Draw dots
    projected.sort((a, b) => a.z - b.z).forEach(dot => {
      const isFront = dot.z < 0;
      
      // Marker Base
      if (dot.isMarker) {
        ctx.beginPath();
        const size = isFront ? 5 : 2;
        ctx.arc(dot.px, dot.py, size * dot.perspective, 0, Math.PI * 2);
        ctx.fillStyle = isFront ? 'rgba(160, 255, 40, 1)' : 'rgba(160, 255, 40, 0.3)';
        if (isFront) {
          ctx.shadowBlur = 24;
          ctx.shadowColor = 'rgba(180, 255, 60, 1)';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Marker Radar Ripple
        if (isFront) {
            ctx.beginPath();
            const rSize = size + (dot.ripple * 28);
            ctx.arc(dot.px, dot.py, rSize * dot.perspective, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(160, 255, 40, ${1 - dot.ripple})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
      } else {
        // Normal nodes
        ctx.beginPath();
        const size = isFront ? (dot.isLand ? 2 : 1) : (dot.isLand ? 1 : 0.5);
        ctx.arc(dot.px, dot.py, size * dot.perspective, 0, Math.PI * 2);
        
        if (dot.isLand) {
           ctx.fillStyle = isFront ? 'rgba(195, 140, 255, 1)' : 'rgba(140, 80, 255, 0.28)';
           if (isFront) { ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(190, 135, 255, 0.9)'; }
        } else {
           ctx.fillStyle = isFront ? 'rgba(120, 75, 220, 0.4)' : 'rgba(90, 50, 190, 0.1)';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    rotationY -= 0.0035; 
    requestAnimationFrame(draw);
  }
  
  draw();
})();

/* ══════════════════════════════════════════════════════
   AIR MODE — Animated Cloud Background
   ══════════════════════════════════════════════════════ */
(function initAirClouds() {
  const canvas = document.getElementById('airCloudCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Cloud puff: a single soft ellipse
  class CloudPuff {
    constructor(cx, cy, rx, ry, alpha) {
      this.cx = cx; this.cy = cy;
      this.rx = rx; this.ry = ry;
      this.alpha = alpha;
    }
  }

  // Cloud: a cluster of puffs that drifts horizontally
  class Cloud {
    constructor() { this.reset(true); }

    reset(initial) {
      this.y      = Math.random() * H * 0.75;
      this.speed  = 0.12 + Math.random() * 0.35;
      this.scale  = 0.5 + Math.random() * 1.0;
      this.alpha  = 0.15 + Math.random() * 0.25;
      this.width  = (120 + Math.random() * 220) * this.scale;
      this.height = (30 + Math.random() * 40) * this.scale;

      // Build puff cluster (5-9 overlapping ellipses)
      const count = 5 + Math.floor(Math.random() * 5);
      this.puffs = [];
      for (let i = 0; i < count; i++) {
        const px = (Math.random() - 0.5) * this.width * 0.8;
        const py = (Math.random() - 0.5) * this.height * 0.6;
        const rx = (20 + Math.random() * 50) * this.scale;
        const ry = (14 + Math.random() * 22) * this.scale;
        const pa = 0.5 + Math.random() * 0.5;
        this.puffs.push(new CloudPuff(px, py, rx, ry, pa));
      }

      if (initial) {
        this.x = Math.random() * (W + this.width * 2) - this.width;
      } else {
        this.x = -this.width - 20;
      }
    }

    update() {
      this.x += this.speed;
      if (this.x > W + this.width + 20) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      this.puffs.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(p.cx, p.cy, p.rx, p.ry, 0, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.cx, p.cy, 0, p.cx, p.cy, Math.max(p.rx, p.ry));
        grad.addColorStop(0,   `rgba(255, 255, 255, ${this.alpha * p.alpha})`);
        grad.addColorStop(0.4, `rgba(245, 243, 238, ${this.alpha * p.alpha * 0.7})`);
        grad.addColorStop(1,   `rgba(240, 236, 228, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      ctx.restore();
    }
  }

  // Create cloud population (layered: far, mid, near)
  const CLOUD_COUNT = 14;
  let clouds = [];

  function createClouds() {
    clouds = [];
    for (let i = 0; i < CLOUD_COUNT; i++) {
      clouds.push(new Cloud());
    }
    // Sort by scale (far clouds draw first = behind)
    clouds.sort((a, b) => a.scale - b.scale);
  }
  createClouds();

  function drawClouds() {
    ctx.clearRect(0, 0, W, H);

    // Subtle sky gradient overlay (warm cream top → transparent bottom)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
    skyGrad.addColorStop(0,   'rgba(220, 230, 245, 0.08)');
    skyGrad.addColorStop(0.5, 'rgba(200, 215, 240, 0.04)');
    skyGrad.addColorStop(1,   'rgba(240, 236, 228, 0)');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    clouds.forEach(c => {
      c.update();
      c.draw(ctx);
    });

    raf = requestAnimationFrame(drawClouds);
  }

  // Only run animation when in Air Mode
  let running = false;

  function start() {
    if (running) return;
    running = true;
    resize();
    createClouds();
    drawClouds();
  }

  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, W, H);
  }

  // Watch for mode changes
  const observer = new MutationObserver(() => {
    const mode = document.documentElement.getAttribute('data-mode');
    if (mode === 'air') start(); else stop();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });

  // Start if already in air mode
  if (document.documentElement.getAttribute('data-mode') === 'air') start();
})();
/* ═══════════════════════════════════════
   PIN-TO-TOP SYSTEM — Dev Mode & Air Mode
═══════════════════════════════════════ */

// Data maps for pinned cards
const devProjectData = {
  clickizenship: { title: 'CLICKizenship', sub: 'Barangay DigiServices Request System', img: 'Images/Project Pictures/CLICKizenship  (3).png' },
  glidego:       { title: "GlideN'Go",     sub: 'Professional Fleet & Cold-Chain Logistics', img: 'Images/Project Pictures/GlideNGo (1).png' },
  lakbay:        { title: 'LAKbayGAbayPh', sub: 'Traversing Project 82 — MapaSayo Generator', img: 'Images/Project Pictures/LAKbayGAbayPh (1).png' },
  ojt:           { title: 'OJT Attendance Tracker', sub: 'OJT Attendance Tracker System', img: 'Images/Project Pictures/OJT ATS (3).png' },
  passfolio:     { title: 'Passfolio in One', sub: 'Passport-Style Portfolio', img: 'Images/Project Pictures/PassFolio Intro.png' },
  gastadoor:     { title: 'GastaDoor', sub: 'Budget Manager App in your Home', img: 'Images/Project Pictures/GastaDoor (1).png' },
  bugtong2x:     { title: 'Bugtong2x', sub: 'Classic Filipino Riddle Game', img: 'Images/Project Pictures/Bugtong (1).png' }
};

const airProjectData = {
  clickizenship: { title: 'CLICKizenship', sub: 'Barangay DigiServices Request System', img: 'Images/Project Pictures/CLICKizenship  (3).png' },
  glidego:       { title: "GlideN'Go",     sub: 'Professional Fleet & Cold-Chain Logistics', img: 'Images/Project Pictures/GlideNGo (1).png' },
  lakbay:        { title: 'LAKbayGAbayPh', sub: 'Traversing Project 82 — MapaSayo Generator', img: 'Images/Project Pictures/LAKbayGAbayPh (1).png' },
  ojt:           { title: '[AT]tendee Management Portal', sub: 'Attendance Tracking System', img: 'Images/Project Pictures/OJT ATS (3).png' },
  passfolio:     { title: 'PassFolio One', sub: 'Password Portfolio System', img: 'Images/Project Pictures/PassFolio Intro.png' },
  GastaDoor:     { title: 'GastaDoor', sub: 'Budget Manager App in your Home', img: 'Images/Project Pictures/GastaDoor (1).png' },
  bugtong2x:     { title: 'Bugtong2x', sub: 'Classic Filipino Riddle Game', img: 'Images/Project Pictures/Bugtong (1).png' }
};

// Shared state
const pinnedDevIds = new Set();
const pinnedAirIds = new Set();

/* ── DEV MODE PIN ── */
function toggleDevPin(btn, pid) {
  if (pinnedDevIds.has(pid)) {
    unpinDev(pid);
  } else {
    pinDev(btn, pid);
  }
}

function pinDev(btn, pid) {
  if (pinnedDevIds.has(pid)) return;
  pinnedDevIds.add(pid);
  btn.classList.add('pinned');
  btn.title = 'Unpin';
  renderDevPinned();
}

function unpinDev(pid) {
  pinnedDevIds.delete(pid);
  // Reset button
  const card = document.querySelector(`.dev-proj-card[data-pid="${pid}"]`);
  if (card) {
    const btn = card.querySelector('.proj-pin-btn');
    if (btn) { btn.classList.remove('pinned'); btn.title = 'Pin to top'; }
  }
  renderDevPinned();
}

function renderDevPinned() {
  const zone = document.getElementById('devPinnedZone');
  const list = document.getElementById('devPinnedList');
  if (!zone || !list) return;
  list.innerHTML = '';
  if (pinnedDevIds.size === 0) { zone.style.display = 'none'; return; }
  zone.style.display = 'block';
  pinnedDevIds.forEach(pid => {
    const d = devProjectData[pid];
    if (!d) return;
    const item = document.createElement('div');
    item.className = 'dev-pinned-item';
    item.style.cursor = 'pointer';
    item.innerHTML = `
      <img class="dev-pinned-thumb" src="${d.img}" alt="${d.title}" />
      <div class="dev-pinned-info">
        <h4>${d.title}</h4>
        <span>${d.sub}</span>
      </div>
      <button class="dev-pinned-unpin" title="Unpin" onclick="event.stopPropagation(); unpinDev('${pid}')">✕</button>
    `;
    item.addEventListener('click', () => {
      const card = document.querySelector(`.dev-proj-card[data-pid="${pid}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => card.click(), 400);
      }
    });
    list.appendChild(item);
  });
}

/* ── AIR MODE PIN ── */
function toggleAirPin(btn, pid) {
  if (pinnedAirIds.has(pid)) {
    unpinAir(pid);
  } else {
    pinAir(btn, pid);
  }
}

function pinAir(btn, pid) {
  if (pinnedAirIds.has(pid)) return;
  pinnedAirIds.add(pid);
  btn.classList.add('pinned');
  btn.title = 'Unpin';
  renderAirPinned();
}

function unpinAir(pid) {
  pinnedAirIds.delete(pid);
  const card = document.querySelector(`.s-proj-card[data-spid="${pid}"]`);
  if (card) {
    const btn = card.querySelector('.s-proj-pin-btn');
    if (btn) { btn.classList.remove('pinned'); btn.title = 'Pin to top'; }
  }
  renderAirPinned();
}

function renderAirPinned() {
  const zone = document.getElementById('airPinnedZone');
  const list = document.getElementById('airPinnedList');
  if (!zone || !list) return;
  list.innerHTML = '';
  if (pinnedAirIds.size === 0) { zone.style.display = 'none'; return; }
  zone.style.display = 'block';
  pinnedAirIds.forEach(pid => {
    const d = airProjectData[pid];
    if (!d) return;
    const item = document.createElement('div');
    item.className = 'air-pinned-item';
    item.style.cursor = 'pointer';
    item.innerHTML = `
      <img class="air-pinned-thumb" src="${d.img}" alt="${d.title}" />
      <div class="air-pinned-info">
        <h4>${d.title}</h4>
        <span>${d.sub}</span>
      </div>
      <button class="air-pinned-unpin" title="Unpin" onclick="event.stopPropagation(); unpinAir('${pid}')">✕</button>
    `;
    item.addEventListener('click', () => {
      const card = document.querySelector(`.s-proj-card[data-spid="${pid}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => card.click(), 400);
      }
    });
    list.appendChild(item);
  });
}

/* ═══════════════════════════════════════════════════════
   PROJECT POPOUT MODAL + IMAGE LIGHTBOX
═══════════════════════════════════════════════════════ */
(function () {
  // ─── Popout Modal Elements ───
  const pop       = document.getElementById('projPopout');
  const ppClose   = document.getElementById('ppClose');
  const ppTrack   = document.getElementById('ppGalleryTrack');
  const ppDots    = document.getElementById('ppGalleryDots');
  const ppPrev    = document.getElementById('ppGalleryPrev');
  const ppNext    = document.getElementById('ppGalleryNext');
  const ppBadge   = document.getElementById('ppBadge');
  const ppTitle   = document.getElementById('ppTitle');
  const ppSub     = document.getElementById('ppSubtitle');
  const ppDesc    = document.getElementById('ppDesc');
  const ppTags    = document.getElementById('ppTags');
  if (!pop) return;

  let ppImgs = [], ppIdx = 0;

  // ── Extract project data from a card element ──
  function extractCardData(card) {
    const data = { images: [], title: '', subtitle: '', desc: '', tags: [], badge: '' };

    // Dev Mode card
    if (card.classList.contains('project-card') || card.classList.contains('dev-proj-card')) {
      const strip = card.querySelector('.proj-imgs-strip');
      if (strip) data.images = Array.from(strip.querySelectorAll('img'));
      data.title    = card.querySelector('h3')?.textContent || '';
      data.subtitle = card.querySelector('.proj-subtitle')?.textContent || '';
      // Description: the last <p> that isn't .proj-subtitle
      const ps = card.querySelectorAll('p');
      ps.forEach(p => { if (!p.classList.contains('proj-subtitle')) data.desc = p.textContent; });
      const badgeEl = card.querySelector('.project-badge');
      if (badgeEl) data.badge = badgeEl.textContent;
      card.querySelectorAll('.project-tags span').forEach(s => data.tags.push(s.textContent));
    }

    // Air Mode card
    if (card.classList.contains('s-project') || card.classList.contains('s-proj-card')) {
      const imgWrap = card.querySelector('.s-proj-imgs');
      if (imgWrap) data.images = Array.from(imgWrap.querySelectorAll('img'));
      data.title    = card.querySelector('h3')?.textContent || '';
      data.subtitle = card.querySelector('.s-project-sub')?.textContent || '';
      data.desc     = card.querySelector('.s-project-desc')?.textContent || '';
      card.querySelectorAll('.s-project-tags span').forEach(s => data.tags.push(s.textContent));
    }

    return data;
  }

  // ── Populate and open popout ──
  function openPopout(card, startIdx) {
    const d = extractCardData(card);
    ppImgs = d.images;
    ppIdx  = startIdx || 0;

    // Build gallery
    ppTrack.innerHTML = '';
    ppDots.innerHTML  = '';
    d.images.forEach((img, i) => {
      const clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt;
      clone.addEventListener('click', () => openLb(d.images, i));
      ppTrack.appendChild(clone);

      const dot = document.createElement('button');
      dot.className = 'pp-gallery-dot' + (i === ppIdx ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      ppDots.appendChild(dot);
    });

    // Show/hide arrows
    ppPrev.style.display = d.images.length > 1 ? 'flex' : 'none';
    ppNext.style.display = d.images.length > 1 ? 'flex' : 'none';

    // Populate text
    ppBadge.textContent = d.badge;
    ppTitle.textContent = d.title;
    ppSub.textContent   = d.subtitle;
    ppDesc.textContent  = d.desc;
    ppTags.innerHTML    = '';
    d.tags.forEach(t => {
      const s = document.createElement('span');
      s.textContent = t;
      ppTags.appendChild(s);
    });

    goToSlide(ppIdx);
    pop.classList.add('pp-open');
    document.body.style.overflow = 'hidden';
  }

  window.openProjectPopoutById = function (projId, startIdx = 0) {
    const card = document.querySelector(`[data-pid="${projId}"], [data-spid="${projId}"]`);
    if (card) openPopout(card, startIdx);
  };

  function closePopout() {
    pop.classList.remove('pp-open');
    document.body.style.overflow = '';
  }

  function goToSlide(idx) {
    ppIdx = Math.max(0, Math.min(idx, ppImgs.length - 1));
    ppTrack.style.transform = `translateX(-${ppIdx * 100}%)`;
    ppDots.querySelectorAll('.pp-gallery-dot').forEach((d, i) => {
      d.classList.toggle('active', i === ppIdx);
    });
  }

  // Gallery controls
  ppPrev.addEventListener('click', () => goToSlide(ppIdx - 1));
  ppNext.addEventListener('click', () => goToSlide(ppIdx + 1));
  ppClose.addEventListener('click', closePopout);
  pop.querySelector('.pp-backdrop').addEventListener('click', closePopout);

  // ─── Image Lightbox (full-screen zoom) ───
  let lbImgs = [], lbIdx = 0;
  const lb      = document.getElementById('imgLightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbCap   = document.getElementById('lbCaption');
  const lbCtr   = document.getElementById('lbCounter');
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');

  function openLb(imgs, idx) {
    lbImgs = imgs;
    showLbImg(idx);
    lb.classList.add('lb-open');
  }
  function closeLb() {
    lb.classList.remove('lb-open');
  }
  function showLbImg(idx) {
    lbIdx = (idx + lbImgs.length) % lbImgs.length;
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.93)';
    setTimeout(() => {
      lbImg.src = lbImgs[lbIdx].src;
      lbImg.alt = lbImgs[lbIdx].alt;
      lbCap.textContent = lbImgs[lbIdx].alt || '';
      lbCtr.textContent = lbImgs.length > 1 ? `${lbIdx + 1} / ${lbImgs.length}` : '';
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'scale(1)';
    }, 80);
    lbPrev.style.display = lbImgs.length > 1 ? 'flex' : 'none';
    lbNext.style.display = lbImgs.length > 1 ? 'flex' : 'none';
  }

  if (lb) {
    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click',  () => showLbImg(lbIdx - 1));
    lbNext.addEventListener('click',  () => showLbImg(lbIdx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    lbImg.style.transition = 'opacity 0.2s ease, transform 0.35s cubic-bezier(.34,1.56,.64,1)';
  }

  // ─── Global click delegation ───
  document.addEventListener('click', e => {
    // Skip pin buttons
    if (e.target.closest('.proj-pin-btn, .s-proj-pin-btn')) return;

    // Dev Mode project card click
    const devCard = e.target.closest('.project-card, .dev-proj-card');
    if (devCard && !e.target.closest('a, button:not(.project-card)')) {
      const strip = devCard.querySelector('.proj-imgs-strip');
      const clickedImg = e.target.closest('.proj-imgs-strip img');
      const startIdx = clickedImg && strip
        ? Array.from(strip.querySelectorAll('img')).indexOf(clickedImg)
        : 0;
      openPopout(devCard, Math.max(0, startIdx));
      return;
    }

    // Air Mode project card click
    const airCard = e.target.closest('.s-project, .s-proj-card');
    if (airCard && !e.target.closest('a, button:not(.s-project):not(.s-proj-card)')) {
      const imgWrap = airCard.querySelector('.s-proj-imgs');
      const clickedImg = e.target.closest('.s-proj-imgs img');
      const startIdx = clickedImg && imgWrap
        ? Array.from(imgWrap.querySelectorAll('img')).indexOf(clickedImg)
        : 0;
      openPopout(airCard, Math.max(0, startIdx));
      return;
    }
  });

  // ─── Keyboard ───
  document.addEventListener('keydown', e => {
    // Lightbox takes priority
    if (lb && lb.classList.contains('lb-open')) {
      if (e.key === 'Escape')     closeLb();
      if (e.key === 'ArrowRight') showLbImg(lbIdx + 1);
      if (e.key === 'ArrowLeft')  showLbImg(lbIdx - 1);
      return;
    }
    // Popout
    if (pop.classList.contains('pp-open')) {
      if (e.key === 'Escape')     closePopout();
      if (e.key === 'ArrowRight') goToSlide(ppIdx + 1);
      if (e.key === 'ArrowLeft')  goToSlide(ppIdx - 1);
    }
  });

  // ── Touch swipe for popout gallery ──
  let touchStartX = 0;
  pop.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  pop.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goToSlide(ppIdx + 1);
      else goToSlide(ppIdx - 1);
    }
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════════════
   LANDSCAPE TIMELINE — year navigation + position tracking
═══════════════════════════════════════════════════════ */
(function () {
  const roadmap  = document.getElementById('spaceRoadmap');
  if (!roadmap) return;
  const track    = document.getElementById('tlTrack');
  const nav      = document.getElementById('tlNav');
  const progress = document.getElementById('tlNavProgress');
  const prevBtn  = document.getElementById('tlPrev');
  const nextBtn  = document.getElementById('tlNext');
  if (!track || !nav) return;

  const items = Array.from(track.querySelectorAll('.tl-item'));
  const dots  = Array.from(nav.querySelectorAll('.tl-nav-dot'));
  const count = items.length;
  if (!count) return;
  let active = 0;

  function centerItem(i) {
    const item = items[Math.max(0, Math.min(i, count - 1))];
    if (!item) return;
    const trackRect = track.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const delta = (itemRect.left + itemRect.width / 2) - (trackRect.left + trackRect.width / 2);
    track.scrollTo({ left: track.scrollLeft + delta, behavior: 'smooth' });
  }

  function setActive(i) {
    active = Math.max(0, Math.min(i, count - 1));
    items.forEach((it, idx) => it.classList.toggle('tl-item--infocus', idx === active));
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === active);
      d.classList.toggle('done', idx < active);
    });
    if (prevBtn) prevBtn.disabled = active === 0;
    if (nextBtn) nextBtn.disabled = active === count - 1;
  }

  // Continuous progress bar — follows the exact scroll position for a smooth, firm fill
  function updateProgress() {
    if (!progress) return;
    const max = track.scrollWidth - track.clientWidth;
    const frac = max > 0 ? Math.min(Math.max(track.scrollLeft / max, 0), 1) : (active / Math.max(count - 1, 1));
    progress.style.width = (frac * 100) + '%';
  }

  function activeFromScroll() {
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let best = 0, bestDist = Infinity;
    items.forEach((it, idx) => {
      const r = it.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) { bestDist = d; best = idx; }
    });
    return best;
  }

  let raf = null;
  track.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; updateProgress(); setActive(activeFromScroll()); });
  }, { passive: true });
  window.addEventListener('resize', updateProgress);

  dots.forEach((d, idx) => d.addEventListener('click', () => centerItem(idx)));
  items.forEach((it, idx) => {
    it.addEventListener('click', () => centerItem(idx));
    it.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); centerItem(idx); }
    });
  });
  if (prevBtn) prevBtn.addEventListener('click', () => centerItem(active - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => centerItem(active + 1));

  // Start on the current year (2026), falling back to the in-progress milestone
  let startIdx = items.findIndex(it => it.dataset.year === '2026');
  if (startIdx < 0) startIdx = items.findIndex(it => it.classList.contains('tl-item--active'));
  setActive(startIdx >= 0 ? startIdx : 0);
  updateProgress();

  // Center the starting milestone once the section becomes visible (handles hidden tabs)
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { centerItem(active); updateProgress(); io.unobserve(roadmap); }
    });
  }, { threshold: 0.15 });
  io.observe(roadmap);
})();

/* ══════════════════════════════════════════════════════
   CONTINUOUS SCROLL SYSTEM — V6 PATCH
   Scroll-spy + page control dots for both modes
   ══════════════════════════════════════════════════════ */

(function initContinuousScroll() {

  /* ── CONFIG ── */
  const DEV_SECTIONS = [
    { id: 'tab-home',    label: 'Home',    tab: 'home'    },
    { id: 'tab-about',   label: 'About',   tab: 'about'   },
    { id: 'tab-events',  label: 'Events',  tab: 'events'  },
    { id: 'tab-works',   label: 'Works',   tab: 'works'   },
    { id: 'tab-contact', label: 'Contact', tab: 'contact' },
  ];
  const AIR_SECTIONS = [
    { id: 'stab-home',    label: 'Home',    stab: 'home'    },
    { id: 'stab-about',   label: 'About',   stab: 'about'   },
    { id: 'stab-works',   label: 'Works',   stab: 'works'   },
    { id: 'stab-contact', label: 'Contact', stab: 'contact' },
  ];

  const pageControl = document.getElementById('pageControl');
  let currentSections = [];
  let currentMode = document.documentElement.dataset.mode || 'dev';

  /* ── BUILD PAGE CONTROL DOTS ── */
  function buildPageControl(sections) {
    if (!pageControl) return;
    pageControl.innerHTML = '';

    sections.forEach((sec, i) => {
      const line = document.createElement('div');
      line.className = 'pc-line';
      line.dataset.target = sec.id;
      line.setAttribute('role', 'button');
      line.setAttribute('aria-label', 'Jump to ' + sec.label);
      line.setAttribute('tabindex', '0');

      const dot = document.createElement('div');
      dot.className = 'pc-dot';

      const label = document.createElement('span');
      label.className = 'pc-label';
      label.textContent = sec.label;

      line.appendChild(dot);
      line.appendChild(label);

      // Connector line between dots (except after last)
      if (i < sections.length - 1) {
        const conn = document.createElement('div');
        conn.className = 'pc-connector';
        line.appendChild(conn);
      }

      // Click to scroll to section
      line.addEventListener('click', () => scrollToSection(sec.id));
      line.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') scrollToSection(sec.id);
      });

      pageControl.appendChild(line);
    });

    currentSections = sections;
  }

  /* ── SCROLL TO SECTION ── */
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
    const top = el.getBoundingClientRect().top + window.scrollY - navH - 10;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* ── UPDATE ACTIVE DOT + NAV TAB on scroll ── */
  function updateActiveSection() {
    if (!currentSections.length) return;

    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
    const scrollMid = window.scrollY + navH + window.innerHeight * 0.25;

    let activeId = currentSections[0].id;

    currentSections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      if (el.getBoundingClientRect().top + window.scrollY <= scrollMid) {
        activeId = sec.id;
      }
    });

    // Update page control dots
    pageControl && pageControl.querySelectorAll('.pc-line').forEach(line => {
      line.classList.toggle('active', line.dataset.target === activeId);
    });

    // Update nav tabs
    const activeSec = currentSections.find(s => s.id === activeId);
    if (!activeSec) return;

    if (currentMode === 'dev') {
      document.querySelectorAll('.nav-tab').forEach(btn => {
        const isActive = btn.dataset.tab === activeSec.tab;
        btn.classList.toggle('scroll-active', isActive);
        btn.classList.toggle('active', isActive);
      });
    } else {
      document.querySelectorAll('.snav-tab').forEach(btn => {
        const isActive = btn.dataset.stab === activeSec.stab;
        btn.classList.toggle('scroll-active', isActive);
        btn.classList.toggle('active', isActive);
      });
    }
  }

  /* ── NAVBAR SCROLL EFFECT ── */
  function updateNavScrolled() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }

  /* ── INTERCEPT NAV TAB CLICKS → SCROLL instead of switching tab ── */
  function interceptNavClicks() {
    // Dev mode tabs
    document.querySelectorAll('.nav-tab[data-tab], .ftab[data-tab]').forEach(btn => {
      btn.addEventListener('click', e => {
        if (document.documentElement.dataset.scroll !== 'continuous') return;
        e.stopPropagation();
        scrollToSection('tab-' + btn.dataset.tab);
      }, true); // capture phase
    });

    // Air mode tabs
    document.querySelectorAll('.snav-tab[data-stab], .sftab[data-stab]').forEach(btn => {
      btn.addEventListener('click', e => {
        if (document.documentElement.dataset.scroll !== 'continuous') return;
        e.stopPropagation();
        scrollToSection('stab-' + btn.dataset.stab);
      }, true);
    });
  }

  /* ── INIT FOR CURRENT MODE ── */
  function initForMode(mode) {
    currentMode = mode;
    if (mode === 'dev') {
      buildPageControl(DEV_SECTIONS);
    } else {
      buildPageControl(AIR_SECTIONS);
    }
    // Trigger once to set initial state
    setTimeout(updateActiveSection, 100);
  }

  /* ── OBSERVE MODE CHANGES ── */
  const htmlObserver = new MutationObserver(() => {
    const newMode = document.documentElement.dataset.mode || 'dev';
    if (newMode !== currentMode) {
      initForMode(newMode);
      // After mode switch, scroll to top
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 400);
    }
  });
  htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });

  /* ── SCROLL LISTENER (throttled) ── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSection();
        updateNavScrolled();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', () => {
    // Give intros time to finish before setting up
    setTimeout(() => {
      interceptNavClicks();
      initForMode(document.documentElement.dataset.mode || 'dev');
      updateNavScrolled();
    }, 200);
  });

  // Also run immediately if DOM is already ready
  if (document.readyState !== 'loading') {
    setTimeout(() => {
      interceptNavClicks();
      initForMode(document.documentElement.dataset.mode || 'dev');
      updateNavScrolled();
    }, 300);
  }

})();

/* ══════════════════════════════════════════════════════
   CONTINUOUS SCROLL: Patch original tab-switchers
   Ensure [data-tab] and [data-stab] clicks scroll in
   continuous mode instead of showing/hiding panels.
   Also ensure all .reveal elements get observed globally.
   ══════════════════════════════════════════════════════ */
(function patchTabSwitchers() {
  // Wait for DOMContentLoaded before patching
  const patch = () => {
    if (document.documentElement.dataset.scroll !== 'continuous') return;

    // Override activateDevTab so it scrolls in continuous mode
    const _origDevTab = window.activateDevTab;
    window.activateDevTab = function(tabId) {
      if (document.documentElement.dataset.scroll === 'continuous') {
        const el = document.getElementById('tab-' + tabId);
        if (el) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
          const top = el.getBoundingClientRect().top + window.scrollY - navH - 10;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        return;
      }
      if (_origDevTab) _origDevTab(tabId);
    };

    // Override activateSimpleTab so it scrolls in continuous mode
    const _origSimpleTab = window.activateSimpleTab;
    window.activateSimpleTab = function(tabId) {
      if (document.documentElement.dataset.scroll === 'continuous') {
        const el = document.getElementById('stab-' + tabId);
        if (el) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
          const top = el.getBoundingClientRect().top + window.scrollY - navH - 10;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        return;
      }
      if (_origSimpleTab) _origSimpleTab(tabId);
    };

    // Observe ALL reveals immediately (since all panels are visible at once)
    if (typeof revealObserver !== 'undefined') {
      document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('visible')) revealObserver.observe(el);
      });
    }
    if (typeof airRevealObserver !== 'undefined') {
      document.querySelectorAll('.s-reveal').forEach(el => {
        if (!el.classList.contains('s-visible')) airRevealObserver.observe(el);
      });
    }
    if (typeof skillObserver !== 'undefined') {
      document.querySelectorAll('.skill-fill').forEach(f => skillObserver.observe(f));
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(patch, 500));
  } else {
    setTimeout(patch, 500);
  }
})();

/* ═══════════════════════════════════════════════════════
   3D CAROUSEL — Project Cards for Dev & Air Mode
   ═══════════════════════════════════════════════════════ */
(function () {

  /* ── Project data (thumbnail = first image of each project) ── */
  const PROJECTS = [
    {
      id: 'clickizenship',
      title: 'CLICKizenship',
      sub: 'Barangay DigiServices Request System',
      desc: 'Civic tech platform digitizing barangay government services with QR-based service flows, verification system for supporting files and documents, intuitive Admin Portal for barangay staffs, and a responsive web design for non-technical residents.',
      badge: 'Featured',
      tags: ['HTML5','CSS3','JavaScript','React','Apache','MySQL','PHP','AI Chatbot'],
      thumb: 'Images/Project Pictures/CLICKizenship  (3).png'
    },
    {
      id: 'glidego',
      title: "GlideN'Go",
      sub: 'Professional Fleet & Cold-Chain Logistics',
      desc: 'A logistics management platform for professional fleet operations and cold-chain delivery tracking with real-time route monitoring, delivery status, truck-aware smart rerouting and dashboard details.',
      badge: '',
      tags: ['HTML5','CSS3','JavaScript','FetchAPI','Node.js','UI/UX','Figma'],
      thumb: 'Images/Project Pictures/GlideNGo (1).png'
    },
    {
      id: 'lakbay',
      title: 'LAKbayGAbayPh',
      sub: 'Traversing Project 82 — MapaSayo Generator',
      desc: 'A data-driven travel web app featuring an interactive province map, travel notes, bucket list, long weekends carousel, and a KalenDAYO calendar with 2026 Philippine holidays. Firebase-powered cross-device sync.',
      badge: '',
      tags: ['HTML','CSS','JavaScript','Firebase','Firestore','Python','Maps'],
      thumb: 'Images/Project Pictures/LAKbayGAbayPh (1).png'
    },
    {
      id: 'ojt',
      title: 'OJT Attendance Tracker',
      sub: 'OJT Attendance Tracker System',
      desc: 'A QR-code based OJT attendance management system with real-time logging, reporting dashboard, and admin controls for internship monitoring.',
      badge: '',
      tags: ['Python','Flask','QR Code','SQL'],
      thumb: 'Images/Project Pictures/OJT ATS (3).png'
    },
    {
      id: 'passfolio',
      title: 'Passfolio in One',
      sub: 'Passport-Style Portfolio',
      desc: 'A passport-style personal portfolio featuring a travel-themed layout with achievement stamps, visa-page skills, and trip logs as career milestones.',
      badge: '',
      tags: ['HTML','CSS','JavaScript'],
      thumb: 'Images/Project Pictures/PassFolio Intro.png'
    },
    {
      id: 'gastadoor',
      title: 'GastaDoor',
      sub: 'Budget Manager App in your Home',
      desc: 'A budget manager app that helps you track your expenses, savings, and investments with an intuitive Android-friendly interface.',
      badge: '',
      tags: ['Google Apps Script','JSON','Java','Android App'],
      thumb: 'Images/Project Pictures/GastaDoor (1).png'
    },
    {
      id: 'bugtong2x',
      title: 'Bugtong2x',
      sub: 'Classic Filipino Riddle Game',
      desc: 'A Filipino riddle game featuring a collection of riddles from the Philippines with multiple difficulty levels and a scoring system.',
      badge: '',
      tags: ['TypeScript','Vite','Tailwind CSS','React','Express','Firebase'],
      thumb: 'Images/Project Pictures/Bugtong (1).png'
    }
  ];

  const CARD_W = 220;

  function getRadius(n) {
    // Circumradius: distance from center so cards don't overlap
    // r = (cardWidth / 2) / tan(π / n), add padding factor
    const r = Math.round((CARD_W / 2) / Math.tan(Math.PI / n)) + 60;
    // Cap for mobile
    return window.innerWidth <= 720 ? Math.min(r, 260) : Math.min(r, 500);
  }

  /* ── Build carousel cards ── */
  function buildCarousel(trackEl, mode) {
    trackEl.innerHTML = '';
    const n = PROJECTS.length;
    const r = getRadius(n);
    const angle = 360 / n;

    PROJECTS.forEach((proj, i) => {
      const card = document.createElement('div');
      card.className = 'c3d-card';
      card.style.transform = `rotateY(${angle * i}deg) translateZ(${r}px)`;
      card.setAttribute('data-proj-id', proj.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${proj.title}`);

      const img = document.createElement('img');
      img.src = proj.thumb;
      img.alt = proj.title;
      img.loading = 'lazy';

      const label = document.createElement('div');
      label.className = 'c3d-card-label';
      label.innerHTML = `${proj.title}<div class="c3d-card-sub">${proj.sub}</div>`;

      card.appendChild(img);
      card.appendChild(label);

      card.addEventListener('click', () => launchCard(card, proj, mode));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          launchCard(card, proj, mode);
        }
      });

      trackEl.appendChild(card);
    });
  }

  /* ── Unique click launch transition (card flies to center → opens popout) ── */
  let carouselLaunching = false;
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function launchCard(card, proj, mode) {
    const open = () => { if (window.openProjectPopoutById) window.openProjectPopoutById(proj.id); };

    if (prefersReducedMotion) { open(); return; }
    if (carouselLaunching) return;
    carouselLaunching = true;

    const isAir = mode === 'air';
    const scene = card.closest('.carousel3d-scene');

    // Freeze both carousels & dim the scene the card came from
    document.querySelectorAll('.carousel3d-track').forEach(t => t.classList.add('paused'));
    if (scene) scene.classList.add('c3d-launching');

    // Snapshot current on-screen position of the (rotating) card
    const rect = card.getBoundingClientRect();
    const w = card.offsetWidth || rect.width;
    const h = card.offsetHeight || rect.height;
    const startCx = rect.left + rect.width / 2;
    const startCy = rect.top + rect.height / 2;

    // Build a flat clone to animate toward the viewport center
    const clone = card.cloneNode(true);
    clone.className = 'c3d-fly-clone ' + (isAir ? 'c3d-fly-air' : 'c3d-fly-dev');
    clone.style.left = (startCx - w / 2) + 'px';
    clone.style.top  = (startCy - h / 2) + 'px';
    clone.style.width  = w + 'px';
    clone.style.height = h + 'px';
    document.body.appendChild(clone);

    // Full-screen burst flash for extra punch
    const burst = document.createElement('div');
    burst.className = 'c3d-launch-burst ' + (isAir ? 'is-air' : 'is-dev');
    document.body.appendChild(burst);
    burst.animate(
      [{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }],
      { duration: isAir ? 640 : 560, easing: 'ease-out' }
    );

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const targetW = Math.min(window.innerWidth * 0.6, 340);
    const scale = targetW / w;
    const tx = cx - startCx;
    const ty = cy - startCy;

    const duration = isAir ? 560 : 480;
    const midRot = isAir ? -6 : 7;

    const anim = clone.animate([
      { transform: 'translate(0px,0px) scale(1) rotate(0deg)' },
      { transform: `translate(${tx * 0.55}px, ${ty * 0.55 - 22}px) scale(${scale * 0.74}) rotate(${midRot}deg)`, offset: 0.55 },
      { transform: `translate(${tx}px, ${ty}px) scale(${scale}) rotate(0deg)` }
    ], { duration, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      open();
      // Let the popout fade in beneath, then dissolve the clone
      const out = clone.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 300, easing: 'ease', fill: 'forwards' }
      );
      const cleanup = () => {
        clone.remove();
        burst.remove();
        if (scene) scene.classList.remove('c3d-launching');
        carouselLaunching = false;
      };
      out.onfinish = cleanup;
      // Safety net if animation events are dropped
      setTimeout(cleanup, 500);
    };
    anim.onfinish = finish;
    setTimeout(() => { if (carouselLaunching && clone.isConnected) finish(); }, duration + 120);
  }

  /* ── Pause only while the cursor is over a card; spin continuously otherwise ── */
  function attachHoverPause(sceneEl, trackEl) {
    const isPopoutOpen = () => {
      const pop = document.getElementById('projPopout');
      return pop && pop.classList.contains('pp-open');
    };
    // Keep the ring frozen while a detail popout is open or a launch animation is playing
    const shouldStayPaused = () => isPopoutOpen() || carouselLaunching;

    // Pause the moment the pointer is over an actual card
    sceneEl.addEventListener('pointerover', e => {
      if (e.target.closest('.c3d-card')) trackEl.classList.add('paused');
    });
    // Resume when the pointer leaves the card (unless something else needs it paused)
    sceneEl.addEventListener('pointerout', e => {
      const leftCard = e.target.closest('.c3d-card');
      const enteredCard = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.c3d-card');
      if (leftCard && !enteredCard && !shouldStayPaused()) trackEl.classList.remove('paused');
    });

    // Safety net: if it's paused but the cursor isn't on a card (and nothing else holds it), resume
    document.addEventListener('mousemove', e => {
      if (!trackEl.classList.contains('paused')) return;
      if (shouldStayPaused()) return;
      if (!e.target.closest('.c3d-card')) trackEl.classList.remove('paused');
    }, { passive: true });
  }

  /* ── Modal open/close ── */
  const overlay  = document.getElementById('projModalOverlay');
  const closeBtn = document.getElementById('projModalClose');

  function openModal(proj) {
    // Pause both carousels
    document.querySelectorAll('.carousel3d-track').forEach(t => t.classList.add('paused'));

    document.getElementById('projModalThumb').src   = proj.thumb;
    document.getElementById('projModalThumb').alt   = proj.title;
    document.getElementById('projModalBadge').textContent  = proj.badge || '';
    document.getElementById('projModalTitle').textContent  = proj.title;
    document.getElementById('projModalSub').textContent    = proj.sub;
    document.getElementById('projModalDesc').textContent   = proj.desc;

    const tagsEl = document.getElementById('projModalTags');
    tagsEl.innerHTML = proj.tags.map(t => `<span>${t}</span>`).join('');

    overlay.classList.add('open');
    overlay.removeAttribute('aria-hidden');
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    // Resume both carousels
    document.querySelectorAll('.carousel3d-track').forEach(t => t.classList.remove('paused'));
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── Rebuild on resize to fix radius ── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const devTrack = document.getElementById('devCarouselTrack');
      const airTrack = document.getElementById('airCarouselTrack');
      if (devTrack) buildCarousel(devTrack, 'dev');
      if (airTrack) buildCarousel(airTrack, 'air');
    }, 200);
  });

  /* ── Init on DOMContentLoaded ── */
  function init() {
    const devScene = document.getElementById('devCarousel3d');
    const devTrack = document.getElementById('devCarouselTrack');
    const airScene = document.getElementById('airCarousel3d');
    const airTrack = document.getElementById('airCarouselTrack');

    if (devTrack) { buildCarousel(devTrack, 'dev'); attachHoverPause(devScene, devTrack); }
    if (airTrack) { buildCarousel(airTrack, 'air'); attachHoverPause(airScene, airTrack); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* Responsive continuous gallery speed
   Keep visible scroll speed (px/s) consistent across viewport sizes
*/
(function responsiveGallerySpeed() {
  const tracks = document.querySelectorAll('.s-pic-gallery-track');
  if (!tracks.length) return;

  tracks.forEach(track => {
    const cs = getComputedStyle(track);
    const initialDur = parseFloat(cs.animationDuration) || 24;

    // baseline pixels-per-second. If the calculated baseline is too low
    // (e.g. when loaded on a small viewport) fall back to a conservative value.
    let baselinePps = (track.scrollWidth * 0.5) / initialDur;
    if (!baselinePps || baselinePps < 60) baselinePps = 160; // px/s fallback
    track.dataset._baselinePps = baselinePps;

    function apply() {
      // compute the exact pixel shift (half the scrollable width — one sequence)
      const shift = track.scrollWidth * 0.5;
      // Bail while the track has no layout yet (hidden tab / not-yet-visible mode / images unloaded)
      if (!shift) return;
      track.style.setProperty('--gallery-shift', Math.round(shift) + 'px');

      const pps = parseFloat(track.dataset._baselinePps) || 160;
      const dur = shift / pps;
      // Use a larger minimum duration on small screens so motion feels slower
      const minDur = window.innerWidth <= 480 ? 12 : 6;
      const clamped = Math.max(minDur, Math.min(dur, 180));
      track.style.animationDuration = clamped.toFixed(2) + 's';
    }

    // Update after images load (they affect widths)
    track.querySelectorAll('img').forEach(img => {
      if (!img.complete) img.addEventListener('load', () => setTimeout(apply, 40));
    });

    // Recompute once the track actually gains a width — e.g. when Air Mode / its tab
    // becomes visible (its size goes from 0 → real), which the initial timer missed.
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => apply()).observe(track);
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) apply(); });
      }, { threshold: 0.01 });
      io.observe(track);
    }

    let to;
    window.addEventListener('resize', () => { clearTimeout(to); to = setTimeout(apply, 140); });

    // initial apply
    setTimeout(apply, 80);
  });
})();

/* ═══════════════════════════════════════════════════════
   EVENT GALLERY — 3D auto-play coverflow
═══════════════════════════════════════════════════════ */
(function eventGalleryCoverflow() {
  const roots = document.querySelectorAll('.eg-coverflow');
  if (!roots.length) return;
  roots.forEach(initCoverflow);

  function initCoverflow(root) {
    const stage = root.querySelector('.eg-stage');
    if (!stage) return;
    const cards = Array.from(stage.querySelectorAll('.eg-card'));
    const n = cards.length;
    if (!n) return;

    const dotsWrap = root.querySelector('.eg-dots');
    const prevBtn  = root.querySelector('.eg-prev');
    const nextBtn  = root.querySelector('.eg-next');
    const AUTOPLAY_MS = 3200;

    let active = 0;
    let paused = false;
    let timer = null;

    // Build dots
    const dots = [];
    if (dotsWrap) {
      cards.forEach((_, i) => {
        const b = document.createElement('button');
        b.className = 'eg-dot';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Go to image ' + (i + 1));
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    const SPACING = () => Math.min(300, Math.max(150, root.clientWidth * 0.24));

    function layout() {
      const gap = SPACING();
      cards.forEach((card, i) => {
        let off = i - active;
        if (off >  n / 2) off -= n;   // wrap to the shortest direction
        if (off < -n / 2) off += n;
        const abs = Math.abs(off);

        if (abs > 3) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.style.transform = `translateX(${off > 0 ? 140 : -140}%) scale(.5)`;
          card.classList.remove('eg-active');
          return;
        }

        const sign = off === 0 ? 0 : (off > 0 ? 1 : -1);
        const translate = off * gap;
        const rot = -sign * Math.min(abs, 3) * 22;
        const scale = Math.max(0.6, 1 - abs * 0.14);
        card.style.opacity = abs > 2 ? '0.28' : (abs > 0 ? '0.72' : '1');
        card.style.filter = abs > 0 ? `brightness(${(1 - abs * 0.12).toFixed(2)})` : 'none';
        card.style.transform = `translateX(${translate}px) translateZ(${-abs * 130}px) rotateY(${rot}deg) scale(${scale})`;
        card.style.zIndex = String(100 - abs);
        card.style.pointerEvents = 'auto';
        card.classList.toggle('eg-active', off === 0);
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === active));
    }

    function go(i) { active = ((i % n) + n) % n; layout(); restart(); }
    function next() { active = (active + 1) % n; layout(); }
    function start() { if (!timer) timer = setInterval(() => { if (!paused) next(); }, AUTOPLAY_MS); }
    function stop()  { clearInterval(timer); timer = null; }
    function restart() { stop(); start(); }

    prevBtn && prevBtn.addEventListener('click', () => go(active - 1));
    nextBtn && nextBtn.addEventListener('click', () => go(active + 1));
    cards.forEach((c, i) => c.addEventListener('click', () => { if (i !== active) go(i); }));

    root.addEventListener('pointerenter', () => { paused = true; });
    root.addEventListener('pointerleave', () => { paused = false; });
    window.addEventListener('resize', layout);

    layout();

    // Only autoplay while visible (perf + relevance)
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { layout(); start(); }
        else { stop(); }
      });
    }, { threshold: 0.12 });
    io.observe(root);
  }
})();
