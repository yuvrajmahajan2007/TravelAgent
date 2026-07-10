/**
 * TravelGenie AI — script.js
 * Full-featured premium travel app.
 * IBM watsonx Orchestrate is the ONLY AI component.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   DATA — Destinations
═══════════════════════════════════════════════════════════ */
var WORLD_DESTINATIONS = [
  { name:'Paris',        country:'France',        emoji:'🗼', rating:'4.9', price:'From $1,200', badge:'Trending',  img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
  { name:'Dubai',        country:'UAE',            emoji:'🏙', rating:'4.8', price:'From $900',  badge:'Hot Deal',  img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
  { name:'Tokyo',        country:'Japan',          emoji:'⛩️', rating:'4.9', price:'From $1,400', badge:'Popular',  img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80' },
  { name:'Bali',         country:'Indonesia',      emoji:'🌴', rating:'4.8', price:'From $700',  badge:'Trending',  img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
  { name:'Switzerland',  country:'Europe',         emoji:'🏔️', rating:'4.9', price:'From $1,800', badge:'Luxury',  img:'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80' },
  { name:'Maldives',     country:'South Asia',     emoji:'🏝️', rating:'5.0', price:'From $2,200', badge:'Luxury',  img:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80' },
  { name:'New York',     country:'USA',            emoji:'🗽', rating:'4.7', price:'From $1,100', badge:'Popular', img:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80' },
  { name:'London',       country:'UK',             emoji:'🎡', rating:'4.7', price:'From $1,000', badge:'Classic', img:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80' },
  { name:'Singapore',    country:'Asia',           emoji:'🌆', rating:'4.8', price:'From $950',  badge:'Modern',   img:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80' },
  { name:'Rome',         country:'Italy',          emoji:'🏛️', rating:'4.8', price:'From $900',  badge:'Historic', img:'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
  { name:'Santorini',    country:'Greece',         emoji:'🤍', rating:'4.9', price:'From $1,500', badge:'Romantic', img:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80' },
  { name:'Cappadocia',   country:'Turkey',         emoji:'🎈', rating:'4.9', price:'From $800',  badge:'Unique',   img:'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80' }
];

var INDIA_DESTINATIONS = [
  { name:'Kashmir',    country:'Jammu & Kashmir', emoji:'🏔️', rating:'5.0', price:'From ₹25,000', badge:'Paradise', img:'https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=600&q=80' },
  { name:'Goa',        country:'Goa',             emoji:'🏖️', rating:'4.7', price:'From ₹12,000', badge:'Beach',    img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80' },
  { name:'Ladakh',     country:'J & K / Ladakh',  emoji:'🏔️', rating:'5.0', price:'From ₹30,000', badge:'Adventure',img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80' },
  { name:'Kerala',     country:'Kerala',           emoji:'🌿', rating:'4.9', price:'From ₹18,000', badge:'God\'s Own', img:'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=600&q=80' },
  { name:'Manali',     country:'Himachal Pradesh', emoji:'❄️', rating:'4.8', price:'From ₹15,000', badge:'Trending', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { name:'Jaipur',     country:'Rajasthan',        emoji:'🏰', rating:'4.8', price:'From ₹10,000', badge:'Heritage', img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80' }
];

var WEATHER_DATA = [
  { city:'Paris',       icon:'🌤️', info:'Avg 18°C · Spring (Mar–May)', best:'Best: Apr–Jun' },
  { city:'Dubai',       icon:'☀️', info:'Avg 25°C · Winter (Nov–Mar)', best:'Best: Oct–Apr' },
  { city:'Tokyo',       icon:'🌸', info:'Avg 20°C · Spring (Mar–May)', best:'Best: Mar–May' },
  { city:'Maldives',    icon:'🏝️', info:'Avg 30°C · Dry (Nov–Apr)',    best:'Best: Nov–Apr' },
  { city:'Switzerland', icon:'🌨️', info:'Avg 10°C · Summer (Jun–Sep)', best:'Best: Jun–Aug' },
  { city:'Goa',         icon:'🌊', info:'Avg 32°C · Winter (Oct–Mar)', best:'Best: Nov–Feb' },
  { city:'Kashmir',     icon:'❄️', info:'Avg 12°C · Summer (May–Sep)', best:'Best: Apr–Oct' },
  { city:'Bali',        icon:'🌴', info:'Avg 28°C · Dry (Apr–Oct)',    best:'Best: Apr–Oct' }
];

/* ═══════════════════════════════════════════════════════════
   LOADING SCREEN
═══════════════════════════════════════════════════════════ */
(function () {
  var screen = document.getElementById('loadScreen');
  var bar    = document.getElementById('loadBar');
  var status = document.getElementById('loadStatus');
  if (!screen) return;

  var msgs = ['Initialising…', 'Loading destinations…', 'Connecting to watsonx…', 'All systems ready ✓'];
  var p = 0, idx = 0;
  var STEPS = 55, MS = 1700 / 55;

  var t = setInterval(function () {
    p++;
    var pct = Math.min(100, Math.round(p / STEPS * 100));
    bar.style.width = pct + '%';
    if (pct >= 20 && idx < 1) { idx = 1; status.textContent = msgs[1]; }
    if (pct >= 50 && idx < 2) { idx = 2; status.textContent = msgs[2]; }
    if (pct >= 85 && idx < 3) { idx = 3; status.textContent = msgs[3]; }
    if (p >= STEPS) {
      clearInterval(t);
      setTimeout(function () { screen.classList.add('done'); }, 350);
    }
  }, MS);
})();

/* ═══════════════════════════════════════════════════════════
   THEME — Dark / Light
═══════════════════════════════════════════════════════════ */
var html       = document.documentElement;
var themeToggle = document.getElementById('themeToggle');
var themeIco    = document.getElementById('themeIco');
var themeLabel  = document.getElementById('themeLabel');
var darkToggle  = document.getElementById('darkToggle');

/* Always start in light mode */
localStorage.setItem('tg_theme', 'light');
var currentTheme = 'light';
applyTheme(currentTheme);

function applyTheme(t) {
  currentTheme = t;
  html.setAttribute('data-theme', t);
  localStorage.setItem('tg_theme', t);
  if (themeIco)    themeIco.textContent   = t === 'dark' ? '🌙' : '☀️';
  if (themeLabel)  themeLabel.textContent = t === 'dark' ? 'Dark Mode' : 'Light Mode';
  if (darkToggle)  darkToggle.checked     = t === 'dark';
}

if (themeToggle) themeToggle.addEventListener('click', function () { applyTheme(currentTheme === 'dark' ? 'light' : 'dark'); });
if (darkToggle)  darkToggle.addEventListener('change', function () { applyTheme(darkToggle.checked ? 'dark' : 'light'); });

/* ═══════════════════════════════════════════════════════════
   THEME COLOUR
═══════════════════════════════════════════════════════════ */
var savedColour = localStorage.getItem('tg_colour') || 'purple';
applyColour(savedColour);

function applyColour(c) {
  html.setAttribute('data-colour', c);
  localStorage.setItem('tg_colour', c);
  document.querySelectorAll('.colour-dot').forEach(function (dot) {
    dot.classList.toggle('active', dot.getAttribute('data-colour') === c);
  });
}

document.querySelectorAll('.colour-dot').forEach(function (dot) {
  dot.addEventListener('click', function () { applyColour(dot.getAttribute('data-colour')); });
});

/* ═══════════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════════ */
var sidebar       = document.getElementById('sidebar');
var sidebarToggle = document.getElementById('sidebarToggle');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('open');
  });
}

/* Close sidebar when clicking outside on mobile */
document.addEventListener('click', function (e) {
  if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

/* Sidebar nav active state */
document.querySelectorAll('.nav-item').forEach(function (item) {
  item.addEventListener('click', function () {
    document.querySelectorAll('.nav-item').forEach(function (i) { i.classList.remove('active'); });
    item.classList.add('active');
    if (window.innerWidth <= 768) sidebar.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════════════════════
   PARTICLES BACKGROUND
═══════════════════════════════════════════════════════════ */
(function () {
  var container = document.getElementById('particles');
  if (!container) return;
  var colours = ['rgba(124,92,216,0.4)','rgba(59,130,212,0.4)','rgba(52,211,153,0.35)','rgba(240,147,251,0.35)'];
  for (var i = 0; i < 30; i++) {
    var el = document.createElement('div');
    el.className = 'particle';
    var size = Math.random() * 6 + 3;
    el.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + Math.random() * 100 + '%',
      'background:' + colours[Math.floor(Math.random() * colours.length)],
      'animation-duration:' + (Math.random() * 18 + 12) + 's',
      'animation-delay:' + (Math.random() * 10) + 's'
    ].join(';');
    container.appendChild(el);
  }
})();

/* ═══════════════════════════════════════════════════════════
   SHOOTING STARS
═══════════════════════════════════════════════════════════ */
(function () {
  var container = document.getElementById('shootingStars');
  if (!container) return;
  for (var i = 0; i < 12; i++) {
    var star = document.createElement('div');
    star.className = 'star';
    var length  = Math.random() * 120 + 60;   /* 60–180px tail */
    var dur     = Math.random() * 6  + 5;     /* 5–11s duration */
    var delay   = Math.random() * 20;          /* 0–20s delay */
    var top     = Math.random() * 60;          /* spawn in top 60% */
    var left    = Math.random() * 80;          /* spread across width */
    star.style.cssText = [
      'height:'            + length + 'px',
      'top:'               + top    + '%',
      'left:'              + left   + '%',
      'animation-duration:'+ dur    + 's',
      'animation-delay:'   + delay  + 's'
    ].join(';');
    container.appendChild(star);
  }
})();

/* ═══════════════════════════════════════════════════════════
   DESTINATION CARDS — render
═══════════════════════════════════════════════════════════ */
function renderDestinations(data, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  /* Skeleton while "loading" */
  var skels = '';
  for (var s = 0; s < 6; s++) {
    skels += '<div class="dest-card"><div class="skel-img skeleton"></div><div style="padding:16px"><div class="skel-line skeleton"></div><div class="skel-line short skeleton"></div></div></div>';
  }
  container.innerHTML = skels;

  setTimeout(function () {
    var html = '';
    data.forEach(function (d, i) {
      var saved = getSavedTrips().indexOf(d.name) !== -1;
      html += '<div class="dest-card reveal" style="transition-delay:' + (i * 0.06) + 's">' +
        '<div class="dest-img-wrap">' +
          '<img src="' + d.img + '" alt="' + d.name + '" loading="lazy" onerror="this.parentNode.innerHTML=\'<div class=dest-img-fallback><span>' + d.emoji + '</span><span>' + d.name + '</span></div>\'">' +
          '<div class="dest-img-overlay"></div>' +
          '<span class="dest-badge">' + d.badge + '</span>' +
          '<button class="dest-fav' + (saved ? ' active' : '') + '" data-dest="' + d.name + '" title="Save trip" aria-label="Save ' + d.name + '">' +
            (saved ? '❤️' : '🤍') +
          '</button>' +
        '</div>' +
        '<div class="dest-body">' +
          '<div class="dest-name">' + d.name + '</div>' +
          '<div class="dest-country">📍 ' + d.country + '</div>' +
          '<div class="dest-meta">' +
            '<span class="dest-rating">⭐ ' + d.rating + '</span>' +
            '<span class="dest-price">' + d.price + '</span>' +
          '</div>' +
          '<button class="dest-ai-btn ripple" data-prompt="Plan a trip to ' + d.name + ', ' + d.country + '. Give me a detailed itinerary, best hotels, must-see attractions and travel tips.">🤖 Plan this trip with AI</button>' +
        '</div>' +
      '</div>';
    });
    container.innerHTML = html;
    /* Re-observe new cards */
    container.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
    /* Re-attach fav listeners */
    attachFavListeners(container);
  }, 600);
}

/* ═══════════════════════════════════════════════════════════
   SAVED TRIPS (localStorage)
═══════════════════════════════════════════════════════════ */
function getSavedTrips() {
  try { return JSON.parse(localStorage.getItem('tg_saved') || '[]'); }
  catch (e) { return []; }
}
function setSavedTrips(arr) { localStorage.setItem('tg_saved', JSON.stringify(arr)); }

function attachFavListeners(container) {
  (container || document).querySelectorAll('.dest-fav').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var dest  = btn.getAttribute('data-dest');
      var saved = getSavedTrips();
      var idx   = saved.indexOf(dest);
      if (idx === -1) {
        saved.push(dest);
        btn.classList.add('active');
        btn.textContent = '❤️';
        showToast('❤️ ' + dest + ' saved to your trips!');
      } else {
        saved.splice(idx, 1);
        btn.classList.remove('active');
        btn.textContent = '🤍';
        showToast('Removed ' + dest + ' from saved trips.');
      }
      setSavedTrips(saved);
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   WEATHER CARDS — render
═══════════════════════════════════════════════════════════ */
function renderWeather() {
  var container = document.getElementById('weatherGrid');
  if (!container) return;
  var h = '';
  WEATHER_DATA.forEach(function (w) {
    h += '<div class="weather-card reveal">' +
      '<div class="weather-icon">' + w.icon + '</div>' +
      '<div class="weather-city">' + w.city + '</div>' +
      '<div class="weather-info">' + w.info + '</div>' +
      '<div class="weather-best">' + w.best + '</div>' +
    '</div>';
  });
  container.innerHTML = h;
  container.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
}

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTERS
═══════════════════════════════════════════════════════════ */
var countersStarted = false;
function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('.stat-num').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var start  = 0;
    var dur    = 1800;
    var step   = dur / 60;
    var inc    = target / (dur / step);
    var timer  = setInterval(function () {
      start += inc;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = start >= 1000000
        ? (start / 1000000).toFixed(1) + 'M'
        : start >= 1000
          ? (start / 1000).toFixed(0) + 'K'
          : Math.round(start).toString();
    }, step);
  });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
═══════════════════════════════════════════════════════════ */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      /* Start counters when stats strip is visible */
      if (entry.target.classList.contains('stats-strip') || entry.target.querySelector && entry.target.querySelector('.stat-num')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-up').forEach(function (el) {
  revealObserver.observe(el);
});

/* ═══════════════════════════════════════════════════════════
   RIPPLE EFFECT
═══════════════════════════════════════════════════════════ */
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.ripple');
  if (!btn) return;
  var rect   = btn.getBoundingClientRect();
  var size   = Math.max(rect.width, rect.height);
  var wave   = document.createElement('span');
  wave.className = 'ripple-wave';
  wave.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size / 2) + 'px;top:' + (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(wave);
  setTimeout(function () { wave.remove(); }, 650);
});

/* ═══════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
═══════════════════════════════════════════════════════════ */
function showToast(msg, dur) {
  var container = document.getElementById('toastContainer');
  if (!container) return;
  dur = dur || 3000;
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(function () {
    toast.classList.add('removing');
    setTimeout(function () { toast.remove(); }, 320);
  }, dur);
}

/* ═══════════════════════════════════════════════════════════
   IBM watsonx Orchestrate Widget
   The ONLY AI component. Loaded once, opened on demand.
═══════════════════════════════════════════════════════════ */
var wxoLoaded = false;

window.wxOConfiguration = {
  orchestrationID:    '2dc4ec3745fb483e9fa2e78d80d69673_8aaa6112-aec9-4ed2-9937-af274bbc83f8',
  hostURL:            'https://eu-gb.watson-orchestrate.cloud.ibm.com',
  rootElementID:      'root',
  deploymentPlatform: 'ibmcloud',
  crn:                'crn:v1:bluemix:public:watsonx-orchestrate:eu-gb:a/2dc4ec3745fb483e9fa2e78d80d69673:8aaa6112-aec9-4ed2-9937-af274bbc83f8::',
  chatOptions: {
    agentId:            'bcc2284f-a11d-4a7c-a213-bce01860c6ff',
    agentEnvironmentId: 'ef167cf7-3a74-4449-9ec9-5dc482573c00'
  }
};

/* Find and click the IBM widget bubble */
function _clickWxoBubble(cb) {
  var btn =
    document.querySelector('#root button[class*="launcher" i]') ||
    document.querySelector('#root button[class*="toggle"   i]') ||
    document.querySelector('#root button[aria-label]')          ||
    document.querySelector('#root button');
  if (btn) { btn.click(); if (cb) cb(); return true; }
  if (typeof wxoLoader !== 'undefined' && typeof wxoLoader.open === 'function') {
    wxoLoader.open(); if (cb) cb(); return true;
  }
  return false;
}

function openWidget(promptText) {
  /* If widget already loaded — click bubble then optionally send prompt */
  if (wxoLoaded) {
    if (!_clickWxoBubble()) {
      var tries = 0;
      var poll = setInterval(function () {
        tries++;
        if (_clickWxoBubble() || tries > 40) clearInterval(poll);
      }, 150);
    }
    if (promptText) _sendPromptToWidget(promptText);
    return;
  }

  /* First call — inject loader script */
  wxoLoaded = true;
  var script = document.createElement('script');
  script.src = window.wxOConfiguration.hostURL + '/wxochat/wxoLoader.js?embed=true';
  script.addEventListener('load', function () {
    if (typeof wxoLoader !== 'undefined' && typeof wxoLoader.init === 'function') {
      wxoLoader.init();
    }
    var tries = 0;
    var poll = setInterval(function () {
      tries++;
      if (_clickWxoBubble() || tries > 60) {
        clearInterval(poll);
        if (promptText) _sendPromptToWidget(promptText);
      }
    }, 150);
  });
  script.addEventListener('error', function () {
    wxoLoaded = false;
    showToast('⚠️ Could not connect to AI. Please try again.');
  });
  document.head.appendChild(script);
  showToast('🤖 Connecting to your AI travel agent…');
}

/* Attempt to pre-fill and send a prompt into the widget textarea */
function _sendPromptToWidget(text) {
  var delay = 0;
  function tryInsert() {
    delay += 300;
    var ta =
      document.querySelector('#root textarea') ||
      document.querySelector('#root input[type="text"]');
    if (ta) {
      ta.value = text;
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.dispatchEvent(new Event('change', { bubbles: true }));
      /* Try to submit */
      var form = ta.closest('form');
      if (form) {
        var submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button:last-child');
        if (submitBtn) { setTimeout(function () { submitBtn.click(); }, 200); }
      }
      return;
    }
    if (delay < 6000) setTimeout(tryInsert, 300);
  }
  setTimeout(tryInsert, 800);
}

/* ═══════════════════════════════════════════════════════════
   BUTTON WIRING — Chat
═══════════════════════════════════════════════════════════ */
function wireButton(id, promptFn) {
  var btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', function () {
    var p = promptFn ? promptFn() : null;
    scrollToAIChat();
    openWidget(p);
  });
}

function scrollToAIChat() {
  var sec = document.getElementById('ai-chat');
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

wireButton('startBtn',       null);
wireButton('heroAiBtn',      null);
wireButton('openChatBtn',    null);
wireButton('topbarChatBtn',  null);
wireButton('planTripBtn',    null);

/* Explore button — scroll to destinations */
var exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) exploreBtn.addEventListener('click', function () {
  var sec = document.getElementById('explore');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
});

/* ═══════════════════════════════════════════════════════════
   QUICK AI PROMPTS
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.prompt-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var prompt = btn.getAttribute('data-prompt');
    scrollToAIChat();
    openWidget(prompt);
    showToast('🤖 Sending prompt to your AI agent…');
  });
});

/* ═══════════════════════════════════════════════════════════
   DESTINATION AI BUTTONS (delegated — cards injected after load)
═══════════════════════════════════════════════════════════ */
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.dest-ai-btn');
  if (!btn) return;
  var prompt = btn.getAttribute('data-prompt');
  scrollToAIChat();
  openWidget(prompt);
  showToast('🤖 Asking AI about this destination…');
});

/* ═══════════════════════════════════════════════════════════
   CATEGORY CARDS
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.cat-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var cat = card.querySelector('.cat-name').textContent;
    var prompt = 'I\'m interested in ' + cat + ' travel. Suggest the best destinations, activities and tips for this type of trip.';
    scrollToAIChat();
    openWidget(prompt);
    showToast('🤖 Exploring ' + cat + ' trips with AI…');
  });
});

/* ═══════════════════════════════════════════════════════════
   SEARCH BAR
═══════════════════════════════════════════════════════════ */
var searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
  searchBtn.addEventListener('click', function () {
    var dest     = (document.getElementById('searchInput')   || {}).value    || '';
    var duration = (document.getElementById('searchDuration')|| {}).value    || '';
    var budget   = (document.getElementById('searchBudget')  || {}).value    || '';
    if (!dest && !duration && !budget) { showToast('🔍 Please enter a destination or travel detail.'); return; }
    var parts = [];
    if (dest)     parts.push('destination: ' + dest);
    if (duration) parts.push('duration: ' + duration);
    if (budget)   parts.push('budget type: ' + budget);
    var prompt = 'Plan a trip with the following details — ' + parts.join(', ') + '. Give me a detailed itinerary, cost breakdown and travel tips.';
    scrollToAIChat();
    openWidget(prompt);
    showToast('🔍 Searching with AI…');
  });
}

/* Allow Enter key in search input */
var searchInput = document.getElementById('searchInput');
if (searchInput) searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') searchBtn && searchBtn.click();
});

/* ═══════════════════════════════════════════════════════════
   BUDGET PLANNER
═══════════════════════════════════════════════════════════ */
var budgetCalcBtn = document.getElementById('budgetCalcBtn');
if (budgetCalcBtn) {
  budgetCalcBtn.addEventListener('click', function () {
    var dest  = (document.getElementById('budgetDest') || {}).value  || '';
    var days  = (document.getElementById('budgetDays') || {}).value  || '7';
    var style = (document.getElementById('budgetStyle')|| {}).value  || 'Mid-Range';
    if (!dest) { showToast('📍 Please enter a destination.'); return; }

    /* Rough estimate table */
    var daily = { Budget: { flights:150,hotel:40,food:25,activities:20 }, 'Mid-Range': { flights:400,hotel:120,food:60,activities:50 }, Luxury: { flights:900,hotel:350,food:150,activities:150 } };
    var d = daily[style] || daily['Mid-Range'];
    var n = parseInt(days, 10) || 7;
    var total  = d.flights * 2 + (d.hotel + d.food + d.activities) * n;
    var result = document.getElementById('budgetResult');
    if (result) {
      result.classList.add('show');
      result.innerHTML =
        '<strong>Estimated budget for ' + dest + ' (' + n + ' days · ' + style + '):</strong><br><br>' +
        '✈️ Flights (return): ~$' + (d.flights * 2) + '<br>' +
        '🏨 Hotel (' + n + ' nights × $' + d.hotel + '): ~$' + (d.hotel * n) + '<br>' +
        '🍽️ Food (' + n + ' days × $' + d.food + '): ~$' + (d.food * n) + '<br>' +
        '🎡 Activities (' + n + ' days × $' + d.activities + '): ~$' + (d.activities * n) + '<br>' +
        '<br><strong>Total estimate: ~$' + total.toLocaleString() + '</strong><br><br>' +
        '<em style="font-size:0.76rem;opacity:0.65">Ask your AI agent for a precise personalised quote →</em>';
    }
    /* Offer to refine with AI */
    var prompt = 'Give me a detailed budget breakdown for a ' + style + ' trip to ' + dest + ' for ' + n + ' days. Include flights, hotels, food, activities, visa and insurance costs.';
    showToast('💰 Budget estimated! Ask AI for a precise quote.', 4000);
    setTimeout(function () {
      scrollToAIChat();
      openWidget(prompt);
    }, 1200);
  });
}

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
═══════════════════════════════════════════════════════════ */
var newsletterBtn = document.getElementById('newsletterBtn');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function () {
    var email = (document.getElementById('newsletterEmail') || {}).value || '';
    if (!email || !email.includes('@')) { showToast('📧 Please enter a valid email address.'); return; }
    showToast('🎉 Subscribed! AI travel inspiration coming your way.', 4000);
    if (document.getElementById('newsletterEmail')) document.getElementById('newsletterEmail').value = '';
  });
}

/* ═══════════════════════════════════════════════════════════
   SETTINGS — Clear Data
═══════════════════════════════════════════════════════════ */
var clearDataBtn = document.getElementById('clearDataBtn');
if (clearDataBtn) {
  clearDataBtn.addEventListener('click', function () {
    localStorage.removeItem('tg_saved');
    showToast('🗑️ All saved data cleared.');
    renderDestinations(WORLD_DESTINATIONS.concat(INDIA_DESTINATIONS), 'destGrid');
    renderDestinations(INDIA_DESTINATIONS, 'indiaGrid');
  });
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR ACTIVE ON SCROLL
═══════════════════════════════════════════════════════════ */
var sections = document.querySelectorAll('section[id], footer');
var sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var id = entry.target.id;
      document.querySelectorAll('.nav-item').forEach(function (item) {
        item.classList.toggle('active', item.getAttribute('data-section') === id);
      });
      /* Start counters if stats section visible */
      if (id === 'home') animateCounters();
    }
  });
}, { threshold: 0.3 });

sections.forEach(function (s) { if (s.id) sectionObserver.observe(s); });

/* ═══════════════════════════════════════════════════════════
   AMBIENT BACKGROUND MUSIC
   - Muted autoplay starts immediately (bypasses browser policy).
   - On first user gesture → unmutes & fades in automatically.
   - Music toggle button in sidebar gives full manual control.
═══════════════════════════════════════════════════════════ */
var bgAudio      = document.getElementById('bgAudio');
var musicToggle  = document.getElementById('musicToggle');
var musicIco     = document.getElementById('musicIco');
var musicLbl     = document.getElementById('musicLbl');
var isPlaying    = false;
var fadeTimer    = null;
var audioUnlocked = false;

function _fadeTo(target, ms, done) {
  if (!bgAudio) return;
  clearInterval(fadeTimer);
  var start = bgAudio.volume;
  var steps = 30;
  var step  = (target - start) / steps;
  var count = 0;
  fadeTimer = setInterval(function () {
    count++;
    bgAudio.volume = Math.min(1, Math.max(0, start + step * count));
    if (count >= steps) { clearInterval(fadeTimer); bgAudio.volume = target; if (done) done(); }
  }, ms / steps);
}

function setMusicUI(playing) {
  if (!musicToggle) return;
  if (playing) {
    musicToggle.classList.add('playing');
    if (musicIco) musicIco.textContent = '🔊';
    if (musicLbl) musicLbl.textContent = 'Stop Music';
  } else {
    musicToggle.classList.remove('playing');
    if (musicIco) musicIco.textContent = '🎵';
    if (musicLbl) musicLbl.textContent = 'Play Music';
  }
}

function startMusic() {
  if (!bgAudio) return;
  bgAudio.muted = false;
  bgAudio.volume = 0;
  bgAudio.play().then(function () {
    isPlaying = true;
    audioUnlocked = true;
    _fadeTo(0.55, 1200);
    setMusicUI(true);
  }).catch(function () {});
}

function stopMusic() {
  if (!bgAudio) return;
  isPlaying = false;
  setMusicUI(false);
  _fadeTo(0, 700, function () { bgAudio.pause(); bgAudio.currentTime = 0; });
}

/* Toggle button */
if (musicToggle) {
  musicToggle.addEventListener('click', function () {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}

/* Auto-play music on first ANY user interaction (click, touch, key) */
if (bgAudio) {
  /* Register gesture listeners IMMEDIATELY — before trying autoplay */
  function _autoUnmute() {
    if (audioUnlocked) return;
    startMusic();
  }
  ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll', 'wheel', 'mousemove'].forEach(function (ev) {
    document.addEventListener(ev, _autoUnmute, { capture: true, once: true, passive: true });
  });

  /* Also try muted autoplay in background so audio is buffered */
  bgAudio.muted  = true;
  bgAudio.volume = 0;
  bgAudio.play().catch(function () { /* silent — gesture will trigger it */ });
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
renderDestinations(WORLD_DESTINATIONS.concat(INDIA_DESTINATIONS), 'destGrid');
renderDestinations(INDIA_DESTINATIONS, 'indiaGrid');
renderWeather();

/* Apply saved colour on load */
applyColour(savedColour);
