/*
 * SILLAGE — Home Page
 * Design: Sensory Cartography — Restrained luxury, white void, product as protagonist
 * Sections: Preloader → Nav → Hero → 3 Fragrance Cards → Atelier → Ingredients → Final CTA
 * Animation: GSAP ScrollTrigger + SplitText-style char animations
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import FragranceCanvas from "@/components/FragranceCanvas";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Image URLs (CDN)
const HERO_BOTTLE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/hero-bottle-YyGAd4KMtV8JmZkaVnzAym.webp";
const BOTTLE_ROSE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/bottle-rose-fuobXScuTiyj3d3UptBY85.webp";
const BOTTLE_NOIR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/bottle-noir-9Ve3eQecAerKWwCFzu7wZo.webp";
const INGREDIENTS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/ingredients-bg-WNhqHaPtzbL7XorbARqzij.webp";
const ATELIER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663394983076/V4Uif7KJBKhERR3pLJ3kwi/atelier-bg-cLxHnngqJXDd6U3pztmrvD.webp";

const fragrances = [
  {
    id: "01",
    ref: "SLG-001",
    name: "Ambre",
    nameItalic: "Doré",
    tagline: "Eau de Parfum · 50ml",
    img: HERO_BOTTLE,
    notes: [
      { note: "Top", ingredient: "Bergamot & Cardamom", pct: "18%", width: 0.72 },
      { note: "Heart", ingredient: "Jasmine Absolute", pct: "34%", width: 0.85 },
      { note: "Heart", ingredient: "Iris Pallida", pct: "28%", width: 0.65 },
      { note: "Base", ingredient: "Oud Wood", pct: "42%", width: 1 },
      { note: "Base", ingredient: "Amber Resin", pct: "38%", width: 0.92 },
    ],
    stats: [
      { label: "Concentration", value: "20%" },
      { label: "Longevity", value: "12h+" },
      { label: "Sillage", value: "Intense" },
    ],
    desc: "A golden amber accord of rare oud and jasmine absolute, anchored by warm amber resin. The opening bergamot dissolves into a heart of floral opulence before yielding to a deep, resinous base.",
  },
  {
    id: "02",
    ref: "SLG-002",
    name: "Rose",
    nameItalic: "Éternelle",
    tagline: "Eau de Parfum · 50ml",
    img: BOTTLE_ROSE,
    notes: [
      { note: "Top", ingredient: "Lychee & Pink Pepper", pct: "22%", width: 0.68 },
      { note: "Heart", ingredient: "Bulgarian Rose", pct: "45%", width: 1 },
      { note: "Heart", ingredient: "Peony Petals", pct: "30%", width: 0.75 },
      { note: "Base", ingredient: "White Musk", pct: "25%", width: 0.6 },
      { note: "Base", ingredient: "Sandalwood", pct: "20%", width: 0.52 },
    ],
    stats: [
      { label: "Concentration", value: "18%" },
      { label: "Longevity", value: "8h+" },
      { label: "Sillage", value: "Moderate" },
    ],
    desc: "The purest expression of Bulgarian rose, elevated by a whisper of lychee and grounded in white musk. A fragrance of quiet confidence and feminine grace.",
  },
  {
    id: "03",
    ref: "SLG-003",
    name: "Nuit",
    nameItalic: "Absolue",
    tagline: "Extrait de Parfum · 30ml",
    img: BOTTLE_NOIR,
    notes: [
      { note: "Top", ingredient: "Black Pepper & Saffron", pct: "15%", width: 0.55 },
      { note: "Heart", ingredient: "Leather Accord", pct: "38%", width: 0.88 },
      { note: "Heart", ingredient: "Dark Rose", pct: "32%", width: 0.78 },
      { note: "Base", ingredient: "Vetiver", pct: "40%", width: 0.95 },
      { note: "Base", ingredient: "Labdanum", pct: "45%", width: 1 },
    ],
    stats: [
      { label: "Concentration", value: "30%" },
      { label: "Longevity", value: "24h+" },
      { label: "Sillage", value: "Profound" },
    ],
    desc: "An extrait of absolute darkness. Saffron and black pepper ignite a leather heart, while vetiver and labdanum create an indelible trail that lingers long after departure.",
  },
];

const ingredients = [
  { num: "01", name: "Bulgarian Rose", origin: "Kazanlak Valley, Bulgaria", desc: "Harvested at dawn when the dew still clings to the petals. Each kilo of absolute requires 3.5 tonnes of hand-picked blossoms." },
  { num: "02", name: "Oud Wood", origin: "Assam, India", desc: "Formed over decades as the Aquilaria tree responds to infection. A single gram of pure oud oil can exceed the value of gold." },
  { num: "03", name: "Iris Pallida", origin: "Tuscany, Italy", desc: "The rhizomes are dried for three years before distillation. The resulting orris butter carries an ethereal violet and carrot-like facet." },
  { num: "04", name: "Labdanum", origin: "Crete, Greece", desc: "A resinous gum harvested from the cistus shrub. Its animalic warmth has been used in perfumery since ancient Egypt." },
  { num: "05", name: "Vetiver", origin: "Bourbon Island, Réunion", desc: "The roots of this grass are distilled to produce an oil of extraordinary complexity — smoky, earthy, and profoundly grounding." },
  { num: "06", name: "Jasmine Absolute", origin: "Grasse, France", desc: "The most prized jasmine in perfumery, extracted by enfleurage. Its indolic warmth is the backbone of countless classic fragrances." },
];

function splitTextToChars(el: HTMLElement) {
  // Preserve innerHTML structure (br tags, em tags) — work on text nodes only
  const text = el.innerText || el.textContent || "";
  el.innerHTML = text
    .split("")
    .map((char) =>
      char === " "
        ? `<span style="display:inline-block">&nbsp;</span>`
        : char === "\n"
        ? `<br/>`
        : `<span class="char" style="display:inline-block;overflow:hidden"><span class="charin" style="display:inline-block">${char}</span></span>`
    )
    .join("");
  return el.querySelectorAll<HTMLElement>(".charin");
}

function splitTextToWords(el: HTMLElement) {
  const text = el.textContent || "";
  el.innerHTML = text
    .split(" ")
    .map(
      (word) =>
        `<span class="word" style="display:inline-block;overflow:hidden"><span class="wordin" style="display:inline-block">${word}</span></span>`
    )
    .join(" ");
  return el.querySelectorAll<HTMLElement>(".wordin");
}

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderLineRef = useRef<HTMLDivElement>(null);
  const preloaderCountRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Custom cursor ──────────────────────────────────────────────
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      requestAnimationFrame(animRing);
    };

    document.addEventListener("mousemove", moveCursor);
    animRing();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll("a, button, .etiqueta-bottle img");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (cursor) { cursor.style.width = "4px"; cursor.style.height = "4px"; }
        if (ring) { ring.style.width = "60px"; ring.style.height = "60px"; }
      });
      el.addEventListener("mouseleave", () => {
        if (cursor) { cursor.style.width = "8px"; cursor.style.height = "8px"; }
        if (ring) { ring.style.width = "36px"; ring.style.height = "36px"; }
      });
    });

    // ── Preloader ──────────────────────────────────────────────────
    const preloader = preloaderRef.current;
    const line = preloaderLineRef.current;
    const count = preloaderCountRef.current;

    if (line) setTimeout(() => { line.style.width = "min(300px, 60vw)"; }, 100);

    let n = 0;
    const countInterval = setInterval(() => {
      n += Math.floor(Math.random() * 12) + 3;
      if (n >= 100) { n = 100; clearInterval(countInterval); }
      if (count) count.textContent = String(n).padStart(3, "0");
    }, 60);

    const hidePreloader = () => {
      setTimeout(() => {
        if (preloader) preloader.classList.add("hidden");
        initAnimations();
      }, 2200);
    };

    document.fonts.ready.then(hidePreloader);

    // ── Main animations ────────────────────────────────────────────
    function initAnimations() {
      // ScrollSmoother (desktop only)
      let smoother: ScrollSmoother | null = null;
      if (window.innerWidth > 1024) {
        smoother = ScrollSmoother.create({
          wrapper: "#wrapper",
          content: "#content",
          smooth: 1.2,
          normalizeScroll: true,
          ignoreMobileResize: true,
          effects: true,
        });
      }

      // Hero title chars
      const heroTitle = document.querySelector<HTMLElement>(".landing-title");
      if (heroTitle) {
        const chars = splitTextToChars(heroTitle);
        gsap.from(chars, {
          y: "110%",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.025,
          delay: 0.2,
        });
      }

      // Hero subtitle words
      const heroSub = document.querySelector<HTMLElement>(".landing-subtitle");
      if (heroSub) {
        const words = splitTextToWords(heroSub);
        gsap.from(words, {
          y: "110%",
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.04,
          delay: 0.6,
        });
      }

      // Hero bottle parallax
      gsap.to(".landing-bottle", {
        scrollTrigger: {
          trigger: "#landing",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
        y: -120,
        ease: "none",
      });

      // Fragrance card titles
      document.querySelectorAll<HTMLElement>(".label-name").forEach((el) => {
        const chars = splitTextToChars(el);
        gsap.from(chars, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: "110%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
        });
      });

      // Formula bars
      document.querySelectorAll<HTMLElement>(".formula-bar").forEach((bar) => {
        ScrollTrigger.create({
          trigger: bar,
          start: "top 85%",
          onEnter: () => bar.classList.add("animated"),
        });
      });

      // Ingredient items stagger
      gsap.from(".ingredient-item", {
        scrollTrigger: {
          trigger: ".ingredients-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Section eyebrows
      document.querySelectorAll<HTMLElement>(".section-eyebrow").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Section titles
      document.querySelectorAll<HTMLElement>(".section-title").forEach((el) => {
        const words = splitTextToWords(el);
        gsap.from(words, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: "110%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.06,
        });
      });

      // Section body text
      document.querySelectorAll<HTMLElement>(".section-body").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      // Final title — simple fade+slide (preserve em tag)
      gsap.from(".final-title", {
        scrollTrigger: { trigger: "#final", start: "top bottom" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Final sub + btn
      gsap.from([".final-sub", ".final-btn"], {
        scrollTrigger: { trigger: "#final", start: "top bottom" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.5,
      });

      // Etiqueta bottle images
      document.querySelectorAll<HTMLElement>(".etiqueta-bottle img").forEach((img) => {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      // Label cards
      document.querySelectorAll<HTMLElement>(".label-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          x: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Atelier image
      gsap.from(".atelier-image-wrap", {
        scrollTrigger: { trigger: "#atelier", start: "top 80%" },
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Nav fade in
      gsap.from("#nav", {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      // Ticker
      gsap.from("#ticker", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      });
    }

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const tickerItems = [
    "Sillage Parfums",
    "Grasse · Paris · Tokyo",
    "Olfactory Experiences",
    "Since 2019",
    "Rare Ingredients",
    "Handcrafted",
  ];

  return (
    <>
      {/* Custom cursor */}
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={cursorRingRef} />

      {/* Preloader */}
      <div id="preloader" ref={preloaderRef} className="loading">
        <div className="preloader-brand">Sillage</div>
        <div className="preloader-line" ref={preloaderLineRef} />
        <div className="preloader-count">
          <span ref={preloaderCountRef}>000</span>
        </div>
      </div>

      {/* Navigation */}
      <nav id="nav">
        <a href="#" className="nav-logo">Sillage</a>
        <ul className="nav-links">
          <li><a href="#fragrances">Collection</a></li>
          <li><a href="#atelier">Atelier</a></li>
          <li><a href="#ingredients">Ingredients</a></li>
          <li><a href="#final">Contact</a></li>
        </ul>
      </nav>

      {/* Smooth scroll wrapper */}
      <div id="wrapper" ref={wrapperRef}>
        <div id="content">

          {/* ── HERO ─────────────────────────────────────────── */}
          <section id="landing">
            <div className="landing-text">
              <p className="landing-eyebrow">Collection 2025</p>
              <h1 className="landing-title">
                The Art of<br /><em>Invisible</em><br />Presence<br />
              </h1>
              <p className="landing-subtitle">
                Three fragrances. Three philosophies. Each one a cartography of sensation, distilled from the rarest materials on earth.
              </p>
              <a href="#fragrances" className="landing-cta">
                Explore the Collection →
              </a>
            </div>

            <img
              className="landing-bottle"
              src={HERO_BOTTLE}
              alt="Ambre Doré perfume bottle"
              loading="eager"
            />

            <div className="scroll-indicator">
              <span>Scroll</span>
              <div className="scroll-line" />
            </div>
          </section>

          {/* ── FRAGRANCE CARDS ───────────────────────────────── */}
          <div id="fragrances">
            {fragrances.map((f, i) => (
              <section className="etiqueta" key={f.id} id={`fragrance-${f.id}`}>
                <span className="etiqueta-number">{f.ref}</span>

                <div className="etiqueta-bottle">
                  <img src={f.img} alt={`${f.name} ${f.nameItalic}`} loading="lazy" />
                </div>

                <div className="etiqueta-content">
                  <div className="label-card">
                    <div className="label-header">
                      <span className="label-brand">Sillage Parfums</span>
                      <span className="label-ref">{f.ref} · No.{i + 1}</span>
                    </div>

                    <h2 className="label-name">
                      {f.name} <em>{f.nameItalic}</em>
                    </h2>
                    <p className="label-tagline">{f.tagline}</p>

                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.8, color: "var(--charcoal)", opacity: 0.6, marginBottom: "1.5rem" }}>
                      {f.desc}
                    </p>

                    {/* Formula table */}
                    <div className="formula-table">
                      {f.notes.map((row, j) => (
                        <div className="formula-row" key={j}>
                          <span className="formula-note">{row.note}</span>
                          <span className="formula-ingredient">{row.ingredient}</span>
                          <div className="formula-bar-wrap">
                            <div
                              className="formula-bar"
                              style={{ width: `${row.width * 100}%` }}
                            />
                          </div>
                          <span className="formula-pct">{row.pct}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="label-stats">
                      {f.stats.map((s, j) => (
                        <div className="stat-item" key={j}>
                          <span className="stat-label">{s.label}</span>
                          <span className="stat-value">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* ── 3D CANVAS INTERLUDE ───────────────────────────── */}
          <section style={{ width: "100%", height: "60vh", position: "relative", background: "var(--warm-white)" }}>
            <FragranceCanvas />
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                fontWeight: 300,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--charcoal)",
                opacity: 0.35,
              }}>
                Drag to explore
              </p>
            </div>
          </section>

          {/* ── ATELIER ───────────────────────────────────────── */}
          <section id="atelier">
            <div className="atelier-image-wrap">
              <img src={ATELIER_BG} alt="Sillage atelier" loading="lazy" />
            </div>
            <div className="atelier-text">
              <p className="section-eyebrow">Our Atelier</p>
              <h2 className="section-title">
                Crafted in<br /><em>Grasse</em>
              </h2>
              <p className="section-body">
                In the hills above the French Riviera, where the air itself carries the memory of flowers, our master perfumer composes each fragrance by hand. No algorithms. No shortcuts. Only the accumulated knowledge of three generations and an unwavering commitment to materials of the highest provenance.
              </p>
              <p className="section-body">
                Every bottle of Sillage is a numbered edition. When it is gone, it is gone. We believe in scarcity not as a marketing device, but as a natural consequence of doing things properly.
              </p>
              <a href="#final" className="landing-cta">
                Visit the Atelier →
              </a>
            </div>
          </section>

          {/* ── INGREDIENTS ───────────────────────────────────── */}
          <section id="ingredients">
            <div className="ingredients-bg">
              <img src={INGREDIENTS_BG} alt="" aria-hidden="true" loading="lazy" />
            </div>
            <div className="ingredients-inner">
              <p className="section-eyebrow">The Palette</p>
              <h2 className="section-title">
                Six<br /><em>Rare</em><br />Materials
              </h2>
              <div className="ingredients-grid">
                {ingredients.map((item) => (
                  <div className="ingredient-item" key={item.num}>
                    <p className="ingredient-num">{item.num}</p>
                    <h3 className="ingredient-name">{item.name}</h3>
                    <p className="ingredient-origin">{item.origin}</p>
                    <p className="ingredient-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ─────────────────────────────────────── */}
          <section id="final">
            <h2 className="final-title">
              Find Your<br /><em>Sillage</em>
            </h2>
            <p className="final-sub">
              Each fragrance is available in a numbered edition of 500. Once released, never reformulated.
            </p>
            <a href="#fragrances" className="final-btn">
              Shop the Collection
            </a>
          </section>

        </div>
      </div>

      {/* Ticker */}
      <div id="ticker">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span className="ticker-item" key={i}>
              {item} <span>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
