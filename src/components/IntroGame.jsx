import { useEffect, useRef, useState } from "react";

const TARGET_SCORE = 8;
const GRAVITY = 0.42;
const LIFT = 0.9;
const MAX_SPEED = 7;
const SPAWN_INTERVAL = 950;
const SCROLL_SPEED = 3.2;
const AUTO_COMPLETE_MS = 45000;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random() * 0.6,
    r: Math.random() * 1.3 + 0.4,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawStars(ctx, w, h, stars, now) {
  stars.forEach((s) => {
    const twinkle = 0.5 + 0.5 * Math.sin(now / 900 + s.phase);
    ctx.globalAlpha = 0.35 + twinkle * 0.5;
    ctx.fillStyle = "#f4f2f0";
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function drawMountainLayer(ctx, w, h, offset, baseY, amp, color, blur) {
  ctx.save();
  if (blur) ctx.filter = `blur(${blur}px)`;
  const period = 300;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-period, h);
  for (let x = -period; x <= w + period; x += 20) {
    const phase = ((x + offset) / period) * Math.PI * 2;
    const y = baseY - (Math.sin(phase) * 0.5 + Math.sin(phase * 2.1) * 0.5) * amp - amp * 0.5;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w + period, h);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function colorShade(hex, amt) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return `rgb(${r}, ${g}, ${b})`;
}

function drawPineTree(ctx, x, baseY, height, width) {
  const tiers = [
    { bottom: 0, top: 0.45, width: 1 },
    { bottom: 0.3, top: 0.74, width: 0.7 },
    { bottom: 0.58, top: 1, width: 0.42 },
  ];
  tiers.forEach((tier) => {
    const bottomY = baseY - height * tier.bottom;
    const topY = baseY - height * tier.top;
    const halfW = (width * tier.width) / 2;
    ctx.beginPath();
    ctx.moveTo(x - halfW, bottomY);
    ctx.lineTo(x + halfW, bottomY);
    ctx.lineTo(x, topY);
    ctx.closePath();
    ctx.fill();
  });
}

function drawTreeRow(ctx, w, offset, baseY, spacing, baseColor, minHeight, maxHeight, width) {
  for (let x = -spacing; x <= w + spacing; x += spacing) {
    const seed = Math.sin((x + offset) * 0.37) * 0.5 + Math.sin((x + offset) * 0.11 + 4) * 0.5;
    const jitterX = Math.sin((x + offset) * 0.21) * spacing * 0.3;
    const treeHeight = minHeight + Math.abs(seed) * (maxHeight - minHeight);
    const tone = Math.round(seed * 9);
    ctx.fillStyle = colorShade(baseColor, tone);
    drawPineTree(ctx, x + jitterX, baseY, treeHeight, width);
  }
}

function drawTreeline(ctx, w, h, offset, slowOffset, baseY, color) {
  drawTreeRow(ctx, w, slowOffset, baseY - 4, 36, colorShade(color, 30), 16, 28, 20);
  drawTreeRow(ctx, w, offset * 0.85, baseY, 30, colorShade(color, 16), 22, 38, 24);
  ctx.fillStyle = color;
  ctx.fillRect(0, baseY, w, h - baseY + 300);
  drawTreeRow(ctx, w, offset, baseY, 20, color, 30, 54, 28);
}

function drawFogBand(ctx, w, h, offset) {
  ctx.save();
  ctx.filter = "blur(18px)";

  const top = h * 0.6;
  const haze = ctx.createLinearGradient(0, top, 0, h);
  haze.addColorStop(0, "rgba(120, 112, 165, 0)");
  haze.addColorStop(0.45, "rgba(112, 104, 158, 0.32)");
  haze.addColorStop(1, "rgba(98, 92, 145, 0.55)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, top, w, h - top);

  const period = 340;
  for (let x = -period; x <= w + period; x += period * 0.5) {
    const bx = x + offset;
    const by = top + 34 + Math.sin(bx / 170) * 16;
    const glow = ctx.createRadialGradient(bx, by, 10, bx, by, 190);
    glow.addColorStop(0, "rgba(175, 165, 212, 0.32)");
    glow.addColorStop(1, "rgba(175, 165, 212, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(bx, by, 190, 70, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawVignette(ctx, w, h) {
  const vg = ctx.createRadialGradient(w / 2, h * 0.5, Math.min(w, h) * 0.2, w / 2, h * 0.5, Math.max(w, h) * 0.78);
  vg.addColorStop(0, "rgba(0, 0, 0, 0)");
  vg.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
}

function createNoiseTexture(size = 160) {
  const tile = document.createElement("canvas");
  tile.width = size;
  tile.height = size;
  const nctx = tile.getContext("2d");
  const image = nctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const v = Math.random() * 255;
    image.data[i] = v;
    image.data[i + 1] = v;
    image.data[i + 2] = v;
    image.data[i + 3] = Math.random() * 34;
  }
  nctx.putImageData(image, 0, 0);
  return tile;
}

function drawGrain(ctx, w, h, pattern) {
  if (!pattern) return;
  ctx.save();
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

function drawLayer(ctx, dy, draw) {
  ctx.save();
  ctx.translate(0, dy);
  draw();
  ctx.restore();
}

function drawBackground(ctx, w, h, offsets, stars, now, grainPattern, parallaxY) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#03040a");
  sky.addColorStop(0.42, "#071226");
  sky.addColorStop(0.68, "#0d2a44");
  sky.addColorStop(0.84, "#1c5068");
  sky.addColorStop(1, "#2d6478");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  drawLayer(ctx, parallaxY * 0.02, () => drawStars(ctx, w, h, stars, now));
  drawLayer(ctx, parallaxY * 0.05, () => drawMountainLayer(ctx, w, h, offsets.far, h * 0.56, 46, "#223c56", 7));
  drawLayer(ctx, parallaxY * 0.09, () => drawMountainLayer(ctx, w, h, offsets.mid, h * 0.64, 60, "#172841", 3));
  drawLayer(ctx, parallaxY * 0.14, () => drawFogBand(ctx, w, h, offsets.fog));
  drawLayer(ctx, parallaxY * 0.2, () => drawTreeline(ctx, w, h, offsets.near, offsets.front, h * 0.86, "#0c1220"));
  drawGrain(ctx, w, h, grainPattern);
  drawVignette(ctx, w, h);
}

function drawWheel(ctx, cx, cy, r, angle) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = "#050505";
  ctx.fill();

  const rimR = r * 0.76;
  const rim = ctx.createRadialGradient(0, 0, rimR * 0.25, 0, 0, rimR);
  rim.addColorStop(0, "#4c463e");
  rim.addColorStop(1, "#100f0b");
  ctx.beginPath();
  ctx.arc(0, 0, rimR, 0, Math.PI * 2);
  ctx.fillStyle = rim;
  ctx.fill();

  ctx.strokeStyle = "rgba(244, 242, 240, 0.8)";
  ctx.lineWidth = 1.1;
  ctx.rotate(angle);
  for (let i = 0; i < 8; i += 1) {
    ctx.rotate((Math.PI * 2) / 8);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -rimR * 0.9);
    ctx.stroke();
  }
  ctx.restore();

  ctx.beginPath();
  ctx.fillStyle = "#1c1a17";
  ctx.arc(cx, cy, r * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "#f4f2f0";
  ctx.arc(cx - r * 0.04, cy - r * 0.04, r * 0.05, 0, Math.PI * 2);
  ctx.fill();
}

function drawChain(ctx, bb, rw) {
  ctx.fillStyle = "#2a2622";
  ctx.beginPath();
  ctx.arc(bb.x, bb.y, 5.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2a2622";
  ctx.beginPath();
  ctx.arc(rw.x, rw.y, 3.4, 0, Math.PI * 2);
  ctx.fill();

  const dx = rw.x - bb.x;
  const dy = rw.y - bb.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  ctx.strokeStyle = "#0b0a09";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(bb.x + nx * 4.2, bb.y + ny * 4.2);
  ctx.lineTo(rw.x + nx * 4.2, rw.y + ny * 4.2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(bb.x - nx * 3.6, bb.y - ny * 3.6);
  ctx.quadraticCurveTo(
    (bb.x + rw.x) / 2 - nx * 6.4,
    (bb.y + rw.y) / 2 - ny * 6.4,
    rw.x - nx * 3.6,
    rw.y - ny * 3.6
  );
  ctx.stroke();
}

function bendPoint(a, b, amount) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (nx < 0) {
    nx = -nx;
    ny = -ny;
  }
  return { x: (a.x + b.x) / 2 + nx * amount, y: (a.y + b.y) / 2 + ny * amount };
}

function drawBikeAndRider(ctx, x, y, tilt, wheelAngle) {
  const RW = { x: -18, y: 15 };
  const FW = { x: 18, y: 15 };
  const BB = { x: -5, y: 16 };
  const ST = { x: -11, y: -6 };
  const HT = { x: 13, y: -8 };
  const GRIP = { x: 20, y: -11 };
  const HIP = { x: -13, y: -13 };
  const SHOULDER = { x: 5, y: -29 };
  const HEAD = { x: 11, y: -35 };
  const PEDAL_R = 7;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);

  const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 42);
  glow.addColorStop(0, "rgba(255, 86, 105, 0.3)");
  glow.addColorStop(1, "rgba(255, 86, 105, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.fill();

  drawWheel(ctx, RW.x, RW.y, 14, wheelAngle);
  drawWheel(ctx, FW.x, FW.y, 14, wheelAngle);
  drawChain(ctx, BB, RW);

  const frameGrad = ctx.createLinearGradient(-18, -14, 18, 14);
  frameGrad.addColorStop(0, "#ff8793");
  frameGrad.addColorStop(1, "#d63a4e");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const downTube = () => {
    ctx.beginPath();
    ctx.moveTo(HT.x, HT.y);
    ctx.lineTo(BB.x, BB.y);
  };
  const topAndSeatTube = () => {
    ctx.beginPath();
    ctx.moveTo(ST.x, ST.y);
    ctx.lineTo(HT.x, HT.y);
    ctx.moveTo(ST.x, ST.y);
    ctx.lineTo(BB.x, BB.y);
  };
  const rearStays = () => {
    ctx.beginPath();
    ctx.moveTo(ST.x, ST.y);
    ctx.lineTo(RW.x, RW.y);
    ctx.moveTo(BB.x, BB.y);
    ctx.lineTo(RW.x, RW.y);
  };
  const fork = () => {
    ctx.beginPath();
    ctx.moveTo(HT.x, HT.y);
    ctx.lineTo(FW.x, FW.y);
  };

  ctx.strokeStyle = "#5c1620";
  ctx.lineWidth = 6.4;
  downTube();
  ctx.stroke();
  ctx.lineWidth = 4.2;
  topAndSeatTube();
  ctx.stroke();
  ctx.lineWidth = 3;
  rearStays();
  ctx.stroke();
  ctx.lineWidth = 3.6;
  fork();
  ctx.stroke();

  ctx.strokeStyle = frameGrad;
  ctx.lineWidth = 5.2;
  downTube();
  ctx.stroke();
  ctx.lineWidth = 3;
  topAndSeatTube();
  ctx.stroke();
  ctx.lineWidth = 2;
  rearStays();
  ctx.stroke();
  ctx.lineWidth = 2.6;
  fork();
  ctx.stroke();

  const forkAngle = Math.atan2(FW.y - HT.y, FW.x - HT.x);
  ctx.save();
  ctx.translate(HT.x + (FW.x - HT.x) * 0.4, HT.y + (FW.y - HT.y) * 0.4);
  ctx.rotate(forkAngle);
  ctx.fillStyle = "#0b0a09";
  roundRect(ctx, -3.4, -1.7, 6.8, 3.4, 1.5);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "#0e0d0c";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(ST.x, ST.y);
  ctx.lineTo(HIP.x + 2, HIP.y + 2);
  ctx.stroke();
  ctx.fillStyle = "#0e0d0c";
  ctx.beginPath();
  ctx.ellipse(HIP.x - 3, HIP.y - 1, 8, 2.6, -0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(HT.x + 2, HT.y - 6);
  ctx.lineTo(HT.x + 2, HT.y - 1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(HT.x + 2, HT.y - 6);
  ctx.quadraticCurveTo(GRIP.x, GRIP.y - 4, GRIP.x, GRIP.y);
  ctx.stroke();

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.ellipse(GRIP.x - 1.5, GRIP.y - 2, 3, 1.8, 0.4, 0, Math.PI * 2);
  ctx.fill();

  const pedalA = { x: BB.x + Math.cos(wheelAngle) * PEDAL_R, y: BB.y + Math.sin(wheelAngle) * PEDAL_R };
  const pedalB = { x: BB.x + Math.cos(wheelAngle + Math.PI) * PEDAL_R, y: BB.y + Math.sin(wheelAngle + Math.PI) * PEDAL_R };
  ctx.strokeStyle = "#0e0d0c";
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(BB.x, BB.y);
  ctx.lineTo(pedalB.x, pedalB.y);
  ctx.stroke();

  const kneeB = bendPoint(HIP, pedalB, 4.5);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#141210";
  ctx.lineWidth = 5.6;
  ctx.beginPath();
  ctx.moveTo(HIP.x, HIP.y);
  ctx.lineTo(kneeB.x, kneeB.y);
  ctx.stroke();
  ctx.strokeStyle = "#8a6246";
  ctx.lineWidth = 4.2;
  ctx.beginPath();
  ctx.moveTo(kneeB.x, kneeB.y);
  ctx.lineTo(pedalB.x, pedalB.y);
  ctx.stroke();

  ctx.fillStyle = "#141210";
  ctx.beginPath();
  ctx.ellipse(HIP.x - 1, HIP.y + 1, 5, 3.6, 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#8f1322";
  ctx.lineWidth = 7.4;
  ctx.beginPath();
  ctx.moveTo(HIP.x, HIP.y);
  ctx.quadraticCurveTo(0, -24, SHOULDER.x, SHOULDER.y);
  ctx.stroke();

  const jerseyGrad = ctx.createLinearGradient(HIP.x, HIP.y, SHOULDER.x, SHOULDER.y);
  jerseyGrad.addColorStop(0, "#d6354a");
  jerseyGrad.addColorStop(1, "#ff6577");
  ctx.strokeStyle = jerseyGrad;
  ctx.lineWidth = 5.8;
  ctx.beginPath();
  ctx.moveTo(HIP.x, HIP.y);
  ctx.quadraticCurveTo(0, -24, SHOULDER.x, SHOULDER.y);
  ctx.stroke();

  const elbow = bendPoint(SHOULDER, GRIP, 4);
  ctx.strokeStyle = "#e85568";
  ctx.lineWidth = 5.2;
  ctx.beginPath();
  ctx.moveTo(SHOULDER.x, SHOULDER.y);
  ctx.lineTo(elbow.x, elbow.y);
  ctx.stroke();
  ctx.strokeStyle = "#d99a6c";
  ctx.lineWidth = 4.1;
  ctx.beginPath();
  ctx.moveTo(elbow.x, elbow.y);
  ctx.lineTo(GRIP.x, GRIP.y + 1);
  ctx.stroke();
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.arc(GRIP.x, GRIP.y + 1, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#13110f";
  ctx.beginPath();
  ctx.ellipse(HEAD.x, HEAD.y + 1, 5.6, 5.8, 0, Math.PI * 0.08, Math.PI * 1.92);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff5669";
  ctx.beginPath();
  ctx.ellipse(HEAD.x, HEAD.y, 5.9, 6.1, 0, Math.PI * 1.08, Math.PI * 1.92);
  ctx.fill();
  ctx.strokeStyle = "rgba(10, 9, 8, 0.5)";
  ctx.lineWidth = 0.8;
  for (let v = -3; v <= 3; v += 3) {
    ctx.beginPath();
    ctx.moveTo(HEAD.x + v, HEAD.y - 5.2);
    ctx.lineTo(HEAD.x + v * 1.3, HEAD.y + 0.5);
    ctx.stroke();
  }
  ctx.fillStyle = "#0b0a09";
  roundRect(ctx, HEAD.x - 0.5, HEAD.y + 2.4, 6.5, 2.6, 1.3);
  ctx.fill();

  const kneeA = bendPoint(HIP, pedalA, 5);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#1a1714";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(HIP.x, HIP.y);
  ctx.lineTo(kneeA.x, kneeA.y);
  ctx.stroke();
  ctx.strokeStyle = "#e8b17f";
  ctx.lineWidth = 4.6;
  ctx.beginPath();
  ctx.moveTo(kneeA.x, kneeA.y);
  ctx.lineTo(pedalA.x, pedalA.y);
  ctx.stroke();

  ctx.strokeStyle = "#0e0d0c";
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(BB.x, BB.y);
  ctx.lineTo(pedalA.x, pedalA.y);
  ctx.stroke();
  ctx.fillStyle = "#0e0d0c";
  ctx.beginPath();
  ctx.arc(pedalA.x, pedalA.y, 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(pedalB.x, pedalB.y, 2.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawItem(ctx, item, now) {
  const age = now - item.bornAt;
  const bob = Math.sin(age / 260) * 3;
  ctx.save();
  ctx.translate(item.x, item.y + bob);
  ctx.rotate(Math.sin(age / 420) * 0.08);

  const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, 28);
  glow.addColorStop(0, "rgba(255, 120, 40, 0.5)");
  glow.addColorStop(1, "rgba(255, 120, 40, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, Math.PI * 2);
  ctx.fill();

  const badge = ctx.createLinearGradient(-15, -15, 15, 15);
  badge.addColorStop(0, "#ff7a3d");
  badge.addColorStop(1, "#ef5a12");
  ctx.fillStyle = badge;
  roundRect(ctx, -15, -15, 30, 30, 8);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px Oswald, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("KOM", 0, 1);

  ctx.restore();
}

function spawnBurst(particles, x, y) {
  for (let i = 0; i < 8; i += 1) {
    const a = (Math.PI * 2 * i) / 8;
    particles.push({
      x,
      y,
      vx: Math.cos(a) * 2.4,
      vy: Math.sin(a) * 2.4,
      life: 1,
    });
  }
}

function updateAndDrawParticles(ctx, particles) {
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.045;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = "#ffe9ec";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function IntroGame({ onComplete }) {
  const canvasRef = useRef(null);
  const holdingRef = useRef(false);
  const bikeRef = useRef({ y: 0, vy: 0 });
  const itemsRef = useRef([]);
  const particlesRef = useRef([]);
  const scoreRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const wheelAngleRef = useRef(0);
  const offsetsRef = useRef({ far: 0, mid: 0, fog: 0, near: 0, front: 0 });
  const starsRef = useRef([]);
  const grainRef = useRef(null);
  const rafRef = useRef(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState("ready");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let won = false;
    let startTime = performance.now();

    const finish = () => {
      setFading(true);
      window.setTimeout(onComplete, 420);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bikeRef.current.y = window.innerHeight / 2;
    };
    resize();
    window.addEventListener("resize", resize);
    starsRef.current = makeStars(110);
    grainRef.current = ctx.createPattern(createNoiseTexture(), "repeat");

    const startPlaying = () => setPhase((p) => (p === "ready" ? "playing" : p));

    const onKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        holdingRef.current = true;
        startPlaying();
      }
    };
    const onKeyUp = (event) => {
      if (event.code === "Space") holdingRef.current = false;
    };
    const onPointerDown = (event) => {
      event.preventDefault();
      holdingRef.current = true;
      startPlaying();
    };
    const onPointerUp = () => {
      holdingRef.current = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    const tick = (now) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const bike = bikeRef.current;
      const bikeX = w * 0.22;

      const offsets = offsetsRef.current;
      offsets.far -= 0.18;
      offsets.mid -= 0.32;
      offsets.fog -= 0.5;
      offsets.near -= 0.9;
      offsets.front -= 0.6;
      wheelAngleRef.current += 0.24;

      if (!won) {
        bike.vy += holdingRef.current ? -LIFT : GRAVITY;
        bike.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, bike.vy));
        bike.y += bike.vy;
        bike.y = Math.max(30, Math.min(h - 30, bike.y));

        if (now - lastSpawnRef.current > SPAWN_INTERVAL) {
          lastSpawnRef.current = now;
          itemsRef.current.push({
            x: w + 20,
            y: 60 + Math.random() * Math.max(1, h - 120),
            size: 10,
            bornAt: now,
          });
        }

        itemsRef.current.forEach((item) => {
          item.x -= SCROLL_SPEED;
        });

        itemsRef.current = itemsRef.current.filter((item) => {
          if (item.x < -20) return false;
          const dx = item.x - bikeX;
          const dy = item.y - bike.y;
          if (Math.sqrt(dx * dx + dy * dy) < item.size + 16) {
            spawnBurst(particlesRef.current, item.x, item.y);
            scoreRef.current += 1;
            setScore(scoreRef.current);
            if (scoreRef.current >= TARGET_SCORE && !won) {
              won = true;
              setPhase("won");
              window.setTimeout(finish, 1100);
            }
            return false;
          }
          return true;
        });

        if (!won && now - startTime > AUTO_COMPLETE_MS) {
          won = true;
          setPhase("won");
          window.setTimeout(finish, 900);
        }
      }

      const parallaxY = bike.y - h / 2;
      drawBackground(ctx, w, h, offsets, starsRef.current, now, grainRef.current, parallaxY);
      itemsRef.current.forEach((item) => drawItem(ctx, item, now));
      const tilt = Math.max(-0.3, Math.min(0.3, bike.vy * 0.045));
      drawBikeAndRider(ctx, bikeX, bike.y, tilt, wheelAngleRef.current);
      updateAndDrawParticles(ctx, particlesRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [onComplete]);

  return (
    <div className={`intro-game${fading ? " is-fading" : ""}`}>
      <canvas ref={canvasRef} className="intro-game-canvas" />

      <div className="intro-game-hud">
        <span className="intro-game-score">{score} / {TARGET_SCORE}</span>
        <button type="button" className="intro-game-skip" onClick={() => { setFading(true); window.setTimeout(onComplete, 420); }}>
          Salta la intro
        </button>
      </div>

      {phase === "ready" && (
        <div className="intro-game-hint">
          <p>Mantén premuda la barra d'espai (o toca la pantalla) per pujar</p>
          <p>Recull {TARGET_SCORE} corones KOM abans d'entrar al club</p>
        </div>
      )}

      {phase === "won" && (
        <div className="intro-game-hint intro-game-hint--won">
          <p>Ja ets dels nostres!</p>
        </div>
      )}
    </div>
  );
}
