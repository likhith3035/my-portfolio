import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '../utils/sound';

/* ── 3D Interactive Quantum Singularity & Warp Portal Canvas ── */
function WarpPortalCanvas({ isDark, progress, isExiting, supernovas }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking with inertia
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? width / 2;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? height / 2;
      mouse.targetX = clientX;
      mouse.targetY = clientY;
      mouse.active = true;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // ── Generate 3D Starfield Nodes (Multi-layer depth) ──
    const numParticles = Math.min(Math.floor((width * height) / 5500), 340);
    const hues = ['amber', 'gold', 'cyan', 'magenta', 'white'];

    const particles = Array.from({ length: numParticles }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(width, height) * 0.9 + 30;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 1200 + 40,
        baseRadius: radius,
        orbitRadius: radius,
        angle: angle,
        orbitSpeed: (Math.random() * 0.0045 + 0.0015) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.5 + 0.8,
        hue: hues[Math.floor(Math.random() * hues.length)],
        alpha: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });

    // ── 3D Gyroscopic Quantum Orbital Rings ──
    const rings = [
      { radius: 130, tiltX: 0.85, tiltY: 0.25, speed: 0.016, color: 'rgba(230, 126, 34, ' },
      { radius: 180, tiltX: -0.65, tiltY: 0.75, speed: -0.013, color: 'rgba(251, 191, 36, ' },
      { radius: 240, tiltX: 0.45, tiltY: -0.85, speed: 0.0095, color: 'rgba(56, 189, 248, ' },
      { radius: 300, tiltX: -0.3, tiltY: 0.4, speed: -0.007, color: 'rgba(236, 72, 153, ' },
    ];

    // ── Hyperspace Warp Rays ──
    const warpStreaks = Array.from({ length: 150 }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        angle,
        distance: Math.random() * 80 + 10,
        speed: Math.random() * 16 + 9,
        length: Math.random() * 60 + 35,
        alpha: Math.random() * 0.85 + 0.15,
        width: Math.random() * 2.4 + 0.8,
      };
    });

    // ── Shooting Stars / Comets ──
    const comets = [];
    let nextCometTime = performance.now() + 800;

    // ── Shockwave Rings ──
    const shockwaves = [];
    let lastShockwaveTime = 0;

    let lastTime = performance.now();
    let rotX = 0;
    let rotY = 0;

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Mouse inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const normMouseX = (mouse.x - width / 2) / (width / 2);
      const normMouseY = (mouse.y - height / 2) / (height / 2);
      rotY += (normMouseX * 0.4 - rotY) * 0.06;
      rotX += (normMouseY * 0.4 - rotX) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const curPct = progress.current;
      const isWarpPhase = curPct >= 65;
      const isBurstPhase = curPct >= 88 || isExiting.current;

      // ── Layer 1: Living Multi-Stage Nebula Plasma ──
      const corePulse = 1 + Math.sin(now * 0.003) * 0.14;
      const coreRadius = Math.max(120, width * 0.24) * (isWarpPhase ? 1.7 : 1) * corePulse;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * (isBurstPhase ? 4.0 : 1.9));

      if (isDark) {
        coreGrad.addColorStop(0, isBurstPhase ? 'rgba(255, 245, 220, 0.7)' : 'rgba(230, 126, 34, 0.42)');
        coreGrad.addColorStop(0.25, isWarpPhase ? 'rgba(251, 191, 36, 0.25)' : 'rgba(230, 126, 34, 0.18)');
        coreGrad.addColorStop(0.55, 'rgba(168, 85, 247, 0.09)');
        coreGrad.addColorStop(0.85, 'rgba(56, 189, 248, 0.04)');
        coreGrad.addColorStop(1, 'transparent');
      } else {
        coreGrad.addColorStop(0, isBurstPhase ? 'rgba(230, 126, 34, 0.5)' : 'rgba(230, 126, 34, 0.28)');
        coreGrad.addColorStop(0.3, 'rgba(251, 191, 36, 0.16)');
        coreGrad.addColorStop(0.65, 'rgba(168, 85, 247, 0.06)');
        coreGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Layer 1.5: Anamorphic Horizontal Laser Flare ──
      const flareAlpha = isBurstPhase ? 0.75 : Math.max(0.1, (curPct / 100) * 0.45);
      const flareGrad = ctx.createLinearGradient(0, cy, width, cy);
      flareGrad.addColorStop(0, 'transparent');
      flareGrad.addColorStop(0.4, `rgba(230, 126, 34, ${flareAlpha * 0.25})`);
      flareGrad.addColorStop(0.5, isDark ? `rgba(255, 255, 255, ${flareAlpha})` : `rgba(230, 126, 34, ${flareAlpha})`);
      flareGrad.addColorStop(0.6, `rgba(56, 189, 248, ${flareAlpha * 0.25})`);
      flareGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.strokeStyle = flareGrad;
      ctx.lineWidth = isBurstPhase ? 3.5 : 1.5;
      ctx.stroke();

      // ── Layer 2: Interactive Gravity Lensing at Cursor ──
      if (mouse.active) {
        const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        mouseGrad.addColorStop(0, isDark ? 'rgba(230, 126, 34, 0.18)' : 'rgba(230, 126, 34, 0.12)');
        mouseGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Layer 3: Dynamic Singularity Shockwaves ──
      if (isWarpPhase && now - lastShockwaveTime > (isBurstPhase ? 180 : 380)) {
        lastShockwaveTime = now;
        shockwaves.push({
          radius: 25,
          maxRadius: Math.max(width, height) * 0.8,
          alpha: isBurstPhase ? 0.95 : 0.6,
          speed: isBurstPhase ? 950 : 450,
        });
      }

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed * dt;
        const progressRatio = sw.radius / sw.maxRadius;
        const currentAlpha = sw.alpha * (1 - progressRatio);

        if (progressRatio >= 1) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(230, 126, 34, ${currentAlpha})`;
        ctx.lineWidth = 2.5 * (1 - progressRatio);
        ctx.stroke();
      }

      // ── Layer 4: Shooting Stars / Celestial Comets ──
      if (now > nextCometTime && !isBurstPhase) {
        nextCometTime = now + Math.random() * 2000 + 1000;
        const startX = Math.random() * width;
        const startY = Math.random() * (height * 0.45);
        const length = Math.random() * 150 + 95;
        const speed = Math.random() * 800 + 600;
        const cometAngle = Math.PI / 4 + (Math.random() - 0.5) * 0.25;
        comets.push({ x: startX, y: startY, length, speed, angle: cometAngle, alpha: 0.98 });
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += Math.cos(c.angle) * c.speed * dt;
        c.y += Math.sin(c.angle) * c.speed * dt;
        c.alpha -= dt * 0.85;

        if (c.alpha <= 0 || c.x > width + 120 || c.y > height + 120) {
          comets.splice(i, 1);
          continue;
        }

        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const cometGrad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        cometGrad.addColorStop(0, 'transparent');
        cometGrad.addColorStop(0.7, `rgba(251, 191, 36, ${c.alpha * 0.65})`);
        cometGrad.addColorStop(1, `rgba(255, 255, 255, ${c.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      // ── Layer 5: Supernova Sparks (from user clicks) ──
      if (supernovas && supernovas.current) {
        for (let i = supernovas.current.length - 1; i >= 0; i--) {
          const sn = supernovas.current[i];
          sn.x += sn.vx * 60 * dt;
          sn.y += sn.vy * 60 * dt;
          sn.vx *= 0.94;
          sn.vy *= 0.94;
          sn.alpha -= dt * 0.88;

          if (sn.alpha <= 0) {
            supernovas.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(sn.x, sn.y, sn.size * sn.alpha, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${sn.color}, ${sn.alpha})`;
          ctx.shadowColor = `rgba(${sn.color}, 0.9)`;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ── Layer 6: 3D Projected Constellation Particles & Vortex ──
      ctx.save();
      ctx.translate(cx, cy);

      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Twinkle
        p.twinklePhase += p.twinkleSpeed;
        const twinkleFactor = 0.75 + Math.sin(p.twinklePhase) * 0.25;

        if (!isBurstPhase) {
          if (!isWarpPhase) {
            // Phase 1: Graceful orbital drift + cursor slingshot physics
            p.angle += p.orbitSpeed;
            p.x = Math.cos(p.angle) * p.orbitRadius;
            p.y = Math.sin(p.angle) * p.orbitRadius;

            if (mouse.active) {
              const dx = (mouse.x - cx) - p.x;
              const dy = (mouse.y - cy) - p.y;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < 240 && d > 0) {
                const force = (1 - d / 240) * 1.4;
                p.x += (dx / d) * force;
                p.y += (dy / d) * force;
              }
            }
          } else {
            // Phase 2: Singularity vortex inward spiral
            const pullFactor = 1 + (curPct - 65) * 0.13;
            p.orbitRadius = Math.max(10, p.orbitRadius - 2.8 * pullFactor);
            p.angle += p.orbitSpeed * (3.8 + (curPct - 65) * 0.28);
            p.x = Math.cos(p.angle) * p.orbitRadius;
            p.y = Math.sin(p.angle) * p.orbitRadius;
          }
        } else {
          // Phase 3: Hyperdrive warp burst (camera accelerates forward)
          p.z -= dt * 2100;
          if (p.z < 20) p.z += 1150;
        }

        // 3D Perspective Rotation Matrix
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        let px = p.x * cosY - p.z * sinY;
        let pz = p.x * sinY + p.z * cosY;
        let py = p.y * cosX - pz * sinX;
        pz = p.y * sinX + pz * cosX;

        const fov = 550;
        const scale = fov / (fov + pz);
        const screenX = px * scale;
        const screenY = py * scale;

        if (scale > 0) {
          projected.push({
            x: screenX,
            y: screenY,
            scale,
            alpha: p.alpha * Math.min(scale, 1.45) * twinkleFactor,
            hue: p.hue,
            size: p.size * scale,
          });
        }
      }

      // ── Draw 3D Constellation Filaments ──
      if (!isBurstPhase) {
        const maxDist = isWarpPhase ? 90 : 125;
        for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          for (let j = i + 1; j < projected.length; j++) {
            const p2 = projected[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.3 * Math.min(p1.alpha, p2.alpha);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              if (p1.hue === 'cyan' || p2.hue === 'cyan') {
                ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha * 0.88})`;
              } else if (p1.hue === 'magenta' || p2.hue === 'magenta') {
                ctx.strokeStyle = `rgba(236, 72, 153, ${lineAlpha * 0.88})`;
              } else {
                ctx.strokeStyle = isDark
                  ? `rgba(230, 126, 34, ${lineAlpha})`
                  : `rgba(230, 126, 34, ${lineAlpha * 0.92})`;
              }
              ctx.lineWidth = 0.95 * Math.min(p1.scale, p2.scale);
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw 3D Star Nodes ──
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.65, p.size), 0, Math.PI * 2);

        let colorStr = `rgba(230, 126, 34, ${p.alpha})`;
        if (p.hue === 'gold') colorStr = `rgba(251, 191, 36, ${p.alpha})`;
        if (p.hue === 'cyan') colorStr = `rgba(56, 189, 248, ${p.alpha * 0.95})`;
        if (p.hue === 'magenta') colorStr = `rgba(244, 114, 182, ${p.alpha * 0.95})`;
        if (p.hue === 'white') colorStr = `rgba(255, 255, 255, ${p.alpha * 0.98})`;

        ctx.fillStyle = colorStr;
        ctx.fill();

        if (p.scale > 0.85 && !isBurstPhase) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = colorStr.replace(/[\d\.]+\)$/, `${p.alpha * 0.24})`);
          ctx.fill();
        }
      }

      // ── Draw 3D Gyroscopic Quantum Orbital Rings on Canvas ──
      if (!isBurstPhase) {
        rings.forEach((ring, idx) => {
          ring.tiltX += ring.speed;
          ring.tiltY += ring.speed * 0.75;

          ctx.beginPath();
          const segments = 54;
          for (let s = 0; s <= segments; s++) {
            const theta = (s / segments) * Math.PI * 2;
            const rx = Math.cos(theta) * ring.radius;
            const ry = Math.sin(theta) * ring.radius * Math.cos(ring.tiltX);
            const rz = Math.sin(theta) * ring.radius * Math.sin(ring.tiltY);

            const fov = 550;
            const scale = fov / (fov + rz);
            const sx = rx * scale;
            const sy = ry * scale;

            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.strokeStyle = ring.color + (isDark ? '0.28)' : '0.2)');
          ctx.lineWidth = 1.3;
          ctx.setLineDash([5, 9]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // ── Hyperspace Warp Tunnel Streaks ──
      if (isWarpPhase || isBurstPhase) {
        const warpMultiplier = isBurstPhase ? 6.2 : 1 + (curPct - 65) * 0.16;
        for (let i = 0; i < warpStreaks.length; i++) {
          const s = warpStreaks[i];
          s.distance += s.speed * warpMultiplier;
          if (s.distance > Math.max(width, height)) {
            s.distance = Math.random() * 35 + 10;
          }

          const sx = Math.cos(s.angle) * s.distance;
          const sy = Math.sin(s.angle) * s.distance;
          const streakLen = s.length * warpMultiplier;
          const ex = Math.cos(s.angle) * (s.distance + streakLen);
          const ey = Math.sin(s.angle) * (s.distance + streakLen);

          const grad = ctx.createLinearGradient(sx, sy, ex, ey);
          grad.addColorStop(0, 'rgba(230, 126, 34, 0)');
          grad.addColorStop(0.35, `rgba(251, 191, 36, ${s.alpha * 0.85})`);
          grad.addColorStop(1, isDark ? 'rgba(255, 255, 255, 0.98)' : 'rgba(230, 126, 34, 0.98)');

          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = grad;
          ctx.lineWidth = isBurstPhase ? s.width * 2.4 : s.width;
          ctx.stroke();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

export default function PageLoader({ theme = 'light', onComplete }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [flightData, setFlightData] = useState(null);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [hexStream, setHexStream] = useState('0x7F2A..INIT');

  const progressRef = useRef(0);
  const isExitingRef = useRef(false);
  const completedRef = useRef(false);
  const loaderLogoRef = useRef(null);
  const supernovasRef = useRef([]);

  // 3D Portal interactive mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), { stiffness: 220, damping: 24 });

  const isDark = theme === 'dark';

  // Live hex stream ticker
  useEffect(() => {
    const hexChars = '0123456789ABCDEF';
    const interval = setInterval(() => {
      let hash = '0x';
      for (let i = 0; i < 4; i++) hash += hexChars[Math.floor(Math.random() * 16)];
      setHexStream(`${hash}..CORE_STABLE`);
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Read sound state on mount & unlock on user interaction
  useEffect(() => {
    try {
      setSoundEnabled(sound.enabled);
    } catch {}

    const unlockAudio = () => {
      sound.init();
      if (sound.enabled && !completedRef.current) {
        sound.startWarpWhoosh(2.6);
      }
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const toggleSound = (e) => {
    e?.stopPropagation();
    const state = sound.toggle();
    setSoundEnabled(state);
    if (state) {
      sound.startWarpWhoosh(2.6);
    } else {
      sound.stopWarpWhoosh();
    }
  };

  // Spawn supernova particles on user click
  const handleStageClick = (e) => {
    if (e.target.closest('button, a')) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? window.innerWidth / 2;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? window.innerHeight / 2;

    const colors = ['230, 126, 34', '251, 191, 36', '56, 189, 248', '236, 72, 153', '168, 85, 247'];
    const newSparks = Array.from({ length: 18 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 3;
      return {
        x: clientX,
        y: clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
      };
    });

    supernovasRef.current.push(...newSparks);
  };

  const finishLoader = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    progressRef.current = 100;
    setDisplayProgress(100);

    // Give a brief cinematic hold at 100% so the user can perceive the peak warp completion
    setTimeout(() => {
      isExitingRef.current = true;

      try {
        sound.stopWarpWhoosh();
      } catch {}

      // Calculate exact resting position of the navbar logo target
      const loaderLogo = loaderLogoRef.current;
      if (loaderLogo) {
        const loaderRect = loaderLogo.getBoundingClientRect();
        const isMobile = window.innerWidth < 640;
        const navTop = isMobile ? 12 : 20;
        const navPaddingX = isMobile ? 16 : 24;
        const navWidth = Math.min(window.innerWidth * 0.94, 768);
        const navLeft = (window.innerWidth - navWidth) / 2;

        const targetCenterX = navLeft + navPaddingX + 16;
        const targetCenterY = navTop + (isMobile ? 22 : 26);
        const targetWidth = 32;

        const deltaX = targetCenterX - (loaderRect.left + loaderRect.width / 2);
        const deltaY = targetCenterY - (loaderRect.top + loaderRect.height / 2);
        const targetScale = targetWidth / loaderRect.width;

        setFlightData({
          top: loaderRect.top,
          left: loaderRect.left,
          width: loaderRect.width,
          height: loaderRect.height,
          deltaX,
          deltaY,
          targetScale,
        });
      }

      setIsExiting(true);

      // Trigger onComplete at 950ms so the navbar & hero dissolve in smoothly
      setTimeout(() => {
        onComplete?.();
      }, 950);

      // Unmount PageLoader after full cinematic exit completes
      setTimeout(() => {
        setIsDone(true);
      }, 1300);
    }, 450);
  };

  // Keyboard skip listener (Space, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        finishLoader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronized smooth progression engine with hold-to-accelerate
  useEffect(() => {
    let startTimestamp = null;
    let baseDuration = 2600; // 2.6s normal cinematic build

    try {
      sound.startWarpWhoosh(2.6);
    } catch {}

    let currentSimulatedProgress = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const rate = isAccelerating ? 2.5 : 1.0;
      currentSimulatedProgress += (100 / (baseDuration / 16.66)) * rate;

      const pct = Math.min(Math.round(currentSimulatedProgress), 100);

      progressRef.current = pct;
      setDisplayProgress(pct);

      if (pct < 100 && !completedRef.current) {
        requestAnimationFrame(step);
      } else {
        finishLoader();
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isAccelerating]);

  if (isDone) return null;

  // Dynamic cosmic telemetry status messages
  const hudStatus =
    displayProgress < 25
      ? '// [01] QUANTUM CORE · INITIALIZING NEURAL MESH'
      : displayProgress < 55
      ? '// [02] REPOSITORIES · SYNCHRONIZING ARTIFACTS'
      : displayProgress < 85
      ? '// [03] WARP DRIVE · CHARGING HYPERSPACE VORTEX'
      : '// [04] WARP JUMP READY · ENTERING KAMI LIKHITH';

  const strokeDashoffset = 345 - (345 * displayProgress) / 100;

  return (
    <AnimatePresence>
      {!isDone && (
        <div
          onMouseMove={(e) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
          }}
          className="fixed inset-0 z-[9999] select-none overflow-hidden font-sans"
        >
          {/* ════ Layer 0: GPU Composited Logo Docking to Navbar Anchor ════ */}
          {flightData && isExiting && (
            <motion.div
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                boxShadow: '0 0 50px rgba(230,126,34,0.7)',
              }}
              animate={{
                x: flightData.deltaX,
                y: flightData.deltaY,
                scale: flightData.targetScale,
                opacity: [1, 1, 1, 0.9, 0],
                boxShadow: '0 0 10px rgba(230,126,34,0.2)',
              }}
              transition={{
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.4, 0.75, 0.92, 1],
              }}
              style={{
                position: 'fixed',
                top: flightData.top,
                left: flightData.left,
                width: flightData.width,
                height: flightData.height,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                zIndex: 10000,
                pointerEvents: 'none',
                borderRadius: '9999px',
              }}
              className="overflow-hidden flex items-center justify-center p-0.5 border-2 border-[#E67E22]/80 bg-black shadow-2xl rounded-full"
            >
              <img
                src="/apple-touch-icon.png"
                alt="Kami Likhith Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          )}

          {/* ════ Layer 1: Cinematic Cosmic Warp Backdrop ════ */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0, scale: 1.08, filter: 'blur(10px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: isDark ? '#050507' : '#FAF9F6' }}
            className="absolute inset-0 z-10"
          >
            {/* 3D Warp Portal Interactive Canvas */}
            <WarpPortalCanvas
              isDark={isDark}
              progress={progressRef}
              isExiting={isExitingRef}
              supernovas={supernovasRef}
            />

            {/* Subtle Cosmic Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(230,126,34,1) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
          </motion.div>

          {/* ════ Layer 2: Main Interactive Cosmic Stage Container ════ */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleStageClick}
            className="absolute inset-0 z-20 pointer-events-auto flex flex-col justify-between p-6 sm:p-10 md:p-12 cursor-pointer"
          >
            {/* ── Top HUD Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]"
            >
              {/* Left: Brand Identity Badge & Live Hex Telemetry */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E67E22]/40 bg-[#E67E22]/10 backdrop-blur-md shadow-[0_0_18px_rgba(230,126,34,0.25)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E67E22] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E67E22]" />
                  </span>
                  <span className="font-extrabold text-[#E67E22] text-[10px] tracking-widest">QUANTUM PORTAL // v4.2</span>
                </div>
                <span className={`hidden md:inline-block font-semibold tracking-[0.22em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {hexStream}
                </span>
              </div>

              {/* Center: Audio Synthesizer Toggle */}
              <div
                onClick={toggleSound}
                className={`hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#E67E22]/25 bg-black/5 dark:bg-white/5 backdrop-blur-md cursor-pointer hover:border-[#E67E22]/60 hover:bg-[#E67E22]/10 transition-all ${
                  soundEnabled ? 'text-[#E67E22]' : isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
                title="Toggle Sound"
              >
                <div className="flex items-end gap-0.5 h-3 w-3.5">
                  <span className={`w-0.5 rounded-full bg-current ${soundEnabled ? 'animate-[bounce_0.6s_ease-in-out_infinite]' : 'h-1'}`} />
                  <span className={`w-0.5 rounded-full bg-current ${soundEnabled ? 'animate-[bounce_0.8s_ease-in-out_infinite_0.15s]' : 'h-2'}`} />
                  <span className={`w-0.5 rounded-full bg-current ${soundEnabled ? 'animate-[bounce_0.5s_ease-in-out_infinite_0.3s]' : 'h-1.5'}`} />
                </div>
                <span className="text-[9px] font-bold tracking-wider">
                  WOOOOH SOUND: {soundEnabled ? 'ACTIVE' : 'MUTED'}
                </span>
              </div>

              {/* Right: Quick Launch Shortcut Pill */}
              <div
                onClick={(e) => { e.stopPropagation(); finishLoader(); }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-black/5 dark:bg-white/5 hover:border-[#E67E22]/50 backdrop-blur-sm text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-[#E67E22] transition-all cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-pulse" />
                <span className="font-semibold tracking-wider">SPACE / TAP TO JUMP ↵</span>
              </div>
            </motion.div>

            {/* ── Centerpiece: Interactive 3D Holographic Portal & Typography ── */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative z-30 flex flex-col items-center justify-center my-auto w-full max-w-4xl mx-auto text-center px-4"
            >
              {/* ── Holographic Portal Gyroscope around Center Emblem ── */}
              <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
                
                {/* SVG Progress Ring */}
                <svg className="w-48 h-48 sm:w-60 sm:h-60 -rotate-90 pointer-events-none" viewBox="0 0 140 140">
                  {/* Track Ring */}
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    className={`${isDark ? 'stroke-white/10' : 'stroke-black/10'}`}
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Outer Tech Marker Ticks */}
                  <circle
                    cx="70"
                    cy="70"
                    r="64"
                    stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
                    strokeWidth="1"
                    strokeDasharray="2 6"
                    fill="none"
                  />
                  {/* Degree coordinate markers */}
                  <circle
                    cx="70"
                    cy="70"
                    r="52"
                    stroke={isDark ? 'rgba(230,126,34,0.15)' : 'rgba(230,126,34,0.12)'}
                    strokeWidth="0.75"
                    strokeDasharray="8 20"
                    fill="none"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    stroke="url(#portalGradientSuper)"
                    strokeWidth="3.5"
                    strokeDasharray="377"
                    strokeDashoffset={377 - (377 * displayProgress) / 100}
                    strokeLinecap="round"
                    fill="none"
                    className="drop-shadow-[0_0_20px_rgba(230,126,34,0.95)] transition-[stroke-dashoffset] duration-75"
                  />
                  <defs>
                    <linearGradient id="portalGradientSuper" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FBBF24" />
                      <stop offset="30%" stopColor="#E67E22" />
                      <stop offset="65%" stopColor="#FB7185" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Concentric Dashed Orbit Rings */}
                <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-[#E67E22]/35 animate-[spin_20s_linear_infinite] pointer-events-none" />
                <div className="absolute -inset-9 sm:-inset-12 rounded-full border border-[#E67E22]/20 animate-[spin_32s_linear_infinite_reverse] pointer-events-none" />
                <div className="absolute -inset-14 sm:-inset-18 rounded-full border border-cyan-400/15 animate-[spin_44s_linear_infinite] pointer-events-none" />

                {/* Core Halo Glow */}
                <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-amber-500/30 via-[#E67E22]/50 to-rose-500/30 blur-3xl pointer-events-none" />

                {/* Central Glassmorphic Circular Emblem with Holographic Scanner */}
                <div
                  ref={loaderLogoRef}
                  className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2 border-2 border-[#E67E22]/70 bg-black shadow-[0_0_50px_rgba(230,126,34,0.65)] backdrop-blur-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-black border border-white/20 flex items-center justify-center p-1 shadow-inner relative">
                    <img
                      src="/apple-touch-icon.png"
                      alt="Kami Likhith Logo"
                      className="w-full h-full object-cover rounded-full relative z-10"
                    />
                    
                    {/* Holographic Laser Scanline */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E67E22] to-transparent animate-[bounce_2.2s_ease-in-out_infinite] opacity-75 shadow-[0_0_8px_#E67E22] pointer-events-none z-20" />
                  </div>

                  {/* Quantum Pulse Node */}
                  <span className="absolute bottom-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E67E22] opacity-80" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E67E22] border-2 border-[#050507]" />
                  </span>
                </div>
              </div>

              {/* ── Main Name Typography with Shimmer ── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3.5"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-none">
                  <span className={`inline-block mr-3 sm:mr-5 drop-shadow-md ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    KAMI
                  </span>
                  <span className="inline-block bg-gradient-to-r from-amber-300 via-[#E67E22] to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(230,126,34,0.6)]">
                    LIKHITH
                  </span>
                </h1>

                {/* Subtitle Tech Pill */}
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full border border-[#E67E22]/35 bg-[#E67E22]/10 backdrop-blur-md shadow-[0_0_20px_rgba(230,126,34,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-ping" />
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] font-bold text-[#E67E22]">
                      SOFTWARE ENGINEER &middot; AI RESEARCHER &middot; FULL STACK
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ── Progress Telemetry Bar ── */}
              <div className="mt-8 sm:mt-10 w-full max-w-sm sm:max-w-md mx-auto">
                <div className={`relative w-full h-[5px] rounded-full overflow-hidden ${isDark ? 'bg-zinc-800/80' : 'bg-zinc-200/90'} shadow-inner`}>
                  <div
                    className="h-full bg-gradient-to-r from-[#E67E22] via-[#FBD249] to-[#FF6B00] rounded-full shadow-[0_0_20px_rgba(230,126,34,0.95)] relative"
                    style={{
                      width: `${displayProgress}%`,
                      transition: 'width 25ms linear',
                      willChange: 'width',
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#fff,0_0_25px_#E67E22]" />
                  </div>
                </div>

                {/* Telemetry Status Feed */}
                <div className="mt-3.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
                  <span className={`uppercase font-semibold truncate ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {hudStatus}
                  </span>
                  <span className="font-extrabold text-[#E67E22] ml-2 shrink-0 text-sm">
                    {displayProgress}%
                  </span>
                </div>
              </div>

              {/* ── Interactive Launch & Accelerate Prompt Pill ── */}
              <motion.div
                onMouseDown={() => setIsAccelerating(true)}
                onMouseUp={() => setIsAccelerating(false)}
                onTouchStart={() => setIsAccelerating(true)}
                onTouchEnd={() => setIsAccelerating(false)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: displayProgress >= 80 ? 1 : 0.55, scale: isAccelerating ? 1.05 : 1 }}
                className={`mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border transition-all cursor-pointer font-mono text-xs font-bold uppercase tracking-widest ${
                  isAccelerating
                    ? 'border-amber-400 bg-amber-500/30 text-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.6)]'
                    : 'border-[#E67E22]/40 bg-[#E67E22]/15 text-[#E67E22] hover:bg-[#E67E22]/25 hover:border-[#E67E22]/70 shadow-[0_0_22px_rgba(230,126,34,0.25)]'
                }`}
              >
                <span>{displayProgress >= 95 ? '⚡ WARP JUMP READY' : isAccelerating ? '🚀 WARP ACCELERATING...' : 'HOLD / SPACE TO WARP ↵'}</span>
              </motion.div>
            </motion.div>

            {/* ── Bottom HUD Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isExiting ? { y: -15, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 flex items-end justify-between text-[10px] sm:text-xs font-mono"
            >
              {/* Left: Coordinate telemetry */}
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-5 sm:w-7 h-[1.5px] bg-[#E67E22] rounded-full shadow-[0_0_8px_#E67E22]" />
                  <span className={`uppercase tracking-[0.22em] font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    SRIKALAHASTI &middot; AP &middot; INDIA
                  </span>
                </div>
                <span className={`hidden sm:inline-block text-[9px] uppercase tracking-[0.25em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  STELLAR VELOCITY: 299,792 KM/S &middot; WARP FACTOR 9.2 &middot; 60 FPS
                </span>
              </div>

              {/* Right: Tabular percentage readout */}
              <div className="flex items-baseline gap-1 select-none font-mono">
                <span
                  className={`text-4xl sm:text-6xl font-black tracking-tighter tabular-nums ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {displayProgress.toString().padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#E67E22] tracking-normal">
                  %
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
