/**
 * ===================================================================
 * WARZONE CYBER VANGUARD - ULTRA INTERACTIVE ENGINE
 * 1. Rich Canvas Battlefield: Horizon silhouettes, artillery explosions,
 *    flak detonations, expanding shockwaves, 3D perspective cyber grid,
 *    volumetric smoke nebulae, tracer lasers, multi-depth embers.
 * 2. Tactical Armed Soldier: Fully equipped background operator with
 *    tactical helmet, glowing NVG visor, plate carrier, radio antenna,
 *    scoped tactical DMR rifle, laser sight, brass casing ejection,
 *    recoil physics, and animated muzzle flash bursts.
 * 3. Tactical Gunfire Sound Synthesis: Web Audio API gunfire sound
 *    triggered on every click and weapon discharge.
 * 4. Battle-Hardened Cinematic War Music Synth: Military war drum pulse,
 *    heavy reese sub-bass drone, and dark minor tension chords.
 * 5. Tactical Custom Cursor: HUD reticle, target lock-on, dynamic spark
 *    trail, and magnetic card spotlight.
 * 6. 3D Pop-Up Skills Armory & Staggered Power Meters (20%, 60%, 80%).
 * 7. Interactive 3D Card Tilt & Holographic HUD Typewriter.
 * 8. Theme switch, mobile nav, project filter & contact transmission.
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =================================================================
     AUDIO ENGINE: TACTICAL GUNFIRE & BATTLE-HARDENED AMBIENCE
     ================================================================= */
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // --- Real-time Synthesized Gunfire Sound (Crisp, punchy, mechanical crack & sub punch) ---
  function playTacticalGunfireSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Layer 1: Supersonic Muzzle Crack (Highpass/Bandpass Noise)
      const bufferSize = Math.floor(ctx.sampleRate * 0.08);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.014));
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3200 + (Math.random() - 0.5) * 400, now);
      noiseFilter.Q.setValueAtTime(2.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.38, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(now);

      // Layer 2: Heavy Sub-Bass Gunshot Body / Punch (Pitch Drop)
      const subOsc = ctx.createOscillator();
      subOsc.type = 'triangle';
      const startFreq = 210 + (Math.random() - 0.5) * 20;
      subOsc.frequency.setValueAtTime(startFreq, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.09);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.42, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.13);

      // Layer 3: Metallic Chamber Resonance / Echo Tail
      const tailBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.22), ctx.sampleRate);
      const tailData = tailBuffer.getChannelData(0);
      for (let i = 0; i < tailData.length; i++) {
        tailData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
      }
      const tailSource = ctx.createBufferSource();
      tailSource.buffer = tailBuffer;

      const tailFilter = ctx.createBiquadFilter();
      tailFilter.type = 'lowpass';
      tailFilter.frequency.setValueAtTime(800, now);

      const tailGain = ctx.createGain();
      tailGain.gain.setValueAtTime(0.18, now);
      tailGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      tailSource.connect(tailFilter);
      tailFilter.connect(tailGain);
      tailGain.connect(ctx.destination);
      tailSource.start(now);
    } catch (err) {
      // Audio context policy
    }
  }

  // --- Battle-Hardened Cinematic War Ambience & Military Drum March Synth ---
  const audioToggleBtn = document.getElementById('audio-toggle');
  let isPlayingAmbience = false;
  let masterGain = null;
  let drumIntervalTimer = null;
  let reeseOscs = [];
  let tensionOscs = [];
  let ambientNoiseNode = null;

  function initAmbienceSynth() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Master output gain
      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);

      // --- 1. Battle-Hardened Heavy Reese Sub-Bass Drone ---
      // 3 Detuned sawtooth oscillators tuned to low D (36.7Hz, 37.2Hz, 73.4Hz)
      const frequencies = [36.7, 37.2, 73.4];
      const reeseFilter = ctx.createBiquadFilter();
      reeseFilter.type = 'lowpass';
      reeseFilter.frequency.setValueAtTime(140, ctx.currentTime);
      reeseFilter.Q.setValueAtTime(3.5, ctx.currentTime);

      // Waveshaper distortion curve for gritty military brass saturation
      const distortion = ctx.createWaveShaper();
      const n_samples = 256;
      const curve = new Float32Array(n_samples);
      const deg = Math.PI / 180;
      for (let i = 0; i < n_samples; ++i) {
        const x = (i * 2) / n_samples - 1;
        curve[i] = ((3 + 12) * x * 20 * deg) / (Math.PI + 12 * Math.abs(x));
      }
      distortion.curve = curve;
      distortion.oversample = '2x';

      frequencies.forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(reeseFilter);
        osc.start();
        reeseOscs.push(osc);
      });

      reeseFilter.connect(distortion);
      distortion.connect(masterGain);

      // --- 2. Dark Minor-Second Tension Chord Harmonics (D3 & Eb3) ---
      const tensionFilter = ctx.createBiquadFilter();
      tensionFilter.type = 'bandpass';
      tensionFilter.frequency.setValueAtTime(220, ctx.currentTime);
      tensionFilter.Q.setValueAtTime(2.0, ctx.currentTime);

      const tensionGain = ctx.createGain();
      tensionGain.gain.setValueAtTime(0.06, ctx.currentTime);

      [146.83, 155.56].forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(tensionFilter);
        osc.start();
        tensionOscs.push(osc);
      });

      tensionFilter.connect(tensionGain);
      tensionGain.connect(masterGain);

      // --- 3. Battlefield Wind & Comms Filter ---
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      ambientNoiseNode = ctx.createBufferSource();
      ambientNoiseNode.buffer = noiseBuffer;
      ambientNoiseNode.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(280, ctx.currentTime);
      windFilter.Q.setValueAtTime(2.2, ctx.currentTime);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.045, ctx.currentTime);

      ambientNoiseNode.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);
      ambientNoiseNode.start();

      masterGain.connect(ctx.destination);
    } catch (err) {
      console.warn('Ambience synth initialization error:', err);
    }
  }

  // --- Military War Drum March Heartbeat Cadence (Taiko Sub-Kick + Metallic Rim Pulse) ---
  function playWarDrumPulse() {
    if (!isPlayingAmbience || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;

      // Heavy Sub War Drum Kick
      const kickOsc = audioCtx.createOscillator();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(85, now);
      kickOsc.frequency.exponentialRampToValueAtTime(26, now + 0.28);

      const kickGain = audioCtx.createGain();
      kickGain.gain.setValueAtTime(0.35, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      kickOsc.connect(kickGain);
      kickGain.connect(masterGain);
      kickOsc.start(now);
      kickOsc.stop(now + 0.35);

      // Metallic chain / snare rattle transient
      const snareBuffer = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * 0.12), audioCtx.sampleRate);
      const data = snareBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.02));
      }
      const snareSrc = audioCtx.createBufferSource();
      snareSrc.buffer = snareBuffer;

      const snareFilter = audioCtx.createBiquadFilter();
      snareFilter.type = 'highpass';
      snareFilter.frequency.setValueAtTime(600, now);

      const snareGain = audioCtx.createGain();
      snareGain.gain.setValueAtTime(0.12, now);
      snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      snareSrc.connect(snareFilter);
      snareFilter.connect(snareGain);
      snareGain.connect(masterGain);
      snareSrc.start(now);
    } catch (e) {}
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering immediate gunshot on the button itself

      if (!audioCtx) {
        initAmbienceSynth();
      }

      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const audioOffIcon = audioToggleBtn.querySelector('.audio-off-icon');
      const audioOnIcon = audioToggleBtn.querySelector('.audio-on-icon');
      const label = audioToggleBtn.querySelector('.audio-label');

      if (!isPlayingAmbience) {
        if (masterGain) {
          masterGain.gain.linearRampToValueAtTime(0.24, audioCtx.currentTime + 1.2);
        }
        isPlayingAmbience = true;
        audioToggleBtn.classList.add('playing');
        if (audioOffIcon) audioOffIcon.style.display = 'none';
        if (audioOnIcon) audioOnIcon.style.display = 'inline-block';
        if (label) label.textContent = 'Ambience: ON';

        // Start military marching war drum cadence (~50 BPM / every 1.2s)
        playWarDrumPulse();
        drumIntervalTimer = setInterval(playWarDrumPulse, 1200);
      } else {
        if (masterGain) {
          masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
        }
        isPlayingAmbience = false;
        audioToggleBtn.classList.remove('playing');
        if (audioOffIcon) audioOffIcon.style.display = 'inline-block';
        if (audioOnIcon) audioOnIcon.style.display = 'none';
        if (label) label.textContent = 'Ambience: OFF';

        if (drumIntervalTimer) {
          clearInterval(drumIntervalTimer);
          drumIntervalTimer = null;
        }
      }
    });
  }

  /* =================================================================
     1. HIGH-DETAIL WARZONE CANVAS ENGINE (With Armed Tactical Soldier)
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
        this.depth = Math.random();
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

    // --- Expanding Shockwaves ---
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
        this.alpha = Math.max(0, 1 - this.radius / this.maxRadius);
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

    // --- Ejected Brass Shell Casings ---
    const shellCasings = [];
    class ShellCasing {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 3 + 2; // Eject to right/rear
        this.vy = -Math.random() * 4 - 3; // Pop up
        this.rotation = Math.random() * Math.PI;
        this.spin = (Math.random() - 0.5) * 0.45;
        this.life = 0;
        this.maxLife = 50;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.28; // Gravity
        this.rotation += this.spin;
        this.life++;
      }

      draw() {
        const progress = this.life / this.maxLife;
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = '#ffc107';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ff9800';
        ctx.fillRect(-2, -1, 5, 2);
        ctx.restore();
      }
    }

    // --- Muzzle Smoke Puffs ---
    const muzzleSmokes = [];
    class MuzzleSmoke {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5 - 1.2;
        this.vy = (Math.random() - 0.5) * 1.2 - 0.8;
        this.size = Math.random() * 4 + 4;
        this.alpha = 0.55;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.4;
        this.alpha -= 0.025;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = 'rgba(200, 210, 225, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
        shockwaves.push(new Shockwave(this.x, this.y, 110, 'rgba(255, 171, 0,'));
      }

      update() {
        this.life++;
        this.sparks.forEach(s => {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.05;
          s.size *= 0.94;
        });
      }

      draw() {
        const progress = this.life / this.maxLife;
        const alpha = Math.max(0, 1 - progress);

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
      constructor(customStartX = null, customStartY = null, customVx = null, customVy = null, customColor = null) {
        if (customStartX !== null) {
          this.x = customStartX;
          this.y = customStartY;
          this.vx = customVx;
          this.vy = customVy;
          this.color = customColor || '#00f0ff';
          this.life = 0;
          this.maxLife = 40;
          this.active = true;
        } else {
          this.reset();
        }
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

      ctx.beginPath();
      ctx.moveTo(0, baseY);
      ctx.lineTo(width, baseY);
      ctx.stroke();

      const vanishX = width * 0.5;
      const count = 18;
      for (let i = -count; i <= count; i++) {
        const bottomX = vanishX + i * (width / count) * 1.4;
        ctx.beginPath();
        ctx.moveTo(vanishX, baseY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

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

      // Perimeter beacon lights
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

    // =================================================================
    // TACTICAL ARMED SOLDIER (With Scope, NVG, Vest, Recoil & Flash)
    // =================================================================
    class TacticalSoldier {
      constructor() {
        this.recoil = 0;
        this.muzzleFlash = 0;
        this.aimAngle = -0.12; // In radians, relative to left (-X)
        this.targetAngle = -0.12;
        this.aimX = width * 0.2;
        this.aimY = height * 0.4;
        this.glintTimer = 0;
        this.antennaBlink = 0;
        this.nextBurstTime = Date.now() + 2500;
        this.burstQueue = 0;
        this.lastShotTime = 0;
      }

      getPos() {
        const baseY = horizonY();
        const posX = width > 992 ? width * 0.78 : (width > 600 ? width * 0.83 : width * 0.86);
        return { x: posX, y: baseY - 16 };
      }

      fire(clickTargetX = null, clickTargetY = null) {
        const pos = this.getPos();
        if (clickTargetX !== null && clickTargetY !== null) {
          this.aimX = clickTargetX;
          this.aimY = clickTargetY;
          // Calculate angle relative to soldier position facing left
          const dx = clickTargetX - (pos.x - 45);
          const dy = clickTargetY - (pos.y - 14);
          let rawAngle = Math.atan2(dy, dx);
          // Clamp to tactical firing cone facing left
          if (rawAngle > 0) rawAngle = -rawAngle;
          this.targetAngle = Math.max(-0.48, Math.min(0.2, rawAngle + Math.PI));
          this.aimAngle = this.targetAngle;
        }

        // Trigger recoil & muzzle flash
        this.recoil = 11;
        this.muzzleFlash = 6;
        playTacticalGunfireSound();

        // Calculate muzzle world coordinates
        const gunLength = 52;
        const barrelAngle = Math.PI + this.aimAngle;
        const muzzleX = (pos.x - 14) + Math.cos(barrelAngle) * gunLength;
        const muzzleY = (pos.y - 12) + Math.sin(barrelAngle) * gunLength;

        // Spawn Muzzle Smoke Puff
        muzzleSmokes.push(new MuzzleSmoke(muzzleX, muzzleY));

        // Spawn Ejected Brass Casing
        shellCasings.push(new ShellCasing(pos.x - 16, pos.y - 18));

        // Spawn Glowing Tracer Projectile toward target angle
        const speed = 28;
        const tracerVx = Math.cos(barrelAngle) * speed;
        const tracerVy = Math.sin(barrelAngle) * speed;
        tracers.push(new Tracer(muzzleX, muzzleY, tracerVx, tracerVy, '#00f0ff'));
      }

      update() {
        const now = Date.now();

        // Recoil spring recovery
        if (this.recoil > 0) {
          this.recoil *= 0.72;
          if (this.recoil < 0.2) this.recoil = 0;
        }

        // Muzzle flash counter
        if (this.muzzleFlash > 0) {
          this.muzzleFlash--;
        }

        // Smooth angle tracking
        this.aimAngle += (this.targetAngle - this.aimAngle) * 0.15;

        // Periodic scope lens glint
        this.glintTimer = (this.glintTimer + 1) % 180;
        this.antennaBlink = (this.antennaBlink + 1) % 60;

        // Autonomous combat bursts (2-3 rounds every 4-6s)
        if (this.burstQueue > 0 && now - this.lastShotTime > 120) {
          this.burstQueue--;
          this.lastShotTime = now;
          this.fire();
        } else if (now > this.nextBurstTime && this.burstQueue === 0) {
          this.burstQueue = Math.floor(Math.random() * 2 + 2); // 2 or 3 rounds
          this.lastShotTime = now;
          this.fire();
          this.nextBurstTime = now + Math.random() * 3500 + 3500;
        }
      }

      draw() {
        const pos = this.getPos();
        ctx.save();
        ctx.translate(pos.x, pos.y);

        // 1. Fortified Sandbag Position & Tactical Rock Barrier
        ctx.fillStyle = '#080d17';
        ctx.strokeStyle = 'rgba(255, 87, 34, 0.25)';
        ctx.lineWidth = 1;

        // Lower Sandbags
        ctx.beginPath();
        ctx.ellipse(-18, 10, 24, 9, 0, 0, Math.PI * 2);
        ctx.ellipse(12, 11, 20, 8, 0, 0, Math.PI * 2);
        ctx.ellipse(-4, 4, 22, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Radio Antenna Mast on back of sandbags
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(14, 4);
        ctx.lineTo(16, -38);
        ctx.stroke();

        // Blinking Radio Beacon LED at antenna tip
        if (this.antennaBlink < 30) {
          ctx.fillStyle = '#00e676';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00e676';
          ctx.beginPath();
          ctx.arc(16, -38, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Apply weapon & soldier recoil kickback
        const recoilX = this.recoil * 0.85;
        const recoilY = -this.recoil * 0.25;

        // 2. Soldier Lower Body & Legs (Tactical kneeling silhouette)
        ctx.fillStyle = '#05080e';
        ctx.beginPath();
        ctx.ellipse(2, 2, 14, 9, -0.2, 0, Math.PI * 2); // Rear knee/boot
        ctx.ellipse(-14, 2, 11, 7, 0.3, 0, Math.PI * 2); // Forward knee
        ctx.fill();

        // 3. Tactical Torso, Plate Carrier & Armored Vest
        ctx.save();
        ctx.translate(recoilX * 0.4, recoilY * 0.4);

        ctx.fillStyle = '#070b13';
        ctx.beginPath();
        ctx.roundRect(-10, -22, 18, 22, 4); // Torso armor block
        ctx.fill();

        // Plate Carrier Pouches on chest
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-9, -16, 5, 8);
        ctx.fillRect(-3, -16, 5, 8);
        ctx.fillRect(3, -16, 4, 8);

        // Shoulder Pauldron
        ctx.fillStyle = '#0b111e';
        ctx.beginPath();
        ctx.arc(-2, -20, 6, 0, Math.PI * 2);
        ctx.fill();

        // 4. Tactical FAST Ballistic Helmet & Head
        ctx.fillStyle = '#090e1a';
        ctx.beginPath();
        ctx.ellipse(-4, -30, 8, 9, -0.1, 0, Math.PI * 2); // Head/helmet base
        ctx.fill();

        // Helmet shroud visor rim
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-12, -32, 10, 4);

        // Dual Night-Vision Goggles (NVG) with Glowing Optic Lenses
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-15, -31, 6, 4); // NVG mount arm

        ctx.fillStyle = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f0ff';
        ctx.beginPath();
        ctx.arc(-14, -30, 2.2, 0, Math.PI * 2); // Left NVG tube
        ctx.arc(-12, -27, 2, 0, Math.PI * 2); // Right NVG tube
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore(); // End torso/head recoil

        // 5. Scoped Tactical DMR / Sniper Rifle (Rotated with Aim & Recoil)
        ctx.save();
        ctx.translate(-4 + recoilX, -16 + recoilY);
        ctx.rotate(this.aimAngle); // Firing elevation angle

        // Buttstock against shoulder
        ctx.fillStyle = '#0a101d';
        ctx.fillRect(8, -3, 14, 5);

        // Lower Receiver & Pistol Grip
        ctx.fillRect(2, -4, 12, 7);
        ctx.fillRect(6, 2, 4, 6); // Pistol grip

        // Curved 30-round STANAG Magazine
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(0, 1);
        ctx.lineTo(-4, 12);
        ctx.lineTo(-8, 11);
        ctx.lineTo(-3, 1);
        ctx.closePath();
        ctx.fill();

        // Rifle Handguard & Picatinny Rail
        ctx.fillStyle = '#0d1524';
        ctx.fillRect(-22, -4, 24, 6);

        // Forward Angled Grip & Left Hand holding it
        ctx.fillStyle = '#05080e';
        ctx.fillRect(-18, 2, 4, 6);

        // Extended Fluted Barrel
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-38, -3, 18, 3.5);

        // Muzzle Brake / Suppressor at tip
        ctx.fillStyle = '#334155';
        ctx.fillRect(-44, -3.5, 6, 4.5);

        // --- HIGH-MAGNIFICATION TACTICAL SCOPE (ACOG / Sniper Scope) ---
        // Scope Mounting Rings
        ctx.fillStyle = '#334155';
        ctx.fillRect(-4, -6, 3, 3);
        ctx.fillRect(-14, -6, 3, 3);

        // Scope Body Cylinder
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-18, -9, 20, 4.5);

        // Scope Eyepiece (Rear ocular bell)
        ctx.fillRect(1, -10, 4, 6.5);

        // Scope Objective Bell (Front large aperture)
        ctx.fillRect(-22, -10.5, 5, 7.5);

        // Elevation Turret Knob on top
        ctx.fillStyle = '#475569';
        ctx.fillRect(-10, -11.5, 4, 3);

        // Tactical Scope Lens Flare Glint (Periodic glint reflection)
        if (this.glintTimer < 25) {
          ctx.save();
          ctx.fillStyle = '#00f0ff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00f0ff';
          ctx.beginPath();
          ctx.arc(-22, -7, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // --- TACTICAL PEQ LASER SIGHTING BEAM ---
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.38)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f0ff';
        ctx.beginPath();
        ctx.moveTo(-44, -1.5);
        ctx.lineTo(-44 - 380, -1.5); // Thin targeting laser beam
        ctx.stroke();
        ctx.restore();

        // --- MUZZLE FLASH BURST (When Firing) ---
        if (this.muzzleFlash > 0) {
          ctx.save();
          const flashScale = this.muzzleFlash / 6;

          // Multi-pointed Starburst Muzzle Cone
          ctx.fillStyle = '#ff9800';
          ctx.shadowBlur = 35;
          ctx.shadowColor = '#ff5722';

          ctx.beginPath();
          ctx.moveTo(-44, -1.5);
          ctx.lineTo(-44 - 32 * flashScale, -16 * flashScale);
          ctx.lineTo(-44 - 24 * flashScale, -4 * flashScale);
          ctx.lineTo(-44 - 42 * flashScale, -1.5);
          ctx.lineTo(-44 - 24 * flashScale, 4 * flashScale);
          ctx.lineTo(-44 - 32 * flashScale, 16 * flashScale);
          ctx.closePath();
          ctx.fill();

          // White-hot core blast
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(-47, -1.5, 7 * flashScale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.restore(); // End rifle transform
        ctx.restore(); // End soldier canvas transform
      }
    }

    const soldier = new TacticalSoldier();

    // --- Main Render Loop ---
    function renderLoop() {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      // Trigger Horizon Artillery Bombardment
      if (now > nextBombardmentTime) {
        horizonFlashIntensity = Math.random() * 0.35 + 0.15;
        horizonFlashX = Math.random() * (width * 0.8) + width * 0.1;
        nextBombardmentTime = now + Math.random() * 3200 + 1800;

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
        const flakX = Math.random() * (width * 0.85) + width * 0.08;
        const flakY = Math.random() * (height * 0.5) + height * 0.1;
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

      // 4. Update & Draw Tactical Armed Soldier
      soldier.update();
      soldier.draw();

      // 5. Update & Draw Muzzle Smoke Puffs
      for (let i = muzzleSmokes.length - 1; i >= 0; i--) {
        const ms = muzzleSmokes[i];
        ms.update();
        ms.draw();
        if (ms.alpha <= 0) muzzleSmokes.splice(i, 1);
      }

      // 6. Update & Draw Ejected Brass Casings
      for (let i = shellCasings.length - 1; i >= 0; i--) {
        const sc = shellCasings[i];
        sc.update();
        sc.draw();
        if (sc.life >= sc.maxLife) shellCasings.splice(i, 1);
      }

      // 7. Update & Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.update();
        sw.draw();
        if (sw.alpha <= 0) shockwaves.splice(i, 1);
      }

      // 8. Update & Draw Flak Bursts
      for (let i = flakBursts.length - 1; i >= 0; i--) {
        const fb = flakBursts[i];
        fb.update();
        fb.draw();
        if (fb.isDead()) flakBursts.splice(i, 1);
      }

      // 9. Update & Draw Tracers
      tracers.forEach(t => {
        t.update();
        t.draw();
      });

      // 10. Update & Draw Cursor Sparks
      for (let i = cursorSparks.length - 1; i >= 0; i--) {
        const s = cursorSparks[i];
        s.update();
        s.draw();
        if (s.alpha <= 0) cursorSparks.splice(i, 1);
      }

      // 11. Update & Draw Embers
      embers.forEach(ember => {
        ember.update();
        ember.draw();
      });

      requestAnimationFrame(renderLoop);
    }

    renderLoop();

    // Mouse movement interaction with embers & cursor sparks
    let lastSparkTime = 0;
    window.addEventListener(
      'mousemove',
      e => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Give aim hints to the soldier
        soldier.aimX = mouseX;
        soldier.aimY = mouseY;

        // Spawn cursor sparks
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
      },
      { passive: true }
    );

    // =================================================================
    // INTERACTIVE WEAPON FIRE ON CLICK ANYWHERE
    // =================================================================
    window.addEventListener('click', e => {
      // 1. Soldier immediately aims and fires a round toward click target
      soldier.fire(e.clientX, e.clientY);

      // 2. Shockwave ripple at click location
      shockwaves.push(new Shockwave(e.clientX, e.clientY, 160, 'rgba(0, 240, 255,'));

      // 3. Embers violent dispersal
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

    window.addEventListener(
      'mousemove',
      e => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        cursorDot.style.left = `${mousePos.x}px`;
        cursorDot.style.top = `${mousePos.y}px`;
      },
      { passive: true }
    );

    function animateReticle() {
      reticlePos.x += (mousePos.x - reticlePos.x) * 0.22;
      reticlePos.y += (mousePos.y - reticlePos.y) * 0.22;

      cursorReticle.style.left = `${reticlePos.x}px`;
      cursorReticle.style.top = `${reticlePos.y}px`;

      requestAnimationFrame(animateReticle);
    }
    animateReticle();

    const lockTargets = document.querySelectorAll(`
      a, button, .project-card, .armory-card, .skill-pop-item,
      .intel-stat-box, .timeline-card, .hud-terminal-card, input, textarea
    `);

    lockTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorReticle.classList.add('locked');
        cursorDot.classList.add('locked');

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

    const spotlightCards = document.querySelectorAll(`
      .project-card, .armory-card, .intel-stat-box, .timeline-card,
      .hud-terminal-card, .contact-form, .about-text-card
    `);

    spotlightCards.forEach(card => {
      card.addEventListener(
        'mousemove',
        e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        },
        { passive: true }
      );
    });
  }

  /* =================================================================
     3. HIGH-IMPACT SKILLS POP-UP & METER CHARGE ANIMATION
     Supports requested percentages: 20%, 40%, 60%, 80%, etc.
     ================================================================= */
  const skillsSection = document.getElementById('skills');

  if (skillsSection) {
    let animated = false;

    const skillsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            skillsSection.classList.add('in-view');

            // 1. Percentage counter animation
            const percentCounters = skillsSection.querySelectorAll('.skill-percent');
            percentCounters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target'), 10) || 50;
              let current = 0;
              const step = Math.max(1, Math.ceil(target / 45));
              const duration = 1200;
              const stepTime = Math.max(16, Math.floor(duration / (target / step)));

              const timer = setInterval(() => {
                current += step;
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
      },
      { threshold: 0.15 }
    );

    skillsObserver.observe(skillsSection);
  }

  /* =================================================================
     4. HUD TYPEWRITER EFFECT IN HERO TERMINAL
     ================================================================= */
  const typewriterElement = document.getElementById('hud-typewriter');
  if (typewriterElement) {
    const phrases = [
      'deploying tactical-defense.sh...',
      'coordinates: Lohegaon, Pune, Maharashtra',
      'evolving python, c++, dsa & ai/ml modules...',
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

      let typingSpeed = isDeleting ? 28 : 50;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1900;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 380;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 600);
  }

  /* =================================================================
     5. 3D TILT EFFECT ON CARDS
     ================================================================= */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
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
     6. THEME SWITCHER (Dark & Light)
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
     7. MOBILE DRAWER NAVIGATION
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
     8. DYNAMIC YEAR
     ================================================================= */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =================================================================
     9. PROJECT / MISSION CATEGORY FILTERING
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
     10. SCROLL-SPY ACTIVE LINK
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
     11. CONTACT TRANSMISSION SIMULATION
     ================================================================= */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', e => {
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
