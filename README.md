# SILLAGE — Olfactory Experiences

> *A luxury perfume brand website inspired by [silencio.es](https://silencio.es), built with React 19, GSAP, and React Three Fiber.*

<p align="center">
  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/sillage-final_8e33a269.gif" alt="SILLAGE Demo" width="100%" />
</p>

---

## Overview

**SILLAGE** is an immersive, single-page luxury fragrance brand website that replicates the visual language and interaction philosophy of award-winning creative agency sites. The design philosophy — *Sensory Cartography* — treats each fragrance as a "sensory archive": a product label elevated into a sculptural object, presented through restrained typography, scroll-driven animation, and real-time 3D rendering.

The project demonstrates how modern frontend tooling (React 19 + Vite 7 + GSAP 3 + Three.js r160) can be combined to deliver a cinematic web experience without a backend.

---

## Screenshots

| Section | Preview |
|---|---|
| **Hero** — asymmetric layout, Cormorant Garamond display type, AI-generated bottle image with mouse parallax | ![Hero](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/01-hero_08fb434c.webp) |
| **Ambre Doré** — product label card, formula composition bars, alternating layout | ![Ambre Doré](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/02-ambre-dore_7449dc68.webp) |
| **Rose Éternelle** — reversed card layout, blush-toned background, round bottle | ![Rose Éternelle](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/03-rose-eternelle_3d0aa234.webp) |
| **Nuit Absolue** — dark extrait card, obsidian bottle photography | ![Nuit Absolue](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/04-nuit-absolue_9993eea0.webp) |
| **3D Scene** — three glass bottles rendered in real-time with mouse parallax depth layering | ![3D Scene](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/05-3d-scene_283bd7d3.webp) |
| **Atelier** — editorial two-column layout, Grasse workshop photography | ![Atelier](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/06-atelier_fa304294.webp) |
| **Ingredients** — six rare materials grid with hover elevation, textured background | ![Ingredients](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/07-ingredients_37034885.webp) |
| **Final CTA** — dark charcoal section, gold radial glow, numbered edition copy | ![Final CTA](https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/08-final-cta_1639b27a.webp) |

---

## Features

### Animation & Interaction

The animation layer is built entirely on **GSAP 3** with `ScrollTrigger`. Every section uses a distinct animation pattern: the Hero title employs a character-by-character `translateY` reveal (implemented via a custom DOM-walking `splitTextToChars` function that preserves HTML tags); product section titles use word-level staggered reveals; and the Atelier section uses a combined `x`-offset + opacity entrance. A custom **RAF-driven cursor** (dot + ring with separate lerp speeds) replaces the system cursor on desktop.

### Mouse Parallax

Two independent parallax systems run simultaneously. The **Hero parallax** uses `requestAnimationFrame` with a `0.06` lerp factor to translate the bottle image and its ambient glow layer in response to mouse position, preserving the CSS `translateY(-50%)` vertical-center baseline via `calc()`. The **3D scene parallax** operates inside React Three Fiber's render loop via `useFrame`, with three independent `ParallaxGroup` components at depth multipliers of `0.6×` (particles), `1.0×` (center bottle), `1.4×` (left bottle), and `1.7×` (right bottle), each with a slightly different lerp factor to simulate natural depth-of-field lag.

### 3D Rendering

The 3D scene is built with **React Three Fiber** and **@react-three/drei**. Each bottle is a `LatheGeometry` constructed from hand-tuned `Vector2` control points in three profiles: `classic` (rectangular shoulder), `round` (spherical body), and `tall` (slender column). The glass shell uses `MeshTransmissionMaterial` from drei with `transmission: 0.95`, `chromaticAberration: 0.04`, and `ior: 1.5` for physically-based glass refraction. A `Float` component from drei adds a subtle autonomous bobbing motion independent of the parallax system. Eighty instanced gold particles (`InstancedMesh`) orbit the scene using sinusoidal position offsets per frame.

### Typography System

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Headings | Cormorant Garamond | 300 (Light) | Hero title, section titles, product names |
| Accent / Italic | Cormorant Garamond | 300 Italic | Gold `<em>` elements in titles |
| Body / UI | DM Sans | 400 | Descriptions, paragraph text |
| Monospace / Labels | DM Mono | 400 | Eyebrows, nav links, formula labels, CTAs |

All type sizes are defined as CSS custom properties (`--p1` through `--p5`) using `clamp()` for fluid scaling between mobile and desktop viewports.

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | React | 19.2 |
| Build Tool | Vite | 7.x |
| Routing | Wouter | 3.x |
| Animation | GSAP + ScrollTrigger | 3.12 |
| 3D Rendering | Three.js | r160 |
| 3D React Bindings | React Three Fiber | 8.x |
| 3D Helpers | @react-three/drei | 9.x |
| Styling | Tailwind CSS v4 + Custom CSS | 4.x |
| Language | TypeScript | 5.6 |

---

## Project Structure

```
parfum/
├── client/
│   ├── index.html                  # Google Fonts (Cormorant Garamond, DM Sans, DM Mono)
│   └── src/
│       ├── pages/
│       │   └── Home.tsx            # Main page — all sections, GSAP animations, RAF cursor
│       ├── components/
│       │   └── FragranceCanvas.tsx # React Three Fiber scene — bottles, particles, parallax
│       ├── App.tsx                 # Router + ThemeProvider (dark theme)
│       ├── index.css               # Design system — CSS variables, all section styles
│       └── main.tsx                # React entry point
├── server/
│   └── index.ts                    # Express static server (production)
├── shared/
│   └── const.ts
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 9 (recommended) or npm

### Installation

```bash
git clone https://github.com/your-username/sillage-parfum.git
cd sillage-parfum
pnpm install
```

### Development

```bash
pnpm dev
# → http://localhost:3000
```

### Production Build

```bash
pnpm build
pnpm start
```

---

## Design Philosophy

The visual identity is grounded in **Sensory Cartography** — the idea that a fragrance can be "mapped" like a territory, with distinct top, heart, and base coordinates. This translates into the UI as:

- **Warm white backgrounds** (`#F5F2EE`) that recede, letting the product photography and 3D objects occupy the foreground
- **Gold accents** (`#C4975A`) used exclusively for emphasis — never as fill — to preserve their scarcity value
- **Asymmetric layouts** that alternate direction per product section, creating a sense of editorial pagination rather than a uniform grid
- **Restrained motion**: all animations use `power4.out` easing and durations of 0.8–1.4s; nothing accelerates into view, everything decelerates out of stillness

---

## Inspiration

This project is a creative reinterpretation of [silencio.es](https://silencio.es) — the website for the Paris members' club designed by David Lynch. The original site is notable for its use of GSAP ScrollTrigger, Three.js 3D objects, custom cursor, and scroll-smoother inertia. SILLAGE adapts these techniques for a luxury fragrance context, replacing the club's dark, cinematic atmosphere with a warmer, archival aesthetic.

---

## License

MIT — free to use, adapt, and build upon.

---

*Built with [Manus AI](https://manus.im)*
