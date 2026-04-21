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
      ctx.fillStyle = `rgba(201,168,76,${p.alpha})`
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
  const target = new Date('2025-07-25T16:00:00') // Sábado 25 Julio, Misa 4pm

  const elDays  = document.getElementById('cd-days')
  const elHours = document.getElementById('cd-hours')
  const elMins  = document.getElementById('cd-mins')
  const elSecs  = document.getElementById('cd-secs')

  if (!elDays) return

  function pad (n) { return String(n).padStart(2, '0') }

  function tick () {
    const diff = target - Date.now()

    if (diff <= 0) {
      elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent = '00'
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
