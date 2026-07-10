# TravelGenie AI ✈️

Your AI-powered travel companion — plan dream trips, discover hidden gems, get personalised itineraries, budget estimates and visa tips instantly, powered by **IBM watsonx Orchestrate**.

---

## Overview

TravelGenie AI is a premium, single-page static travel web application. It features a full-featured travel dashboard with a sidebar navigation, trending destinations, budget planner, weather guide, AI prompt shortcuts and an ambient background music player — all powered by an embedded **IBM watsonx Orchestrate** Travel Planner Agent as the sole AI component.

---

## Features

### 🌍 Destinations
- **Trending Destinations** — 18 curated cards (12 international + 6 Indian) with high-quality Unsplash images, ratings, price estimates and image error fallbacks
- **Popular in India** — dedicated section for Kashmir, Goa, Ladakh, Kerala, Manali, Jaipur
- **Save trips** — heart button on each card saves destinations to `localStorage`
- **Plan with AI** — every destination card has a one-click "Plan this trip with AI" button that sends a pre-built prompt to the watsonx agent

### 🤖 AI Chat (IBM watsonx Orchestrate)
- Embedded IBM watsonx Orchestrate Travel Planner Agent
- Widget mounts inside `<div id="root">` — no custom chatbot logic
- **8 Quick AI Prompt buttons** — one click sends pre-written prompts (7-day trip, beach destinations, mountain adventure, budget trip, family vacation, honeymoon, international tour, solo backpacking)
- **Search bar** → auto-generates a prompt from destination + duration + budget and sends to agent
- **Budget Planner** → calculates estimate then offers to refine via AI
- Every destination card and category triggers a contextual AI prompt

### 🎵 Ambient Music
- Background music (`alex-morgan-native-american-flute-545535.mp3`) plays automatically on first user interaction
- Triggered by: **click, scroll, wheel, mousemove, touch, keydown** — any gesture starts the music
- Manual **🎵 Play / 🔊 Stop** toggle button in the sidebar
- Smooth volume fade-in (1.6s) and fade-out (0.7s)

### 🎨 Premium UI / Design
- **Glassmorphism** — frosted-glass cards, surfaces and sidebar
- **Dark / Light mode** toggle (defaults to Light mode, persists across sessions)
- **5 theme colours** — Purple, Blue, Green, Gold, Pink (saved to `localStorage`)
- **Animated background** — 5 layers running simultaneously:
  - 🔵 **5 Floating Orbs** — large blurred colour orbs drifting in all directions (Purple, Blue, Green, Pink, Gold)
  - 🌌 **3 Aurora Waves** — horizontal Northern Lights-style bands flowing left–right
  - 🔘 **Animated Dot Grid** — full-screen dot grid that pulses dim ↔ bright every 6s
  - ⭐ **12 Shooting Stars** — diagonal streaks across the screen with random speed & delay
  - 🟡 **30 Rising Particles** — small floating dots drifting upward continuously
- **Skeleton loaders** on destination grids before images load
- **Scroll reveal** animations using `IntersectionObserver`
- **Ripple effect** on all buttons
- **Toast notifications** for user feedback
- **Animated stat counters** (10K+ destinations, 2.5M+ trips, 98% satisfaction, 195+ countries)
- **Floating hero cards** with CSS keyframe animations
- Responsive at 1100px (collapsed sidebar icons), 768px (mobile drawer), 480px

### 📋 Dashboard Sections
| Section | Description |
|---|---|
| 🏠 Home | Hero banner, search bar, stats strip |
| 🌍 Explore | Trending Destinations (18 cards) |
| 📍 Popular | Popular in India (6 cards) |
| 🤖 AI Chat | watsonx Orchestrate embed + quick prompts |
| 💰 Budget Planner | Estimate form + AI refinement |
| 🌦 Weather | Best travel seasons for 8 destinations |
| 🧳 My Trips | Saved trips (localStorage) |
| ⚙️ Settings | Theme, colours, notifications, language, currency |

---

## Project Structure

```
travel/
├── index.html      # Full single-page app — all sections, sidebar, watsonx embed
├── style.css       # All styling — CSS variables, glassmorphism, dark/light, animations
├── script.js       # All logic — data, watsonx widget, audio, scroll reveal, UI
├── chat.html       # Legacy chat page (kept for reference)
└── alex-morgan-native-american-flute-545535.mp3  # Ambient background music
```

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 / CSS3 | Semantic markup, CSS variables, Grid, Flexbox |
| Vanilla JavaScript ES6 | No frameworks, no build step |
| Bootstrap 5.3 | Grid system + utility classes |
| Google Fonts — Inter | Typography (300–900 weights) |
| IBM watsonx Orchestrate | AI Travel Planner Agent (only AI component) |
| Unsplash CDN | High-quality destination images |
| localStorage | Saved trips + theme colour preference |
| IntersectionObserver | Scroll reveal + animated counters |

---

## Getting Started

No build tools or server setup required — this is a pure static site.

### Open directly in browser
```
Open index.html in any modern browser.
```

### Serve locally (recommended for audio autoplay)
```bash
cd travel
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

> **Note:** Serving over HTTP is recommended because some browsers block `file://` audio autoplay. Running a local server ensures the ambient music triggers correctly on first interaction.

---

## IBM watsonx Orchestrate Configuration

The widget is configured in `script.js` via `window.wxOConfiguration`:

```js
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
```

The `wxoLoader.js` script is loaded **lazily** — only when the user first clicks an AI button. This keeps initial page load fast.

> ⚠️ **Security note:** Agent IDs and CRN are hard-coded. Before any public deployment, move these to environment-specific configuration or a backend proxy.

---

## Customisation

### Add / edit destinations
Edit the `WORLD_DESTINATIONS` or `INDIA_DESTINATIONS` arrays in `script.js`:
```js
{ name:'Maldives', country:'South Asia', emoji:'🏝️', rating:'5.0',
  price:'From $2,200', badge:'Luxury',
  img:'https://images.unsplash.com/photo-...' }
```

### Change default theme
- **Mode:** change `localStorage.setItem('tg_theme', 'light')` to `'dark'` in `script.js`
- **Colour:** change `localStorage.setItem('tg_colour', 'purple')` to any of: `blue`, `green`, `gold`, `pink`

### Change background music
Replace `alex-morgan-native-american-flute-545535.mp3` with any MP3 file and update the `src` in `index.html`:
```html
<audio id="bgAudio" src="your-music-file.mp3" loop preload="auto"></audio>
```

### Add Quick AI Prompts
Add a new button in the `#ai-prompts` section of `index.html`:
```html
<button class="prompt-btn ripple" data-prompt="Your prompt text here">🌴 Your Label</button>
```

---

## License

MIT License — free to use, modify and distribute.
