/* ═══════════════════════════════════════════════════════════════
   ARYAN RUSTAGI — PORTFOLIO · MAIN.JS
   Three.js particle field + GSAP ScrollTrigger + Vanilla Tilt
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────────
   1. GSAP PLUGIN REGISTRATION
────────────────────────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ─────────────────────────────────────────────────────────────────
   2. CUSTOM CURSOR
────────────────────────────────────────────────────────────────── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth follower with rAF
  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();

  // Scale cursor on interactive elements
  const interactive = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-link');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'var(--cyan-light)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
      follower.style.borderColor = 'var(--cyan-light)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '12px';
      cursor.style.height = '12px';
      cursor.style.background = 'var(--purple-light)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.borderColor = 'var(--purple-light)';
    });
  });
})();

/* ─────────────────────────────────────────────────────────────────
   3. THREE.JS — INTERACTIVE PARTICLE UNIVERSE
────────────────────────────────────────────────────────────────── */
(function initThree() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* Scene */
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 3;

  /* ── Stars / Particles ── */
  const STAR_COUNT = 2800;
  const starPositions = new Float32Array(STAR_COUNT * 3);
  const starColors    = new Float32Array(STAR_COUNT * 3);
  const starSizes     = new Float32Array(STAR_COUNT);

  const palette = [
    new THREE.Color(0x7c3aed), // purple
    new THREE.Color(0xa78bfa), // purple-light
    new THREE.Color(0x06b6d4), // cyan
    new THREE.Color(0x67e8f9), // cyan-light
    new THREE.Color(0xffffff), // white
    new THREE.Color(0x10b981), // green
  ];

  for (let i = 0; i < STAR_COUNT; i++) {
    const i3 = i * 3;
    starPositions[i3]     = (Math.random() - 0.5) * 18;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 12;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 10;
    starSizes[i] = Math.random() * 2.5 + 0.5;

    const col = palette[Math.floor(Math.random() * palette.length)];
    starColors[i3]     = col.r;
    starColors[i3 + 1] = col.g;
    starColors[i3 + 2] = col.b;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  const starMat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });

  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ── Floating Geometry ── */
  function makeFloat(geo, color, x, y, z, scale = 1) {
    const mat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(scale);
    scene.add(mesh);
    return mesh;
  }

  const floaters = [
    makeFloat(new THREE.IcosahedronGeometry(0.5, 0), 0x7c3aed, -3.5, 1.5, -1, 1),
    makeFloat(new THREE.OctahedronGeometry(0.4, 0),  0x06b6d4,  3.2,-1.2, -0.5, 1),
    makeFloat(new THREE.TorusGeometry(0.35, 0.1, 8, 20), 0xa78bfa, 2.8, 1.8, -1.5, 1),
    makeFloat(new THREE.TetrahedronGeometry(0.4, 0), 0x10b981, -3, -1.5, -1, 1),
    makeFloat(new THREE.IcosahedronGeometry(0.3, 0), 0x67e8f9,  0,  2.5, -2, 1),
  ];

  /* ── Mouse Interaction ── */
  const mouse = { x: 0, y: 0 };
  let   targetX = 0, targetY = 0;

  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ── Resize ── */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /* ── Animate ── */
  let frameId;
  const clock = new THREE.Clock();

  function animate() {
    frameId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    /* Smooth mouse follow */
    targetX += (mouse.x * 0.15 - targetX) * 0.05;
    targetY += (mouse.y * 0.08 - targetY) * 0.05;

    stars.rotation.y  = elapsed * 0.018 + targetX * 0.3;
    stars.rotation.x  = elapsed * 0.008 + targetY * 0.15;

    /* Animate floaters */
    floaters.forEach((m, i) => {
      m.rotation.x = elapsed * (0.2 + i * 0.07);
      m.rotation.y = elapsed * (0.3 + i * 0.05);
      m.position.y += Math.sin(elapsed * 0.5 + i * 1.2) * 0.002;
    });

    /* Camera subtle drift */
    camera.position.x += (targetX * 0.3 - camera.position.x) * 0.04;
    camera.position.y += (-targetY * 0.2 - camera.position.y) * 0.04;

    renderer.render(scene, camera);
  }

  /* Stop animating when hero is off-screen */
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => { if (!frameId) animate(); },
    onLeave: () => { cancelAnimationFrame(frameId); frameId = null; },
    onEnterBack: () => { if (!frameId) animate(); },
    onLeaveBack: () => { cancelAnimationFrame(frameId); frameId = null; },
  });

  animate();
})();

/* ─────────────────────────────────────────────────────────────────
   4. TYPEWRITER EFFECT
────────────────────────────────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('roleTyped');
  if (!el) return;

  const words = [
    'full-stack web apps',
    'REST APIs with Node.js',
    'beautiful UIs with React',
    'containerized apps with Docker',
    'scalable MERN solutions',
    'clean Java solutions',
  ];

  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word    = words[wi];
    const current = deleting ? word.substring(0, ci - 1) : word.substring(0, ci + 1);
    el.textContent = current;
    if (!deleting) ci++;
    else ci--;

    let delay = deleting ? 45 : 85;

    if (!deleting && ci === word.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  // Start after hero entrance animation
  setTimeout(type, 1600);
})();

/* ─────────────────────────────────────────────────────────────────
   5. NAVBAR — SCROLL STATE & ACTIVE SECTION
────────────────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  // Scroll style
  ScrollTrigger.create({
    start: 80,
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });

  // Active link
  const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
  sections.forEach(id => {
    ScrollTrigger.create({
      trigger: '#' + id,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: ({ isActive }) => {
        navLinks.forEach(link => {
          if (link.dataset.section === id) {
            link.classList.toggle('active', isActive);
          }
        });
      },
    });
  });

  // Hamburger toggle
  hamburger && hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });

  // Close menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
})();

/* ─────────────────────────────────────────────────────────────────
   6. COUNTER ANIMATION (STATS)
────────────────────────────────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  ScrollTrigger.create({
    trigger: '.hero-stats',
    start: 'top 90%',
    once: true,
    onEnter: () => {
      nums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target,
          duration: 1.8,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate() { el.textContent = Math.round(parseFloat(el.textContent)); },
        });
      });
    },
  });
})();

/* ─────────────────────────────────────────────────────────────────
   7. GSAP SCROLL ANIMATIONS
────────────────────────────────────────────────────────────────── */
(function initScrollAnimations() {

  /* ── Generic reveal-up elements ── */
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Project cards — 3D flip-in ── */
  gsap.utils.toArray('.reveal-card').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: i * 0.12,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Timeline items ── */
  gsap.utils.toArray('.reveal-timeline').forEach((el, i) => {
    const side = el.dataset.side;
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Skills section — staggered category reveal ── */
  gsap.utils.toArray('.skill-category').forEach((cat, i) => {
    const cards = cat.querySelectorAll('.skill-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 30, rotateY: -20, scale: 0.92 },
      {
        opacity: 1, y: 0, rotateY: 0, scale: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: cat,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ── Skill bars animate when visible ── */
  gsap.utils.toArray('.skill-fill').forEach(fill => {
    const targetWidth = fill.dataset.width + '%';
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(fill, { width: targetWidth, duration: 1.3, ease: 'power2.out' }),
    });
  });

  /* ── About card — parallax depth ── */
  const aboutCard = document.querySelector('.about-card-3d');
  if (aboutCard) {
    gsap.fromTo(aboutCard,
      { opacity: 0, x: -60, rotateY: 15 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  const aboutText = document.querySelector('.about-text-block');
  if (aboutText) {
    gsap.fromTo(aboutText,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /* ── MERN badge ── */
  const mernBadge = document.querySelector('.mern-badge');
  if (mernBadge) {
    gsap.fromTo(mernBadge,
      { opacity: 0, scale: 0.88, y: 40 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.9,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: mernBadge,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /* ── MERN letter cascade ── */
  const mernLetters = document.querySelectorAll('.mern-icons span');
  if (mernLetters.length) {
    gsap.fromTo(mernLetters,
      { opacity: 0, y: 20, scale: 0.6 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.mern-badge',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /* ── Section headers — title character split ── */
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 40, skewY: 3 },
      {
        opacity: 1, y: 0, skewY: 0,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ── Parallax backgrounds ── */
  gsap.utils.toArray('.section').forEach(section => {
    gsap.to(section, {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  /* ── Hero name — scroll out ── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      y: -80,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom 70%',
        scrub: 1.5,
      },
    });
  }

  /* ── 3D Floating geometry scroll ── */
  gsap.to('#heroCanvas', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  /* ── Contact form ── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    gsap.fromTo(contactForm,
      { opacity: 0, x: 60, rotateY: -10 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactForm,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    gsap.fromTo(contactInfo,
      { opacity: 0, x: -60, rotateY: 10 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactInfo,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /* ── Footer ── */
  const footer = document.querySelector('.footer');
  if (footer) {
    gsap.fromTo(footer,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

})();

/* ─────────────────────────────────────────────────────────────────
   8. VANILLA TILT INITIALIZATION
────────────────────────────────────────────────────────────────── */
(function initTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'));
})();

/* ─────────────────────────────────────────────────────────────────
   9. CONTACT FORM MOCK SUBMIT
────────────────────────────────────────────────────────────────── */
(function initForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !submitBtn) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = document.getElementById('nameInput').value.trim();
    const email   = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();
    if (!name || !email || !message) return;

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending…';

    // Simulate async send
    await new Promise(r => setTimeout(r, 1500));

    submitBtn.querySelector('span').textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    gsap.fromTo(submitBtn,
      { scale: 0.95 },
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    );

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      submitBtn.style.background = '';
    }, 3000);
  });
})();

/* ─────────────────────────────────────────────────────────────────
   10. SMOOTH SCROLL FOR ANCHOR LINKS
────────────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    const offset = 80; // navbar height
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────────────────────────────────
   11. FLOATING PARTICLES ON MOUSE — SPARKLE EFFECT
────────────────────────────────────────────────────────────────── */
(function initSparkles() {
  const colors = ['#7c3aed', '#a78bfa', '#06b6d4', '#67e8f9', '#10b981'];
  let throttle = false;

  document.addEventListener('mousemove', e => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => throttle = false, 80);

    if (Math.random() > 0.45) return; // only ~55% of moves spawn

    const dot = document.createElement('div');
    const size = Math.random() * 6 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];

    dot.style.cssText = `
      position:fixed;
      left:${e.clientX}px;
      top:${e.clientY}px;
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};
      pointer-events:none;
      z-index:9997;
      box-shadow:0 0 ${size * 2}px ${color};
      transform:translate(-50%,-50%);
    `;
    document.body.appendChild(dot);

    gsap.to(dot, {
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60 - 20,
      opacity: 0,
      scale: 0,
      duration: 0.9 + Math.random() * 0.4,
      ease: 'power2.out',
      onComplete: () => dot.remove(),
    });
  });
})();

/* ─────────────────────────────────────────────────────────────────
   12. SECTION BACKGROUND GRADIENT MORPH ON SCROLL
────────────────────────────────────────────────────────────────── */
(function initBgMorph() {
  const gradients = {
    hero:      'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)',
    about:     'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)',
    skills:    'radial-gradient(ellipse 70% 50% at 70% 50%, rgba(6,182,212,0.08) 0%, transparent 70%)',
    projects:  'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)',
    education: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.07) 0%, transparent 70%)',
    contact:   'radial-gradient(ellipse 70% 50% at 50% 70%, rgba(124,58,237,0.08) 0%, transparent 70%)',
  };

  // Simple highlight on scroll — no action needed beyond CSS already doing it
})();

/* ─────────────────────────────────────────────────────────────────
   13. TIMELINE DOT PULSE — TRIGGERED ON ENTER
────────────────────────────────────────────────────────────────── */
(function initTimelineDots() {
  document.querySelectorAll('.dot-ring').forEach(dot => {
    ScrollTrigger.create({
      trigger: dot,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(dot, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 0.7, duration: 0.6, ease: 'back.out(2)',
        });
      },
    });
  });
})();

/* ─────────────────────────────────────────────────────────────────
   14. SCROLL PROGRESS INDICATOR
────────────────────────────────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2.5px;
    background: linear-gradient(90deg, #7c3aed, #06b6d4, #10b981);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(124,58,237,0.7);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(scrolled, 100) + '%';
  });
})();

/* ─────────────────────────────────────────────────────────────────
   15. HERO BADGE FLOATING ANIMATION
────────────────────────────────────────────────────────────────── */
(function initHeroBadge() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  gsap.to(badge, {
    y: -6,
    duration: 2.2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
})();
