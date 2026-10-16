/* Vicino — effets visuels : orbite des satellites, traînée d’étoiles, pause des animations */

(() => {
  "use strict";
  let effectsPaused = false;
  const stage = document.querySelector(".stage");
  const satellites = stage ? [...stage.querySelectorAll(".satellite")] : [];
  let orbitFrame = 0,
    previous = null,
    phase = 0,
    visible = true;
  function positionSatellites() {
    if (!stage) return;
    const w = stage.clientWidth,
      h = stage.clientHeight;
    const widest = Math.max(...satellites.map((card) => card.offsetWidth), 100);
    const rx = Math.max(55, (w - widest) / 2 - 10);
    const ry = Math.max(60, h * 0.32);
    satellites.forEach((card, index) => {
      const angle = phase - Math.PI * 0.82 + (index * Math.PI * 2) / 3;
      const depth = Math.sin(angle);
      card.style.setProperty("--ox", (Math.cos(angle) * rx).toFixed(2) + "px");
      card.style.setProperty("--oy", (depth * ry).toFixed(2) + "px");
      card.style.zIndex = depth > 0 ? "3" : "1";
      card.style.opacity = depth > 0 ? "1" : ".95";
    });
  }
  function orbitTick(now) {
    orbitFrame = 0;
    if (document.hidden || effectsPaused || !visible) {
      previous = null;
      return;
    }
    if (previous !== null)
      phase += (Math.min(now - previous, 100) / 1000) * ((Math.PI * 2) / 14);
    previous = now;
    positionSatellites();
    orbitFrame = requestAnimationFrame(orbitTick);
  }
  function syncOrbit() {
    if (orbitFrame) cancelAnimationFrame(orbitFrame);
    orbitFrame = 0;
    previous = null;
    positionSatellites();
    if (satellites.length && !document.hidden && !effectsPaused && visible)
      orbitFrame = requestAnimationFrame(orbitTick);
  }
  if (stage && "IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        syncOrbit();
      },
      { rootMargin: "100px" },
    ).observe(stage);
  }
  addEventListener("resize", positionSatellites);
  document.fonts?.ready.then(positionSatellites);
  document.addEventListener("visibilitychange", syncOrbit);
  syncOrbit();

  const canvas = document.getElementById("star-trail");
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  let particles = [],
    trailFrame = 0,
    lastEmit = -Infinity,
    lastPoint = null;
  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * ratio);
    canvas.height = Math.round(innerHeight * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function clear() {
    particles = [];
    lastPoint = null;
    if (trailFrame) cancelAnimationFrame(trailFrame);
    trailFrame = 0;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  function drawStar(particle, age) {
    const progress = age / particle.life;
    const x = particle.x + (particle.vx * age) / 1000;
    const y =
      particle.y + (particle.vy * age) / 1000 + progress * progress * 14;
    const radius = particle.size * (1 - progress * 0.65);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(particle.angle + progress * 0.8);
    ctx.globalAlpha = (1 - progress) * 0.85;
    ctx.fillStyle = particle.color;
    ctx.shadowColor = "#b6ff65";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4,
        r = i % 2 ? radius * 0.22 : radius;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  function draw(now) {
    trailFrame = 0;
    if (effectsPaused || !fine.matches || document.hidden) {
      clear();
      return;
    }
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles = particles.filter((p) => now - p.born < p.life);
    particles.forEach((p) => drawStar(p, now - p.born));
    if (particles.length) trailFrame = requestAnimationFrame(draw);
  }
  document.addEventListener(
    "pointermove",
    (event) => {
      if (effectsPaused || !fine.matches || event.pointerType === "touch")
        return;
      const now = performance.now();
      if (now - lastEmit < 16) return;
      const point = { x: event.clientX, y: event.clientY };
      const previousPoint = lastPoint || point;
      const distance = Math.hypot(
        point.x - previousPoint.x,
        point.y - previousPoint.y,
      );
      if (distance < 2 && lastPoint) return;
      lastPoint = point;
      lastEmit = now;
      const count = Math.min(10, Math.max(4, Math.ceil(distance / 6)));
      for (let i = 0; i < count; i++) {
        const f = i / count;
        particles.push({
          x:
            previousPoint.x +
            (point.x - previousPoint.x) * f +
            (Math.random() - 0.5) * 8,
          y:
            previousPoint.y +
            (point.y - previousPoint.y) * f +
            (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 22,
          vy: (Math.random() - 0.5) * 20,
          size: 5 + Math.random() * 6,
          life: 1300 + Math.random() * 600,
          born: now,
          angle: Math.random() * Math.PI,
          color: Math.random() > 0.65 ? "#b6ff65" : "#f7fff0",
        });
      }
      if (particles.length > 140) particles.splice(0, particles.length - 140);
      if (!trailFrame) trailFrame = requestAnimationFrame(draw);
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => {
    lastPoint = null;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") clear();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clear();
  });
  addEventListener("blur", clear);
  addEventListener("resize", () => {
    clear();
    resize();
  });
  fine.addEventListener("change", clear);
  resize();
  const motionButton = document.getElementById("motion-toggle");
  motionButton?.addEventListener("click", () => {
    effectsPaused = !effectsPaused;
    motionButton.setAttribute("aria-pressed", String(!effectsPaused));
    motionButton.textContent = effectsPaused
      ? "Riprendi gli effetti"
      : "Pausa effetti";
    syncOrbit();
    if (effectsPaused) clear();
  });
})();
