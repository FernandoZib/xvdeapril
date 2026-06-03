/* ══════════════════════════════════════════════
   script.js — XV Años April Urtusuastegui
══════════════════════════════════════════════ */

// ─── 1. PARTICLES (golden dust) ───────────────
;(function () {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const container = document.getElementById('particles')
  if (!container) return

  container.appendChild(canvas)

  let W, H, particles = []

  function resize () {
    W = canvas.width  = container.offsetWidth
    H = canvas.height = container.offsetHeight
  }
  resize()
  window.addEventListener('resize', () => { resize(); init() })

  function rand (min, max) { return Math.random() * (max - min) + min }

  function Particle () {
    this.reset()
  }
  Particle.prototype.reset = function () {
    this.x    = rand(0, W)
    this.y    = rand(0, H)
    this.r    = rand(0.5, 2.2)
    this.vx   = rand(-0.15, 0.15)
    this.vy   = rand(-0.4, -0.1)
    this.alpha= rand(0.15, 0.65)
    this.fade = rand(0.001, 0.003)
    this.colorIndex = Math.random()
  }
  Particle.prototype.update = function () {
    this.x += this.vx
    this.y += this.vy
    this.alpha -= this.fade
    if (this.alpha <= 0 || this.y < -5) this.reset()
  }

  function init () {
    const count = Math.floor((W * H) / 5000)
    particles = Array.from({ length: count }, () => new Particle())
  }
  init()

  function loop () {
    ctx.clearRect(0, 0, W, H)
    particles.forEach(p => {
      p.update()
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      const colors = [
        `rgba(201,168,76,${p.alpha})`,
        `rgba(181,69,90,${p.alpha * 0.6})`,
        `rgba(232,201,122,${p.alpha})`
      ]
      ctx.fillStyle = colors[Math.floor(p.colorIndex * colors.length)]
      ctx.fill()
    })
    requestAnimationFrame(loop)
  }
  loop()
})()

// ─── 2. SCROLL REVEAL ─────────────────────────
;(function () {
  const els = document.querySelectorAll('.reveal')
  if (!els.length) return

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.12 })

  els.forEach(el => observer.observe(el))
})()

// ─── 3. COUNTDOWN ─────────────────────────────
;(function () {
  const target = new Date('2026-07-25T16:00:00') // Sábado 25 Julio 2026, Misa 4pm

  const elDays  = document.getElementById('cd-days')
  const elHours = document.getElementById('cd-hours')
  const elMins  = document.getElementById('cd-mins')
  const elSecs  = document.getElementById('cd-secs')

  if (!elDays) return

  function pad (n) { return String(n).padStart(2, '0') }

  function tick () {
    const diff = target - Date.now()

    if (diff <= 0) {
      // La fiesta ya llegó — mostrar mensaje festivo
      elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent = '00'
      const section = document.getElementById('countdown-section')
      if (section) {
        const title = section.querySelector('.section-title')
        if (title) title.textContent = '¡Es hoy! 🌹'
      }
      return
    }

    const days  = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const mins  = Math.floor((diff % 3600000)  / 60000)
    const secs  = Math.floor((diff % 60000)    / 1000)

    elDays.textContent  = pad(days)
    elHours.textContent = pad(hours)
    elMins.textContent  = pad(mins)
    elSecs.textContent  = pad(secs)
  }

  tick()
  setInterval(tick, 1000)
})()

// ─── 4. RSVP FORM ─────────────────────────────
;(function () {
  const btn    = document.getElementById('rsvpBtn')
  const thanks = document.getElementById('rsvpThanks')
  const form   = document.getElementById('rsvpForm')

  if (!btn) return

  btn.addEventListener('click', () => {
    const name   = document.getElementById('rsvp-name').value.trim()
    const guests = document.getElementById('rsvp-guests').value.trim()

    if (!name) {
      shake(document.getElementById('rsvp-name'))
      return
    }

    // Hide inputs, show thank-you
    ;[...form.querySelectorAll('input, button, .rsvp__options')].forEach(el => {
      el.style.display = 'none'
    })
    thanks.style.display = 'block'

    // Optional: send to WhatsApp or a form service
    // const attend = document.querySelector('input[name="attend"]:checked').value
    // const wa = `https://wa.me/521XXXXXXXXXX?text=Hola!+Mi+nombre+es+${encodeURIComponent(name)}+y+confirmo+asistencia+(${guests}+personas).`
    // window.open(wa, '_blank')
  })

  function shake (el) {
    el.style.transition = 'transform 0.1s'
    let count = 0
    const interval = setInterval(() => {
      el.style.transform = count % 2 === 0 ? 'translateX(8px)' : 'translateX(-8px)'
      count++
      if (count > 5) {
        clearInterval(interval)
        el.style.transform = ''
      }
    }, 80)
  }
})()

// ─── 5. NAV SMOOTH (optional small nav) ───────
;(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
})()



   // --- 9. CANVAS PÉTALOS ---
    const canvas = document.getElementById('petalos-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petalos = [];
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();

        function Petalo() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = 15 + Math.random() * 20;
            this.speedY = 1 + Math.random() * 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.opacity = 0.6 + Math.random() * 0.4;
            this.angle = Math.random() * 2 * Math.PI;
            this.spin = Math.random() * 0.02 - 0.01;
            this.color = `rgba(204, 182, 130, ${this.opacity})`;
        }

        Petalo.prototype.update = function() {
            this.y += this.speedY; this.x += this.speedX; this.angle += this.spin;
            if (this.y > canvas.height) { this.y = -this.size; this.x = Math.random() * canvas.width; }
        };

        Petalo.prototype.draw = function() {
            ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
            ctx.beginPath(); ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size/2, -this.size/2, this.size/2, -this.size/2, 0, 0);
            ctx.fillStyle = this.color; ctx.fill(); ctx.restore();
        };

        for (let i = 0; i < 30; i++) petalos.push(new Petalo());
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petalos.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();
    }

   // --- EFECTO DE ESCRITURA (TYPEWRITER) ---
    // Se mantiene intacto como lo tenías, funcionando con su propio observer
    function setupTypewriter(id) {
        const el = document.getElementById(id);
        if (!el) return;
        
        // Guardamos el contenido original antes de limpiar
        const textoOriginal = el.innerHTML;
        const textoPlano = textoOriginal.replace().replace(/<[^>]*>/g, '');
        
        // Reservamos el espacio para que no haya saltos visuales
        el.style.minHeight = el.offsetHeight + 'px';
        el.innerHTML = '';
        
        let i = 0;
        const escribir = () => {
            if (i < textoPlano.length) {
                el.innerHTML += textoPlano.charAt(i) === '\n' ? '<br>' : textoPlano.charAt(i);
                i++; 
                setTimeout(escribir, 40);
            }
        };

        const typewriterObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { 
                escribir(); 
                typewriterObserver.unobserve(el); // Solo escribe una vez
            }
        }, { threshold: 0.3 });
        
        typewriterObserver.observe(el);
    }    
    setupTypewriter('hero-frase');