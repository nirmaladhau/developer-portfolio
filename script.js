/**
 * ===================================================================
 * WARZONE CYBER VANGUARD - INTERACTIVE ENGINE
 * 1. Fullscreen Canvas: Battle embers, tracer lasers, horizon flashes
 * 2. Web Audio Synthesizer: Low cinematic war ambience drone
 * 3. 3D Pop-Up Skills Armory & Staggered Power Meters
 * 4. Interactive 3D Card Tilt & Holographic HUD Typewriter
 * 5. Theme switch, mobile nav, project filter & contact handler
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =================================================================
     1. WARZONE CANVAS ENGINE (Embers, Tracers, Horizon Flashes)
     ================================================================= */
  const canvas = document.getElementById('war-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle pool for embers
    const emberCount = Math.min(85, Math.floor(window.innerWidth / 16));
    const embers = [];
    const colors = ['#ff5722', '#ff9800', '#ffc107', '#ff1744', '#ff7043'];

    class Ember {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.8 + 0.8;
        this.speedY = Math.random() * 1.5 + 0.6;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.decay = Math.random() * 0.003 + 0.001;
        this.wiggle = Math.random() * 0.05;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speedY;
        this.angle += this.wiggle;
        this.x += this.speedX + Math.sin(this.angle) * 0.8;
        this.opacity -= this.decay;

        if (this.y < -10 || this.opacity <= 0 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < emberCount; i++) {
      embers.push(new Ember());
    }

    // Laser / Tracer beam system
    const tracers = [];
    class Tracer {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.6);
        const angle = (Math.random() * 0.4 - 0.2) + (Math.random() > 0.5 ? 0 : Math.PI);
        const speed = Math.random() * 18 + 14;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.length = Math.random() * 80 + 50;
        this.color = Math.random() > 0.4 ? '#ff5722' : '#00f0ff';
        this.life = 0;
        this.maxLife = Math.random() * 35 + 20;
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
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 2.5, this.y - this.vy * 2.5);
        ctx.stroke();
        ctx.restore();
      }
    }

    for (let i = 0; i < 4; i++) {
      tracers.push(new Tracer());
    }

    // Distant battlefield flashes (artillery lighting)
    let flashIntensity = 0;
    let nextFlashTime = Date.now() + 3000;

    function renderLoop() {
      ctx.clearRect(0, 0, width, height);

      // Distant horizon artillery flash
      const now = Date.now();
      if (now > nextFlashTime) {
        flashIntensity = Math.random() * 0.16 + 0.08;
        nextFlashTime = now + Math.random() * 4500 + 2000;
        
        // Randomly fire a tracer
        const inactiveTracer = tracers.find(t => !t.active);
        if (inactiveTracer && Math.random() > 0.3) {
          inactiveTracer.trigger();
        }
      }

      if (flashIntensity > 0) {
        ctx.save();
        const flashGrad = ctx.createLinearGradient(0, height, 0, height * 0.4);
        flashGrad.addColorStop(0, `rgba(255, 87, 34, ${flashIntensity})`);
        flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = flashGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        flashIntensity *= 0.92;
        if (flashIntensity < 0.005) flashIntensity = 0;
      }

      // Update & render tracers
      tracers.forEach(t => {
        t.update();
        t.draw();
      });

      // Update & render embers
      embers.forEach(ember => {
        ember.update();
        ember.draw();
      });

      requestAnimationFrame(renderLoop);
    }

    renderLoop();

    // Mouse movement interaction with embers
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      embers.forEach(ember => {
        const dx = ember.x - mouseX;
        const dy = ember.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          ember.x += (dx / dist) * force * 4;
          ember.y += (dy / dist) * force * 4;
        }
      });
    }, { passive: true });
  }

  /* =================================================================
     2. LOW AMBIENCE SOUND SYNTHESIZER (Web Audio API)
     Zero external MP3 files needed! Native synthetic atmospheric drone.
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

      // Oscillator 2: Slightly detuned drone (50Hz) for pulse beat
      osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(50.5, audioCtx.currentTime);

      // Subtle atmospheric wind / noise generator
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
     3. HIGH-IMPACT SKILLS POP-UP & METER CHARGE ANIMATION
     Triggers when the user scrolls into the #skills section
     ================================================================= */
  const skillsSection = document.getElementById('skills');

  if (skillsSection) {
    let animated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          skillsSection.classList.add('in-view');

          // 1. Staggered percentage counters
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
     4. HUD TYPEWRITER EFFECT IN HERO TERMINAL
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
        typingSpeed = 1800; // Pause at full phrase
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
     5. 3D TILT EFFECT ON CARDS
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
