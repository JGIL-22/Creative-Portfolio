/* ══════════════════════════════════════════════════════
   Gizmo — FurBot AI · v7.6
   John Gil Mayor Portfolio
   Bilingual (English + Filipino) · Dog mascot · No emojis
   ══════════════════════════════════════════════════════ */

(function initGizmo() {
  const toggle     = document.getElementById('gizmoToggle');
  const window_    = document.getElementById('gizmoWindow');
  const closeBtn   = document.getElementById('gizmoClose');
  const input      = document.getElementById('gizmoInput');
  const sendBtn    = document.getElementById('gizmoSend');
  const messages   = document.getElementById('gizmoMessages');
  const quickReplies = document.getElementById('gizmoQuickReplies');

  if (!toggle || !window_) return;

  let isOpen     = false;
  let hasGreeted = false;
  let chipBusy   = false;
  let lang       = 'en';
  let msgCount   = 0;
  let lastTopic  = null;

  const FIL_WORDS = /\b(ano|kumusta|kamusta|sino|saan|kailan|paano|bakit|anong|maganda|meron|may|ba|po|opo|salamat|hindi|oo|naman|yung|yun|ako|ikaw|siya|kami|tayo|kayo|sila|nag|mag|mga|ng|sa|na|at|kasi|para|lang|dito|doon|talaga|syempre|nandito|pwede|pwedeng|gusto|ayaw|baka|siguro|palagi|lagi|eto|ito|iyon|hayaan|sige|ganun|ganon|dba|di|wala|merong|bilang|bago|mabilis|mabait|magaling|galing|astig|grabe|sana|nawa|tulong|tanong|tanungin|portfolio|mode|trabaho|estudyante|graduate|fresh)\b/i;

  function detectLang(text) {
    if (FIL_WORDS.test(text)) return 'fil';
    if (/^(ano|kumusta|sino|saan|paano|bakit|maganda|meron|tulong)/i.test(text.trim())) return 'fil';
    return 'en';
  }

  const KB = {

    greet: {
      en: [
        "Woof! I'm **Gizmo**, John Gil's FurBot AI. Ask about his skills, projects, certifications, contact info, or about me.",
        "Hi! **Gizmo** here. I guide visitors through John Gil Mayor's portfolio in English or Filipino. Try asking about his projects, event gallery, or viewing modes.",
        "Hello! I'm **Gizmo**, John Gil's loyal FurBot. I know this portfolio inside out — background, tech stack, events, and contact details."
      ],
      fil: [
        "Woof! Ako si **Gizmo**, ang FurBot AI ni John Gil. Tanungin mo ako tungkol sa skills, projects, certifications, contact info, o tungkol sa akin.",
        "Kumusta! **Gizmo** ako. Gabay ko kayo sa portfolio ni John Gil Mayor sa English o Filipino. Subukan mong magtanong tungkol sa projects, event gallery, o viewing modes.",
        "Hello! Ako si **Gizmo**, ang tapat na FurBot ni John Gil. Alam ko ang buong portfolio — background, tech stack, events, at contact details."
      ]
    },

    name: {
      en: "Woof! I'm **Gizmo** — John Gil's FurBot AI and loyal **dog**. I help visitors explore this portfolio in **English** or **Filipino**. Ask me about John Gil's skills, projects, modes, or contact info — or ask about **me**.",
      fil: "Woof! Ako si **Gizmo** — ang FurBot AI at tapat na **aso** ni John Gil. Tinutulungan ko ang mga bisita sa portfolio na ito sa **English** o **Filipino**. Tanungin mo ako tungkol sa skills, projects, modes, o contact ni John Gil — o tungkol sa **akin**."
    },

    gizmo: {
      en: "**Gizmo Mayor — Pet Passport (DA-BAI)**\n\n**Full name:** Gizmo Mayor\n**Species:** Canine\n**Sex:** Male\n**Breed:** Japanese Spitz and Husky mix\n**Color:** Creamy white\n**Birthdate:** March 7, 2024\n**Origin:** Philippines\n**Furparent:** John Gil Mayor\n**Address:** Barangay San Isidro, Paranaque City, Metro Manila\n**Issued:** March 20, 2024\n**Expires:** March 20, 2029\n\nPassport photo: Gizmo Furbot AI/Gizmo Passport.png",
      fil: "**Gizmo Mayor — Pet Passport (DA-BAI)**\n\n**Buong pangalan:** Gizmo Mayor\n**Uri ng hayop:** Aso (Canine)\n**Kasarian:** Lalaki\n**Lahi:** Japanese Spitz at Husky mix\n**Kulay:** Creamy white\n**Kapanganakan:** March 7, 2024\n**Pinagmulan:** Pilipinas\n**Furparent:** John Gil Mayor\n**Address:** Barangay San Isidro, Paranaque City, Metro Manila\n**Petsa ng pagkakaloob:** March 20, 2024\n**Petsa ng pag-expire:** March 20, 2029\n\nLarawan: Gizmo Furbot AI/Gizmo Passport.png"
    },

    who: {
      en: "**John Gil Mayor** is a **fresh graduate in BSIT** from the **Polytechnic University of the Philippines (PUP) Paranaque**, Class of 2026.\n\nHe is a Full-Stack developer and UI/UX designer with hands-on experience in civic tech, government systems, hackathon builds, and mobile applications.\n\nHe is open to junior developer roles, and entry-level IT positions in Metro Manila.",
      fil: "Si **John Gil Mayor** ay **fresh graduate na BSIT** mula sa **Polytechnic University of the Philippines (PUP) Paranaque**, Class of 2026.\n\nSiya ay Full-Stack developer at UI/UX designer na may karanasan sa civic tech, government systems, hackathon builds, at mobile applications.\n\nBukas siya sa junior developer roles, at entry-level IT positions sa Metro Manila."
    },

    skills: {
      en: "**Skills & Tech Stack**\n\n**Focus:** Full-Stack Development, UI/UX Designing, Cybersecurity, Cloud Technologies, Project Management\n\n**Stack:** HTML/CSS, JavaScript/TypeScript, Python, PHP, SQL, React, Node.js, Flask, Figma, MySQL, Git\n\n**Tools:** Jira, Trello, Agile/Scrum\n\nSee **About** for skill bars and certifications.",
      fil: "**Skills & Tech Stack**\n\n**Focus:** Full-Stack Development, UI/UX Designing, Cybersecurity, Cloud Technologies, Project Management\n\n**Stack:** HTML/CSS, JavaScript/TypeScript, Python, PHP, SQL, React, Node.js, Flask, Figma, MySQL, Git\n\n**Tools:** Jira, Trello, Agile/Scrum\n\nTingnan ang **About** para sa skill bars at certifications."
    },

    mode: {
      en: "**Two Viewing Modes**\n\n__MODE_DEV__\n\n__MODE_AIR__\n\nToggle with the rocket/windmill button, top-right.",
      fil: "**Dalawang Viewing Mode**\n\n__MODE_DEV__\n\n__MODE_AIR__\n\nLumipat gamit ang rocket/windmill button sa kanang itaas."
    },

    projects: {
      en: "John Gil's featured projects (3D carousel in **Works** for both modes):\n\n**CLICKizenship** — Barangay digital services with QR flows and admin portal. Capstone Extension Project 2026.\n**GlideN'Go** — Fleet and cold-chain logistics app. GDG Build with AI Mini Hackathon **Champion** 2026.\n**LAKbayGAbayPh** — MapaSayo generator for Traversing Project 82.\n**OJT Attendance Tracker** — QR-based attendance with reports and admin controls.\n**PassFolio / Passfolio in One** — Passport-style portfolio with achievement stamps.\n**GastaDoor** — Home budget manager app (Google Apps Script, JSON, Java, Android).\n**Bugtong2x** — Classic Filipino riddle game.\n\nClick any card in the carousel for full details and screenshots.",
      fil: "Featured projects ni John Gil (3D carousel sa **Works** para sa both modes):\n\n**CLICKizenship** — Barangay digital services na may QR flows at admin portal. Capstone Extension Project 2026.\n**GlideN'Go** — Fleet at cold-chain logistics app. **Champion** sa GDG Build with AI Mini Hackathon 2026.\n**LAKbayGAbayPh** — MapaSayo generator para sa Traversing Project 82.\n**OJT Attendance Tracker** — QR-based attendance na may reports at admin controls.\n**PassFolio** — Passport-style portfolio na may achievement stamps.\n**GastaDoor** — Home budget manager app.\n**Bugtong2x** — Classic Filipino riddle game.\n\nI-click ang card sa carousel para sa buong detalye at screenshots."
    },

    contact: {
      en: "**Contact John Gil Mayor**\n\n**Email:** jmayor.devhub@gmail.com\n**Phone:** 09692980415\n**LinkedIn:** linkedin.com/in/john-myr22/\n**GitHub:** github.com/JGIL-22\n**Location:** Paranaque City, Metro Manila",
      fil: "**Contact John Gil Mayor**\n\n**Email:** jmayor.devhub@gmail.com\n**Phone:** 09692980415\n**LinkedIn:** linkedin.com/in/john-myr22/\n**GitHub:** github.com/JGIL-22\n**Location:** Paranaque City, Metro Manila"
    },

    hire: {
      en: "John Gil is **actively open to opportunities** as a fresh graduate.\n\nLooking for:\n- IT internships\n- Junior frontend / full-stack developer roles\n- UI/UX design positions\n- Collaborative projects and junior IT roles\n\nBased in **Paranaque City, Metro Manila** — open to onsite or remote.\n**Email:** jmayor.devhub@gmail.com | **Phone:** 09692980415",
      fil: "Si John Gil ay **aktibong naghahanap ng oportunidad** bilang fresh graduate.\n\nHinahanap:\n- IT internships\n- Junior frontend / full-stack developer roles\n- UI/UX design positions\n- Collaborative projects at junior IT roles\n\nNakatira sa **Paranaque City, Metro Manila** — bukas sa onsite o remote.\n**Email:** jmayor.devhub@gmail.com | **Phone:** 09692980415"
    },

    events: {
      en: "John Gil's **Event Gallery** (3D coverflow in Dev **Events** tab and Air **About** section) highlights:\n\n- GDG Cloud Manila and iAcademy Nexus\n- AWS Headquarters, BGC, Taguig\n- Philippine Blockchain Week 2026\n- Stellar PH x PBW 2026 — Ecosystem Day Winners and 3rd Place in Product Pitching\n- Cosmos 2026 GDG Pilot Event\n- Stellar Bootcamp 2026 with Google Developer Group\n- GDG Build with AI Mini Hackathon 2026 (GlideN'Go champion)\n- Capstone project and thesis defense\n\nPriority photos: Event Gallery images 3 through 7.",
      fil: "Ang **Event Gallery** ni John Gil (3D coverflow sa Dev **Events** at Air **About**) ay may:\n\n- GDG Cloud Manila at iAcademy Nexus\n- AWS Headquarters, BGC, Taguig\n- Philippine Blockchain Week 2026\n- Stellar PH x PBW 2026 — Ecosystem Day Winners at 3rd Place sa Product Pitching\n- Cosmos 2026 GDG Pilot Event\n- Stellar Bootcamp 2026 kasama ang Google Developer Group\n- GDG Build with AI Mini Hackathon 2026 (champion GlideN'Go)\n- Capstone project at thesis defense\n\nPriority photos: Event Gallery images 3 hanggang 7."
    },

    certifications: {
      en: "John Gil's **certifications** (see About in both modes):\n\n- Introduction to Cybersecurity — Cisco Networking Academy (2026)\n- Google Developer Group Build with AI Hackathon — **Champion** (2026)\n- Introduction to Fundamentals of Databases — Simplilearn | SkillUP (2024)\n- Transition to Web3 — Blockchain Basics — RiseIn | Stellar (2026)\n- Cyber Threat Intelligence Analysis (CTIA) Level III — TESDA | AMA (coming soon)\n- Modern Web Development, Bootstrap, Tailwind CSS, and PHP Basics — Ethel CPS (2026)\n- Network Support and Security — Cisco NetAcad (2026)\n- Responsive Web Design — freeCodeCamp (2026)\n- CyberSmart Pilipinas — DICT & ILCDB (2026)\n- Claude and Claude Code 101 — Anthropic (2026)\n\nBadges are also shown in Air Mode.",
      fil: "Mga **certification** ni John Gil (tingnan ang About sa both modes):\n\n- Introduction to Cybersecurity — Cisco Networking Academy (2026)\n- GDG Build with AI Hackathon — **Champion** (2026)\n- Introduction to Fundamentals of Databases — Simplilearn | SkillUP (2024)\n- Transition to Web3 — Blockchain Basics — RiseIn | Stellar (2026)\n- CTIA Level III — TESDA | AMA (coming soon)\n- Modern Web Development, Bootstrap, Tailwind CSS, PHP — Ethel CPS (2026)\n- Network Support and Security — Cisco NetAcad (2026)\n- Responsive Web Design — freeCodeCamp (2026)\n- CyberSmart Pilipinas — DICT & ILCDB (2026)\n- Claude and Claude Code 101 — Anthropic (2026)\n\nMay badges din sa Air Mode."
    },

    gdg: {
      en: "John Gil is active in **Google Developer Groups (GDG)** and related communities.\n\n- GDG Build with AI Mini Hackathon **Champion** 2026\n- GDG Cloud Manila and iAcademy Nexus events\n- Cosmos 2026 GDG Pilot Event\n- His **GDG ID card** is on the Dev Mode Home section\n- Affiliations marquee: GDG, DevKada Tech Community, AWS Cloud Clubs, CCIS, PUP",
      fil: "Aktibo si John Gil sa **Google Developer Groups (GDG)** at related communities.\n\n- **Champion** sa GDG Build with AI Mini Hackathon 2026\n- GDG Cloud Manila at iAcademy Nexus events\n- Cosmos 2026 GDG Pilot Event\n- Ang **GDG ID card** ay nasa Dev Mode Home section\n- Affiliations: GDG, DevKada Tech Community, AWS Cloud Clubs, CCIS, PUP"
    },

    organizations: {
      en: "John Gil's affiliations:\n\n- Polytechnic University of the Philippines (PUP) — BSIT\n- Google Developer Group (GDG)\n- DevKada Tech Community\n- CCIS Department\n- AWS Cloud Clubs\n- Cisco NetAcad (certifications)\n\nHe values community involvement alongside software development.",
      fil: "Mga affiliation ni John Gil:\n\n- Polytechnic University of the Philippines (PUP) — BSIT\n- Google Developer Group (GDG)\n- DevKada Tech Community\n- CCIS Department\n- AWS Cloud Clubs\n- Cisco NetAcad (certifications)\n\nPinahahalagahan niya ang community involvement kasabay ng software development."
    },

    school: {
      en: "John Gil completed **BSIT** at the **Polytechnic University of the Philippines (PUP) Paranaque** under **CCIS** — **Fresh Graduate, Class of 2026**.\n\nHe was **President's Lister** from 2023 to 2026.",
      fil: "Natapos ni John Gil ang **BSIT** sa **Polytechnic University of the Philippines (PUP) Paranaque** sa ilalim ng **CCIS** — **Fresh Graduate, Class of 2026**.\n\nSiya ay **President's Lister** mula 2023 hanggang 2026."
    },

    location: {
      en: "John Gil is based in **Paranaque City, Metro Manila, Philippines**. Open to onsite work in Metro Manila or remote opportunities.",
      fil: "Nakatira si John Gil sa **Paranaque City, Metro Manila, Philippines**. Bukas sa onsite sa Metro Manila o remote opportunities."
    },

    achievements: {
      en: "Top achievements:\n\n- **President's Lister** — PUP Paranaque (2023–2026)\n- **Capstone Extension Project 2026** — CLICKizenship\n- **GDG Build with AI Hackathon Champion** 2026 — GlideN'Go\n- **Stellar PH x PBW 2026** — Ecosystem Day Winners, 3rd Place Product Pitching\n- Cisco cybersecurity and networking certifications (2026)\n- Stellar Bootcamp 2026 — White Cloak Technologies\n- Cosmos 2026 participant",
      fil: "Mga pangunahing achievement:\n\n- **President's Lister** — PUP Paranaque (2023–2026)\n- **Capstone Extension Project 2026** — CLICKizenship\n- **GDG Build with AI Hackathon Champion** 2026 — GlideN'Go\n- **Stellar PH x PBW 2026** — Ecosystem Day Winners, 3rd Place Product Pitching\n- Cisco cybersecurity at networking certifications (2026)\n- Stellar Bootcamp 2026 — White Cloak Technologies\n- Cosmos 2026 participant"
    },

    python: {
      en: "John Gil uses **Python** for data work, Flask backends, automation, and academic projects. The Dev Mode **About** section includes a live Python code viewer. The OJT Attendance Tracker uses Python + Flask.",
      fil: "Ginagamit ni John Gil ang **Python** para sa data work, Flask backends, automation, at academic projects. May live Python code viewer sa Dev Mode **About**. Ang OJT Attendance Tracker ay gumagamit ng Python + Flask."
    },

    resume: {
      en: "You can download John Gil's resume from the **Contact** section in Dev Mode — file: **JohnGilMayor_Dev_Resume.pdf**. You can also email him at jmayor.devhub@gmail.com.",
      fil: "Pwede mong i-download ang resume ni John Gil sa **Contact** section ng Dev Mode — file: **JohnGilMayor_Dev_Resume.pdf**. Pwede ring mag-email sa jmayor.devhub@gmail.com."
    },

    fun: {
      en: [
        "John Gil built this entire portfolio in **pure HTML, CSS, and JavaScript** — including two complete viewing modes, 3D carousels, event gallery coverflow, and me, Gizmo the dog.",
        "His capstone **CLICKizenship** was selected as an **Extension Project for 2026** to serve a real barangay community.",
        "He both **designs in Figma** and **codes the UI himself** — a useful combo for product-minded developers.",
        "The portfolio uses **continuous scroll** — all sections on one page with side navigation dots in both modes."
      ],
      fil: [
        "Ginawa ni John Gil ang buong portfolio sa **pure HTML, CSS, at JavaScript** — kasama ang dalawang viewing modes, 3D carousels, event gallery coverflow, at ako, si Gizmo na aso.",
        "Ang capstone niyang **CLICKizenship** ay napili bilang **Extension Project para sa 2026** para sa tunay na barangay community.",
        "Kaya niyang **mag-design sa Figma** at **mag-code ng UI** — magandang kombinasyon para sa product-minded developers.",
        "Gumagamit ang portfolio ng **continuous scroll** — lahat ng sections sa isang page na may side navigation dots."
      ]
    },

    help: {
      en: "I can help with:\n\n- **About Gizmo** — my identity, breed, birthday, pet passport\n- **About John Gil** — fresh graduate, PUP BSIT 2026\n- **Dev Mode vs Air Mode** — who each mode is for\n- **Skills** — tech stack and tools\n- **Projects** — CLICKizenship, GlideN'Go, GastaDoor, Bugtong2x, and more\n- **Certifications** — Cisco, GDG, Claude, CyberSmart, freeCodeCamp\n- **Events & gallery** — PBW, Stellar, GDG, Cosmos\n- **Contact** — email, phone, social links\n- **Hire** — internships and junior roles\n- **Resume** — download in Dev Mode Contact\n\nType in **English** or **Filipino** — I understand both.",
      fil: "Matutulungan kita sa:\n\n- **Tungkol kay Gizmo** — identity, lahi, birthday, pet passport\n- **Tungkol kay John Gil** — fresh graduate, PUP BSIT 2026\n- **Dev Mode vs Air Mode** — para kanino ang bawat mode\n- **Skills** — tech stack at tools\n- **Projects** — CLICKizenship, GlideN'Go, GastaDoor, Bugtong2x, at iba pa\n- **Certifications** — Cisco, GDG, Claude, CyberSmart, freeCodeCamp\n- **Events & gallery** — PBW, Stellar, GDG, Cosmos\n- **Contact** — email, phone, social links\n- **Hire** — internships at junior roles\n- **Resume** — download sa Dev Mode Contact\n\nMag-type sa **English** o **Filipino** — naiintindihan ko pareho."
    },

    thanks: {
      en: [
        "You're welcome! Anything else about John Gil's portfolio?",
        "Happy to help. Ask me about projects, modes, or contact info anytime.",
        "Woof! Glad I could help. What else would you like to know?"
      ],
      fil: [
        "Walang anuman! May iba pa bang gusto mong malaman tungkol sa portfolio?",
        "Masaya akong tumulong. Magtanong lang tungkol sa projects, modes, o contact info.",
        "Woof! Natuwa akong makatulong. Ano pa ang gusto mong malaman?"
      ]
    },

    fallback: {
      en: [
        "I'm not sure about that one. Try asking about **skills**, **projects**, **Dev Mode vs Air Mode**, **certifications**, **events**, or **contact**.",
        "Woof — that's outside my dog brain. I know a lot about John Gil's portfolio though. Type **help** to see topics I cover.",
        "Hmm, I didn't catch that. Ask about his **tech stack**, **GlideN'Go**, **GastaDoor**, **fresh graduate** background, or how to **hire** him."
      ],
      fil: [
        "Hindi ako sigurado doon. Subukang magtanong tungkol sa **skills**, **projects**, **Dev Mode vs Air Mode**, **certifications**, **events**, o **contact**.",
        "Woof — wala sa aking asong utak iyan. Marami akong alam tungkol sa portfolio ni John Gil. I-type ang **tulong** para sa mga topic.",
        "Hmm, hindi ko naintindihan. Magtanong tungkol sa **tech stack**, **about**, **contacts**,  o kung paano siya **makilala**."
      ]
    }
  };

  const QUICK_CHIPS = {
    gizmo: {
      label: 'Gizmo',
      kb: 'gizmo'
    },
    skills: {
      label: 'Skills & Tech Stack',
      kb: 'skills',
      tab: { dev: 'about', air: 'about' },
      anchor: { dev: 'jg-about-skills', air: 'jg-air-skills' }
    },
    modes: {
      label: 'Modes',
      kb: 'mode'
    },
    contact: {
      label: 'Contact',
      kb: 'contact',
      tab: { dev: 'contact', air: 'contact' },
      anchor: { dev: 'jg-dev-contact-links', air: 'jg-air-contact-info' }
    }
  };

  function setQuickRepliesVisible(show) {
    if (!quickReplies) return;
    quickReplies.classList.toggle('gizmo-quick-replies--hidden', !show);
    quickReplies.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  function boldHtml(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  function formatBotMessage(text, L) {
    const modeDev = L === 'fil'
      ? '<div class="gizmo-mode-item"><strong>Dev Mode</strong><span>Dark, tech-focused. Para sa developers at IT teams.</span></div>'
      : '<div class="gizmo-mode-item"><strong>Dev Mode</strong><span>Dark and tech-focused. Built for developers and IT teams.</span></div>';
    const modeAir = L === 'fil'
      ? '<div class="gizmo-mode-item"><strong>Air Mode</strong><span>Light, corporate. Para sa HR at recruiters.</span></div>'
      : '<div class="gizmo-mode-item"><strong>Air Mode</strong><span>Light and corporate. Built for HR and recruiters.</span></div>';

    if (text.includes('__MODE_DEV__')) {
      const lines = text.split('\n').filter(l => l.trim() && !l.includes('__MODE_'));
      const lead = lines[0] || '';
      const note = lines[lines.length - 1] || '';
      return `<div class="gizmo-lead">${boldHtml(lead)}</div><div class="gizmo-mode">${modeDev}${modeAir}</div><div class="gizmo-note">${boldHtml(note)}</div>`;
    }

    const rows = text.split('\n').filter(Boolean);
    const rowLines = rows.filter(l => /^\*\*.+:\*\*/.test(l));

    if (rowLines.length >= 2) {
      const lead = rows.find(l => /^\*\*[^*]+\*\*$/.test(l.trim()));
      const body = rowLines.map(line => {
        const m = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
        return m ? `<div class="gizmo-row"><span class="gizmo-k">${m[1]}</span><span class="gizmo-v">${m[2]}</span></div>` : '';
      }).join('');
      const note = rows.find(l => /^See |^Tingnan |^Passport |^Larawan:/.test(l));
      return `${lead ? `<div class="gizmo-lead">${boldHtml(lead)}</div>` : ''}${body}${note ? `<div class="gizmo-note">${boldHtml(note)}</div>` : ''}`;
    }

    return boldHtml(text).replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }

  function getPortfolioMode() {
    return document.documentElement.getAttribute('data-mode') === 'air' ? 'air' : 'dev';
  }

  function scrollToAnchor(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 70;
    const top = el.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  function goToChipTarget(chip) {
    if (!chip.tab) return;
    const mode = getPortfolioMode();
    const tab = chip.tab[mode];
    const anchor = chip.anchor && chip.anchor[mode];

    if (mode === 'dev' && typeof activateDevTab === 'function') activateDevTab(tab);
    else if (mode === 'air' && typeof activateSimpleTab === 'function') activateSimpleTab(tab);

    setTimeout(() => { if (anchor) scrollToAnchor(anchor); }, 520);
  }

  function isJohnGilQuery(m) {
    return /john gil|tungkol kay john|about john|who is john|sino si john|sino si gil|sino si mayor|who is mayor|who is gil|tell me about john|si john\b/i.test(m);
  }

  function isGizmoQuery(m) {
    if (isJohnGilQuery(m)) return false;
    return /gizmo mayor|gizmo|furbot|who are you|what are you|sino ka|ano ka|ikaw ba|tungkol sa iyo|about yourself|tell me about yourself|kwento mo|passport|pasaporte|microchip|breed|lahi|birthday|kapanganakan|petsa ng kapanganakan|creamy white|japanese spitz|husky|may-ari mo|your owner|gizmo.*owner|owner.*gizmo|aso ba ikaw|ikaw bang aso|virtual dog|virtual na aso|sino si gizmo|who is gizmo|ano ang lahi|ilan taon ka na|how old are you|kelan ka pinanganak/i.test(m);
  }

  function getResponse(msg) {
    const m = msg.toLowerCase().trim();
    lang = detectLang(msg);
    const L = lang;
    msgCount++;

    const t = (key) => {
      const node = KB[key];
      if (!node) return null;
      if (Array.isArray(node[L])) return rand(node[L]);
      return node[L] || node.en;
    };

    const match = (key, re) => {
      if (re.test(m)) { lastTopic = key; return t(key); }
      return null;
    };

    let r;
    if (/^(hi|hello|hey|yo|sup|hoy|uy|kamusta|kumusta|musta|good morning|good afternoon|good evening|magandang|maayong)/i.test(m))
      return t('greet');

    if (isGizmoQuery(m)) {
      if (/who are you|what are you|sino ka|ano ka|ikaw ba|about yourself|tungkol sa iyo|sino si gizmo|who is gizmo/i.test(m))
        return (lastTopic = 'name', t('name'));
      return (lastTopic = 'gizmo', t('gizmo'));
    }

    if ((r = match('who', /who is john|sino si john|about john|tungkol kay john|tell me about john|about him|background|fresh graduate|graduate|bsit|estudyante|profile|bio/i))) return r;
    if ((r = match('mode', /dev mode|air mode|viewing mode|portfolio mode|dalawang mode|switch mode|dark mode|light mode|corporate mode|recruiter|hiring team|developer mode|tech mode|rocket|windmill|^modes$/i))) return r;
    if ((r = match('school', /pup|polytechnic|university|school|college|ccis|campus|paaralan|unibersidad|class of 2026/i)) && !/org|event/.test(m)) return r;
    if ((r = match('skills', /skill|tech stack|techstack|kakayahan|full.?stack|ui\/?ux|cybersecurity|cloud tech|project manag/i))) {
      goToChipTarget(QUICK_CHIPS.skills);
      return r;
    }
    if ((r = match('projects', /project|work|clickiz|glide|lakbay|ojt|passfolio|gasta|bugtong|build|system|platform|app|carousel|gawa|nagawa|hackathon/i))) return r;
    if ((r = match('hire', /hire|internship|job|opportunity|recruit|looking|position|junior|available|work|bakante|trabaho|open to/i))) return r;
    if ((r = match('contact', /contact|email|phone|number|reach|linkedin|github|facebook|instagram|social|makipag-ugnayan|numero|telepono/i)) && !/hire/.test(m)) {
      goToChipTarget(QUICK_CHIPS.contact);
      return r;
    }
    if ((r = match('events', /event|colloquium|cosmos|stellar|bootcamp|gallery|coverflow|pbw|blockchain|aws|photo|larawan|event gallery/i))) return r;
    if ((r = match('gdg', /gdg|google developer|developer group/i))) return r;
    if ((r = match('certifications', /cert|cisco|badge|credential|netacad|certification|sertipiko|claude|anthropic|cybersmart|freecodecamp|tesda/i))) return r;
    if ((r = match('organizations', /org|organization|affiliated|club|society|association|samahan|miyembro|devkada|aws cloud/i))) return r;
    if ((r = match('python', /python|flask|pandas|matplotlib|snippet|code viewer/i))) return r;
    if ((r = match('location', /location|address|where|city|manila|paranaque|live|nakatira|saan.*nakatira|lugar/i))) return r;
    if ((r = match('achievements', /achieve|award|honor|lister|president|recogni|panalo|nanalo|accomplishment|tagumpay|champion/i))) return r;
    if ((r = match('resume', /resume|cv|download.*pdf|john gil mayor.*pdf/i))) return r;
    if ((r = match('fun', /fun|joke|cool|wow|nice|amazing|interesting|trivia|random|kwento|alam mo ba/i))) return r;
    if ((r = match('thanks', /thank|thanks|salamat|ty|thx|maraming salamat|pasalamat/i))) return r;
    if ((r = match('help', /help|what can|what do|ask|guide|tulong|ano.*pwede|pwede.*tanungin/i))) return r;

    if (m.length < 5 && lastTopic) return t(lastTopic);

    return t('fallback');
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function addMessage(text, type, L) {
    const msg = document.createElement('div');
    msg.className = `gizmo-msg ${type}`;
    if (type === 'bot') {
      msg.innerHTML = formatBotMessage(text, L || lang);
    } else {
      msg.textContent = text;
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'gizmo-msg bot gizmo-typing';
    typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    typing.id = 'gizmoTyping';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    if (!document.getElementById('gizmoTypingStyle')) {
      const style = document.createElement('style');
      style.id = 'gizmoTypingStyle';
      style.textContent = `
        .gizmo-typing { display:flex;gap:5px;align-items:center;padding:12px 16px!important;width:fit-content; }
        .typing-dot { width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.4);animation:typingBounce 1.2s ease-in-out infinite; }
        .typing-dot:nth-child(2){animation-delay:.2s;}
        .typing-dot:nth-child(3){animation-delay:.4s;}
        @keyframes typingBounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-6px);background:rgba(109,40,217,.7);}}
      `;
      document.head.appendChild(style);
    }
  }

  function removeTypingIndicator() {
    const el = document.getElementById('gizmoTyping');
    if (el) el.remove();
  }

  function sendMessage(text) {
    if (!text.trim() || chipBusy) return;

    addMessage(text, 'user');
    input.value = '';
    setQuickRepliesVisible(false);
    showTypingIndicator();

    const delay = 700 + Math.random() * 700;
    setTimeout(() => {
      removeTypingIndicator();
      const reply = getResponse(text);
      addMessage(reply, 'bot', lang);
      setQuickRepliesVisible(true);
    }, delay);
  }

  function handleQuickChip(key) {
    const chip = QUICK_CHIPS[key];
    if (!chip || chipBusy) return;

    chipBusy = true;
    lang = detectLang(chip.label);
    setQuickRepliesVisible(false);
    addMessage(chip.label, 'user');
    showTypingIndicator();

    const delay = 450 + Math.random() * 350;
    setTimeout(() => {
      removeTypingIndicator();
      const node = KB[chip.kb];
      const reply = node && (node[lang] || node.en);
      addMessage(reply || rand(KB.fallback.en), 'bot', lang);
      goToChipTarget(chip);
      chipBusy = false;
      setQuickRepliesVisible(true);
    }, delay);
  }

  document.querySelectorAll('.gizmo-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.quick;
      if (QUICK_CHIPS[key]) handleQuickChip(key);
    });
  });

  function openChat() {
    isOpen = true;
    window_.classList.add('gizmo-open');
    window_.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    const dot = toggle.querySelector('.gizmo-notif-dot');
    if (dot) dot.style.display = 'none';
    input.focus();
    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(() => addMessage(rand(KB.greet.en), 'bot', 'en'), 400);
    }
  }

  function closeChat() {
    isOpen = false;
    window_.classList.remove('gizmo-open');
    window_.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click',  () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeChat(); });

  sendBtn.addEventListener('click',  () => sendMessage(input.value));
  input.addEventListener('keydown',  e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
  });

})();
