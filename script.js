/**
 * ===================================================================
 * WARZONE CYBER VANGUARD - ULTRA INTERACTIVE ENGINE
 * 1. Rich Canvas Battlefield: Horizon silhouettes, artillery explosions,
 *    flak detonations, expanding shockwaves, 3D perspective cyber grid,
 *    volumetric smoke nebulae, tracer lasers, multi-depth embers
 * 2. Tactical Custom Cursor: HUD reticle, target lock-on, dynamic spark
 *    trail, and magnetic card spotlight
 * 3. Web Audio Synthesizer: Low cinematic war ambience drone
 * 4. 3D Pop-Up Skills Armory & Staggered Power Meters
 * 5. Interactive 3D Card Tilt & Holographic HUD Typewriter
 * 6. Theme switch, mobile nav, project filter & contact handler
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =================================================================
     1. HIGH-DETAIL WARZONE CANVAS ENGINE
     ================================================================= */
  const canvas = document.getElementById('war-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildHorizon();
    });

    // --- Horizon Silhouette (Mountains & Ruined Fortress Skyline) ---
    let horizonPoints = [];
    const horizonY = () => height * 0.82;

    function buildHorizon() {
      horizonPoints = [];
      const baseY = horizonY();
      const segments = Math.floor(width / 35);
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        // Layered pseudo-mountain roughness
        const peakHeight = Math.sin(i * 0.4) * 25 + Math.cos(i * 1.2) * 18 + Math.sin(i * 2.8) * 8;
        horizonPoints.push({ x, y: baseY - Math.max(0, peakHeight) });
      }
    }
    buildHorizon();

    // --- Volumetric Battlefield Smoke Nebulae ---
    const smokeClouds = [
      { x: width * 0.2, y: height * 0.65, r: 240, vx: 0.15, vy: -0.05, alpha: 0.08, color: '255, 87, 34' },
      { x: width * 0.75, y: height * 0.55, r: 300, vx: -0.12, vy: -0.03, alpha: 0.07, color: '180, 50, 20' },
      { x: width * 0.5, y: height * 0.75, r: 280, vx: 0.08, vy: -0.04, alpha: 0.09, color: '0, 240, 255' }
    ];

    // --- Multi-Layer Particle Embers ---
    const emberColors = ['#ff5722', '#ff9800', '#ffc107', '#ff1744', '#ff7043', '#00f0ff'];
    const embers = [];
    const emberCount = Math.min(100, Math.floor(window.innerWidth / 14));

    class Ember {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 15;
        this.depth = Math.random(); // 0 = far, 1 = close
        this.size = this.depth > 0.7 ? Math.random() * 3 + 1.8 : Math.random() * 1.8 + 0.6;
        this.speedY = (Math.random() * 1.4 + 0.6) * (0.8 + this.depth * 0.8);
        this.speedX = (Math.random() - 0.5) * 1.4;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.color = emberColors[Math.floor(Math.random() * emberColors.length)];
        this.decay = Math.random() * 0.003 + 0.0012;
        this.wiggle = Math.random() * 0.04;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speedY;
        this.angle += this.wiggle;
        this.x += this.speedX + Math.sin(this.angle) * 0.75;
        this.opacity -= this.decay;

        if (this.y < -15 || this.opacity <= 0 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        if (this.depth > 0.6) {
          ctx.shadowBlur = this.size * 4;
          ctx.shadowColor = this.color;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < emberCount; i++) {
      embers.push(new Ember());
    }

    // --- Cursor Spark Particles Trail ---
    const cursorSparks = [];
    class CursorSpark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.8;
        this.size = Math.random() * 2.2 + 0.8;
        this.alpha = 1;
        this.color = Math.random() > 0.4 ? '#00f0ff' : '#ff5722';
        this.decay = Math.random() * 0.035 + 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.size *= 0.96;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // --- Shockwaves (from clicks and flak detonations) ---
    const shockwaves = [];
    class Shockwave {
      constructor(x, y, maxR = 140, color = 'rgba(0, 240, 255,') {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = maxR;
        this.alpha = 0.9;
        this.speed = Math.random() * 3 + 4;
        this.color = color;
      }

      update() {
        this.radius += this.speed;
        this.alpha = Math.max(0, 1 - (this.radius / this.maxRadius));
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = `${this.color} ${this.alpha * 0.85})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color.includes('255, 87') ? '#ff5722' : '#00f0ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // --- Flak Detonations ---
    const flakBursts = [];
    class FlakBurst {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 0;
        this.maxLife = 35;
        this.sparks = [];
        const count = Math.floor(Math.random() * 12 + 10);
        for (let i = 0; i < count; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = Math.random() * 4.5 + 1.5;
          this.sparks.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd,
            size: Math.random() * 2.5 + 1,
            color: Math.random() > 0.5 ? '#ffab00' : '#ff3d00'
          });
        }
        // Spawn an expanding shockwave
        shockwaves.push(new Shockwave(this.x, this.y, 110, 'rgba(255, 171, 0,'));
      }

      update() {
        this.life++;
        this.sparks.forEach(s => {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.05; // slight gravity
          s.size *= 0.94;
        });
      }

      draw() {
        const progress = this.life / this.maxLife;
        const alpha = Math.max(0, 1 - progress);

        // Flash core
        if (this.life < 5) {
          ctx.save();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 - this.life * 0.15})`;
          ctx.shadowBlur = 25;
          ctx.shadowColor = '#ffab00';
          ctx.beginPath();
          ctx.arc(this.x, this.y, (5 - this.life) * 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Shrapnel sparks
        ctx.save();
        ctx.globalAlpha = alpha;
        this.sparks.forEach(s => {
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      isDead() {
        return this.life >= this.maxLife;
      }
    }

    // --- Tracer Laser Rounds ---
    const tracers = [];
    class Tracer {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.7);
        const angle = (Math.random() * 0.4 - 0.2) + (Math.random() > 0.5 ? 0 : Math.PI);
        const speed = Math.random() * 20 + 16;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = Math.random() > 0.4 ? '#ff5722' : '#00f0ff';
        this.life = 0;
        this.maxLife = Math.random() * 30 + 20;
        this.active = false;
      }

      trigger() {
        this.reset();
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life >= this.maxLife || this.x < -100 || this.x > width + 100) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        ctx.save();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
        ctx.stroke();

        // Bright white bullet head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 5; i++) {
      tracers.push(new Tracer());
    }

    // --- Horizon Bombardment State ---
    let horizonFlashIntensity = 0;
    let horizonFlashX = width * 0.5;
    let nextBombardmentTime = Date.now() + 2000;
    let nextFlakTime = Date.now() + 3500;

    // --- 3D Perspective Grid at Bottom ---
    function drawPerspectiveGrid() {
      const baseY = horizonY();
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;

      // Horizon line
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      ctx.lineTo(width, baseY);
      ctx.stroke();

      // Perspective vertical rays converging toward center horizon
      const vanishX = width * 0.5;
      const count = 18;
      for (let i = -count; i <= count; i++) {
        const bottomX = vanishX + (i * (width / count) * 1.4);
        ctx.beginPath();
        ctx.moveTo(vanishX, baseY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Horizontal perspective rungs
      for (let y = baseY + 8; y < height; y += (y - baseY) * 0.42 + 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- Draw Horizon Silhouettes ---
    function drawHorizon() {
      const baseY = horizonY();

      // Artillery back-flash bloom behind mountains
      if (horizonFlashIntensity > 0) {
        ctx.save();
        const flashGrad = ctx.createRadialGradient(horizonFlashX, baseY, 10, horizonFlashX, baseY, 320);
        flashGrad.addColorStop(0, `rgba(255, 171, 0, ${horizonFlashIntensity})`);
        flashGrad.addColorStop(0.4, `rgba(255, 87, 34, ${horizonFlashIntensity * 0.7})`);
        flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = flashGrad;
        ctx.fillRect(0, baseY - 350, width, 400);
        ctx.restore();
      }

      // Mountain / Fortress Silhouette
      ctx.save();
      ctx.fillStyle = '#060910';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, horizonPoints[0]?.y || baseY);
      horizonPoints.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(width, baseY);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Distant perimeter beacon lights
      ctx.fillStyle = '#ff1744';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff1744';
      for (let i = 2; i < horizonPoints.length; i += 5) {
        ctx.beginPath();
        ctx.arc(horizonPoints[i].x, horizonPoints[i].y - 3, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // --- Main Render Loop ---
    function renderLoop() {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      // Trigger Horizon Artillery Bombardment
      if (now > nextBombardmentTime) {
        horizonFlashIntensity = Math.random() * 0.35 + 0.15;
        horizonFlashX = Math.random() * (width * 0.8) + (width * 0.1);
        nextBombardmentTime = now + Math.random() * 3200 + 1800;

        // Occasional tracer fire
        const inactiveTracer = tracers.find(t => !t.active);
        if (inactiveTracer && Math.random() > 0.2) {
          inactiveTracer.trigger();
        }
      }
      if (horizonFlashIntensity > 0) {
        horizonFlashIntensity *= 0.94;
        if (horizonFlashIntensity < 0.005) horizonFlashIntensity = 0;
      }

      // Trigger Mid-air Flak Bursts
      if (now > nextFlakTime) {
        const flakX = Math.random() * (width * 0.85) + (width * 0.08);
        const flakY = Math.random() * (height * 0.5) + (height * 0.1);
        flakBursts.push(new FlakBurst(flakX, flakY));
        nextFlakTime = now + Math.random() * 4500 + 2500;
      }

      // 1. Draw Volumetric Smoke Clouds
      smokeClouds.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < -c.r) c.x = width + c.r;
        if (c.x > width + c.r) c.x = -c.r;
        if (c.y < -c.r) c.y = height + c.r;

        ctx.save();
        const grad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, c.r);
        grad.addColorStop(0, `rgba(${c.color}, ${c.alpha})`);
        grad.addColorStop(0.6, `rgba(${c.color}, ${c.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw 3D Perspective Grid
      drawPerspectiveGrid();

      // 3. Draw Horizon Silhouette & Artillery Flashes
      drawHorizon();

      // 4. Update & Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.update();
        sw.draw();
        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
        }
      }

      // 5. Update & Draw Flak Bursts
      for (let i = flakBursts.length - 1; i >= 0; i--) {
        const fb = flakBursts[i];
        fb.update();
        fb.draw();
        if (fb.isDead()) {
          flakBursts.splice(i, 1);
        }
      }

      // 6. Update & Draw Tracers
      tracers.forEach(t => {
        t.update();
        t.draw();
      });

      // 7. Update & Draw Cursor Sparks
      for (let i = cursorSparks.length - 1; i >= 0; i--) {
        const s = cursorSparks[i];
        s.update();
        s.draw();
        if (s.alpha <= 0) {
          cursorSparks.splice(i, 1);
        }
      }

      // 8. Update & Draw Embers
      embers.forEach(ember => {
        ember.update();
        ember.draw();
      });

      requestAnimationFrame(renderLoop);
    }

    renderLoop();

    // Mouse movement interaction with embers & spawn cursor sparks
    let lastSparkTime = 0;
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Spawn cursor sparks if moved
      const now = Date.now();
      if (now - lastSparkTime > 35) {
        cursorSparks.push(new CursorSpark(mouseX, mouseY));
        if (Math.random() > 0.5) cursorSparks.push(new CursorSpark(mouseX, mouseY));
        lastSparkTime = now;
      }

      // Embers deflection
      embers.forEach(ember => {
        const dx = ember.x - mouseX;
        const dy = ember.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const force = (90 - dist) / 90;
          ember.x += (dx / dist) * force * 5;
          ember.y += (dy / dist) * force * 5;
        }
      });
    }, { passive: true });

    // Interactive Shockwave on Click anywhere
    window.addEventListener('click', (e) => {
      shockwaves.push(new Shockwave(e.clientX, e.clientY, 160, 'rgba(0, 240, 255,'));
      // Push embers violently
      embers.forEach(ember => {
        const dx = ember.x - e.clientX;
        const dy = ember.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ember.x += (dx / dist) * 25;
          ember.y += (dy / dist) * 25;
        }
      });
    });
  }

  /* =================================================================
     2. TACTICAL HUD CURSOR & TARGET LOCK-ON
     ================================================================= */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorReticle = document.getElementById('cursor-reticle');
  const cursorLockText = document.getElementById('cursor-lock-text');

  if (cursorDot && cursorReticle) {
    let mousePos = { x: -100, y: -100 };
    let reticlePos = { x: -100, y: -100 };

    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      // Instant dot positioning
      cursorDot.style.left = `${mousePos.x}px`;
      cursorDot.style.top = `${mousePos.y}px`;
    }, { passive: true });

    // Smooth reticle lerp interpolation
    function animateReticle() {
      reticlePos.x += (mousePos.x - reticlePos.x) * 0.22;
      reticlePos.y += (mousePos.y - reticlePos.y) * 0.22;

      cursorReticle.style.left = `${reticlePos.x}px`;
      cursorReticle.style.top = `${reticlePos.y}px`;

      requestAnimationFrame(animateReticle);
    }
    animateReticle();

    // Target lock-on targets
    const lockTargets = document.querySelectorAll(`
      a, button, .project-card, .armory-card, .skill-pop-item,
      .intel-stat-box, .timeline-card, .hud-terminal-card, input, textarea
    `);

    lockTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorReticle.classList.add('locked');
        cursorDot.classList.add('locked');

        // Contextual lock readouts
        let tag = '[ TARGET LOCKED ]';
        if (el.tagName === 'A') tag = '[ ENGAGE LINK ]';
        else if (el.tagName === 'BUTTON') tag = '[ EXECUTE ]';
        else if (el.classList.contains('skill-pop-item')) tag = '[ WEAPON TECH ]';
        else if (el.classList.contains('project-card')) tag = '[ MISSION DATA ]';

        if (cursorLockText) cursorLockText.textContent = tag;
      });

      el.addEventListener('mouseleave', () => {
        cursorReticle.classList.remove('locked');
        cursorDot.classList.remove('locked');
        if (cursorLockText) cursorLockText.textContent = '';
      });
    });

    // Dynamic magnetic spotlight on cards
    const spotlightCards = document.querySelectorAll(`
      .project-card, .armory-card, .intel-stat-box, .timeline-card,
      .hud-terminal-card, .contact-form, .about-text-card
    `);

    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });
  }

  /* =================================================================
     3. LOW AMBIENCE SOUND SYNTHESIZER (Web Audio API)
     ================================================================= */
  const audioToggleBtn = document.getElementById('audio-toggle');
  let audioCtx = null;
  let isPlayingAmbience = false;
  let masterGain = null;
  let osc1 = null;
  let osc2 = null;
  let noiseNode = null;

  function initAmbienceSynth() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      // Master output gain
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);

      // Lowpass filter for deep cinematic rumble
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, audioCtx.currentTime);

      // Oscillator 1: Deep cinematic drone (48Hz Sub)
      osc1 = audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(48, audioCtx.currentTime);

      // Oscillator 2: Slightly detuned drone (50.5Hz) for pulse beat
      osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(50.5, audioCtx.currentTime);

      // Atmospheric wind / noise generator
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      const noiseFilter = audioCtx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(220, audioCtx.currentTime);
      noiseFilter.Q.setValueAtTime(3.0, audioCtx.currentTime);

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

      // Wiring nodes
      osc1.connect(filter);
      osc2.connect(filter);
      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(filter);

      filter.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      noiseNode.start();
    } catch (err) {
      console.warn('Web Audio API not supported or blocked:', err);
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        initAmbienceSynth();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const audioOffIcon = audioToggleBtn.querySelector('.audio-off-icon');
      const audioOnIcon = audioToggleBtn.querySelector('.audio-on-icon');
      const label = audioToggleBtn.querySelector('.audio-label');

      if (!isPlayingAmbience) {
        // Fade in volume smoothly
        masterGain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 1.2);
        isPlayingAmbience = true;
        audioToggleBtn.classList.add('playing');
        if (audioOffIcon) audioOffIcon.style.display = 'none';
        if (audioOnIcon) audioOnIcon.style.display = 'inline-block';
        if (label) label.textContent = 'Ambience: ON';
      } else {
        // Fade out
        masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
        isPlayingAmbience = false;
        audioToggleBtn.classList.remove('playing');
        if (audioOffIcon) audioOffIcon.style.display = 'inline-block';
        if (audioOnIcon) audioOnIcon.style.display = 'none';
        if (label) label.textContent = 'Ambience: OFF';
      }
    });
  }

  /* =================================================================
     4. HIGH-IMPACT SKILLS POP-UP & METER CHARGE ANIMATION
     ================================================================= */
  const skillsSection = document.getElementById('skills');

  if (skillsSection) {
    let animated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          skillsSection.classList.add('in-view');

          // 1. Percentage counters
          const percentCounters = skillsSection.querySelectorAll('.skill-percent');
          percentCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 90;
            let current = 0;
            const duration = 1400; // ms
            const stepTime = Math.max(15, Math.floor(duration / target));

            const timer = setInterval(() => {
              current += 2;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = `${current}%`;
            }, stepTime);
          });

          // 2. Animate meter fill widths
          const meterFills = skillsSection.querySelectorAll('.skill-meter-fill');
          meterFills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            setTimeout(() => {
              fill.style.width = progress;
            }, 250);
          });
        }
      });
    }, {
      threshold: 0.2
    });

    skillsObserver.observe(skillsSection);
  }

  /* =================================================================
     5. HUD TYPEWRITER EFFECT IN HERO TERMINAL
     ================================================================= */
  const typewriterElement = document.getElementById('hud-typewriter');
  if (typewriterElement) {
    const phrases = [
      'deploying tactical-defense.sh...',
      'scanning full-stack vulnerabilities: 0 found',
      'pairing VS Code + Copilot AI...',
      'ready to build bulletproof web solutions.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typingSpeed = isDeleting ? 30 : 55;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 600);
  }

  /* =================================================================
     6. 3D TILT EFFECT ON CARDS
     ================================================================= */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });

  /* =================================================================
     7. THEME SWITCHER (Dark & Light)
     ================================================================= */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }

  /* =================================================================
     8. MOBILE DRAWER NAVIGATION
     ================================================================= */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.style.display = isOpen ? 'none' : 'block';
        menuCloseIcon.style.display = isOpen ? 'block' : 'none';
      }
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.style.display = 'block';
          menuCloseIcon.style.display = 'none';
        }
      });
    });
  }

  /* =================================================================
     9. DYNAMIC YEAR
     ================================================================= */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =================================================================
     10. PROJECT / MISSION CATEGORY FILTERING
     ================================================================= */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* =================================================================
     11. SCROLL-SPY ACTIVE LINK
     ================================================================= */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const scrollSpy = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy, { passive: true });

  /* =================================================================
     12. CONTACT TRANSMISSION SIMULATION
     ================================================================= */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>ENCRYPTING & TRANSMITTING...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formStatus.textContent = '✓ TRANSMISSION DELIVERED. FREQUENCY LOCKED.';
        formStatus.className = 'form-status success';
        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }
});
