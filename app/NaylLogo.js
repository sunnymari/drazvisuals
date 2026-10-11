"use client";

// Animated NAYL × IZIK logotype, choreographed after the NAYL title film:
// push-in (letters swell and thicken) → pull-back (thin, wide) → starburst
// flare on the Λ → Λ flicker with red light → shatter into shards and
// reassemble → Λ closes into a glowing Δ under a big flare. Loops.
//
// Every letter is built from straight strokes so each stroke can split into
// shards. Coordinates: letters are 100 units tall, origin top-left.

import { useEffect, useRef } from "react";

const LETTERS = {
  N: { w: 70, s: [[0, 100, 0, 0], [0, 0, 70, 100], [70, 100, 70, 0]] },
  Λ: { w: 90, s: [[0, 100, 45, 0], [45, 0, 90, 100]] },
  Y: { w: 80, s: [[0, 0, 40, 48], [80, 0, 40, 48], [40, 48, 40, 100]] },
  L: { w: 62, s: [[0, 0, 0, 100], [0, 100, 62, 100]] },
  I: { w: 0, s: [[0, 0, 0, 100]] },
  Z: { w: 72, s: [[0, 0, 72, 0], [72, 0, 0, 100], [0, 100, 72, 100]] },
  K: { w: 66, s: [[0, 0, 0, 100], [62, 0, 0, 58], [24, 36, 66, 100]] },
};

const ROWS = [
  { word: ["N", "Λ", "Y", "L"], y: -135 },
  { word: ["I", "Z", "I", "K"], y: 35 },
];

const LOOP = 24; // seconds

// ---- timeline helpers -------------------------------------------------
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const ramp = (t, a, b) => ease(clamp01((t - a) / (b - a)));
const lerp = (a, b, k) => a + (b - a) * k;
// keyframes: [[time, value], ...] eased between neighbours
const track = (t, keys) => {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i];
    const [t0, v0] = keys[i - 1];
    if (t <= t1) return lerp(v0, v1, ramp(t, t0, t1));
  }
  return keys[keys.length - 1][1];
};
// deterministic noise so flicker looks random but is stable per frame
const hash = (n) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const SCALE = [[0, 0.8], [1.2, 0.8], [7, 1.1], [9, 0.86], [21, 0.86], [24, 0.8]];
const WEIGHT = [[0, 2.2], [1.2, 2.2], [7, 7.5], [9, 2.2], [24, 2.2]];
const GAP = [[0, 58], [1.2, 58], [7, 38], [9, 74], [21, 74], [24, 58]];
const GLOW = [[0, 0.2], [1.2, 0.3], [7, 1], [9, 0.25], [24, 0.2]];
const BG = [[0, 0.5], [8.6, 0.55], [9, 0.08], [12.5, 0.1], [13.5, 0.55], [21, 0.5], [21.3, 0.08], [23.6, 0.1], [24, 0.5]];

function flareAt(t) {
  // first ignition 9–13s, small twinkles after, finale 21–24s
  const a = t >= 9 && t < 13 ? Math.sin(Math.PI * clamp01((t - 9) / 4)) ** 0.6 : 0;
  const b = t >= 13 && t < 16 ? 0.25 + 0.15 * Math.sin(t * 9) : 0;
  const c = t >= 21 ? Math.sin(Math.PI * clamp01((t - 21) / 3)) ** 0.5 : 0;
  return Math.max(a, b, c);
}

function shatterAt(t) {
  if (t < 16 || t > 20.5) return 0;
  if (t < 17.2) return ease((t - 16) / 1.2);
  if (t < 19) return 1 + 0.15 * ((t - 17.2) / 1.8); // keep drifting
  return 1.15 * (1 - ease((t - 19) / 1.5));
}

// ---- component ---------------------------------------------------------
export default function NaylLogo() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const root = svg.closest(".hero");
    const scene = svg.querySelector(".logo-scene");
    const glow = svg.querySelector(".logo-glow");
    const flare = svg.querySelector(".logo-flare");
    const delta = svg.querySelectorAll(".logo-delta");
    const cross = svg.querySelector(".logo-x");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // build shards: each stroke splits into two halves with their own flight path
    const shards = [];
    const NS = "http://www.w3.org/2000/svg";
    const solid = svg.querySelector(".logo-strokes");
    const blurred = svg.querySelector(".logo-glow-strokes");
    let seed = 1;
    ROWS.forEach((row, ri) => {
      row.word.forEach((ch, li) => {
        LETTERS[ch].s.forEach(([x1, y1, x2, y2]) => {
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          [[x1, y1, mx, my], [mx, my, x2, y2]].forEach((seg) => {
            const els = [solid, blurred].map((parent) => {
              const l = document.createElementNS(NS, "line");
              l.setAttribute("pathLength", "1");
              parent.appendChild(l);
              return l;
            });
            const ang = hash(seed++) * Math.PI * 2;
            shards.push({
              ri, li, ch, seg, els,
              vx: Math.cos(ang) * (22 + hash(seed++) * 50),
              vy: Math.sin(ang) * (16 + hash(seed++) * 40),
              rot: (hash(seed++) - 0.5) * 220,
              delay: hash(seed++) * 0.35,
            });
          });
        });
      });
    });

    let start = performance.now();
    let raf;
    let pointerX = 0;
    let pointerY = 0;

    const layout = (gap) =>
      ROWS.map((row) => {
        const widths = row.word.map((c) => LETTERS[c].w);
        const total = widths.reduce((a, b) => a + b, 0) + gap * (row.word.length - 1);
        let x = -total / 2;
        return widths.map((w) => {
          const pos = x;
          x += w + gap;
          return pos;
        });
      });

    const render = (now) => {
      const t = reduce ? 10.5 : ((now - start) / 1000) % LOOP;
      const scale = reduce ? 0.9 : track(t, SCALE);
      const weight = reduce ? 2.4 : track(t, WEIGHT);
      const gap = reduce ? 70 : track(t, GAP);
      const glowK = reduce ? 0.3 : track(t, GLOW);
      const draw = reduce ? 1 : ramp(t, 0, 1.2);
      const shatter = reduce ? 0 : shatterAt(t);
      const flicker = !reduce && t > 13 && t < 16;
      const frame = Math.floor(now / 70);
      const xs = layout(gap);

      for (const s of shards) {
        const ox = xs[s.ri][s.li];
        const oy = ROWS[s.ri].y;
        const [x1, y1, x2, y2] = s.seg;
        const k = shatter * (1 - s.delay * 0.5);
        const cx = ox + (x1 + x2) / 2;
        const cy = oy + (y1 + y2) / 2;
        const tx = s.vx * k;
        const ty = s.vy * k;
        const rot = s.rot * k;
        let hidden = false;
        if (flicker && s.ch === "Λ" && s.ri === 0) hidden = hash(frame + s.seg[0]) < 0.45;
        if (shatter > 0.05) hidden = hash(frame * 3 + s.vx) < 0.12 * Math.min(1, shatter);
        for (const el of s.els) {
          el.setAttribute("x1", ox + x1);
          el.setAttribute("y1", oy + y1);
          el.setAttribute("x2", ox + x2);
          el.setAttribute("y2", oy + y2);
          el.setAttribute("transform", `translate(${tx} ${ty}) rotate(${rot} ${cx} ${cy})`);
          el.style.strokeDashoffset = 1 - draw;
          el.style.opacity = hidden ? 0 : 1;
        }
      }
      // Λ apex sits at x + 45 of the second letter on the first row
      const apexX = xs[0][1] + 45;
      const apexY = ROWS[0].y;

      solid.style.strokeWidth = weight;
      blurred.style.strokeWidth = weight * 2.2;
      glow.style.opacity = glowK;

      const f = reduce ? 0.35 : flareAt(t) * (shatter > 0.2 ? 0 : 1);
      flare.setAttribute("transform", `translate(${apexX} ${apexY}) scale(${0.4 + f * 0.9})`);
      flare.style.opacity = f;

      // the Δ crossbar only appears in the finale
      const d = reduce ? 0 : ramp(t, 21, 21.8) * (1 - ramp(t, 23.4, 24));
      delta.forEach((el) => {
        el.setAttribute("x1", xs[0][1] + 18);
        el.setAttribute("x2", xs[0][1] + 72);
        el.setAttribute("y1", apexY + 60);
        el.setAttribute("y2", apexY + 60);
        el.style.opacity = d;
      });
      delta[0].style.strokeWidth = weight * 2.2; // glow copy comes first in the DOM
      delta[1].style.strokeWidth = weight;

      cross.style.opacity = draw * (1 - Math.min(1, shatter));

      const px = reduce ? 0 : pointerX * 18;
      const py = reduce ? 0 : pointerY * 12;
      scene.setAttribute("transform", `translate(${px} ${py}) scale(${scale})`);

      if (root) {
        root.style.setProperty("--bg-light", reduce ? 0.45 : track(t, BG));
        const red = flicker ? (hash(frame) > 0.55 ? 0.9 : 0.15) : shatter > 0.1 ? 0.35 * hash(frame) : 0;
        root.style.setProperty("--red", red);
      }

      if (!reduce) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e) => {
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    };
    // tapping the logo jumps straight to the shatter
    const onClick = () => {
      start = performance.now() - 15.8 * 1000;
    };
    window.addEventListener("pointermove", onMove);
    svg.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      svg.removeEventListener("click", onClick);
      solid.replaceChildren();
      blurred.replaceChildren();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="logo"
      viewBox="-420 -260 840 520"
      aria-hidden="true"
    >
      <defs>
        <filter id="logo-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <radialGradient id="flare-core">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flare-h" x1="0" x2="1">
          <stop offset="0" stopColor="#9fb8ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="1" stopColor="#9fb8ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flare-v" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="logo-scene">
        <g className="logo-glow" filter="url(#logo-blur)">
          <g className="logo-glow-strokes" />
          <line className="logo-delta" pathLength="1" />
        </g>
        <g className="logo-strokes" />
        <line className="logo-delta" pathLength="1" />

        <g className="logo-x">
          <line x1="-11" y1="-11" x2="11" y2="11" />
          <line x1="11" y1="-11" x2="-11" y2="11" />
        </g>

        <g className="logo-flare">
          <ellipse rx="420" ry="3.5" fill="url(#flare-h)" opacity="0.9" />
          <ellipse rx="260" ry="14" fill="url(#flare-h)" opacity="0.25" />
          <rect x="-1.6" y="-230" width="3.2" height="460" fill="url(#flare-v)" />
          <path d="M0,-44 L5,-5 L44,0 L5,5 L0,44 L-5,5 L-44,0 L-5,-5 Z" fill="#fff" />
          <circle r="34" fill="url(#flare-core)" />
        </g>
      </g>
    </svg>
  );
}
