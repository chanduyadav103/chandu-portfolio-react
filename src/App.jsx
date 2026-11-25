import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

const services = [
  ['01', 'Frontend Development', 'I turn ideas into polished, interactive, and responsive web interfaces using clean code and modern frontend tools.', ['HTML5', 'CSS3', 'Javascript (ES6+)', 'React', 'Git & GitHub']],
  ['02', 'UI/UX & Frontend', 'Design is more than looks — I design and build clean, responsive interfaces with accessibility and performance in mind.', ['Figma', 'Adobe XD', 'Bootstrap', 'Responsive Design']],
  ['03', 'Optimization', 'Performance, scalability, and maintainability — I focus on making apps fast and reliable at scale.', ['Lighthouse', 'PSI']],
]

const projects = [
  ['01', 'TodoTasks', 'Friendly, simple, easy to remember — 2025', '/images/WhatsApp Video to-do.mp4'],
  ['02', 'Nexcent connect', 'Service Management Website — 2025', '/images/green web.mp4'],
  ['03', 'Designer Space', 'Interior Design website — 2025', '/images/interior new design.mp4'],
]

const skills = ['HTML5', 'CSS3', 'JAVASCRIPT', 'React.js', 'TypeScript', 'TailwindCSS', 'MySQL', 'Git & GitHub', 'REST APIs', 'Figma']

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function validateName(value) {
  if (!value.trim()) return 'Name is required'
  if (value.trim().length > 100) return 'Name must be less than 100 characters'
  return ''
}

function validateEmail(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Invalid email address'
  if (trimmed.length > 255) return 'Email must be less than 255 characters'
  return ''
}

function validateMessage(value) {
  if (!value.trim()) return 'Message is required'
  if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
  return ''
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(`${new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
      })}, IST`)
    }
    updateTime()
    const timer = window.setInterval(updateTime, 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('image-hidden')
          entry.target.classList.add('animate-image-reveal')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.observe-fade').forEach((element) => fadeObserver.observe(element))
    document.querySelectorAll('.hero-image, .project-media').forEach((element) => imageObserver.observe(element))
    document.body.classList.add('loaded')

    return () => {
      fadeObserver.disconnect()
      imageObserver.disconnect()
    }
  }, [])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validateField = (event) => {
    const { name, value } = event.target
    const validators = { name: validateName, email: validateEmail, message: validateMessage }
    setErrors((current) => ({ ...current, [name]: validators[name](value) }))
  }

  const submitForm = async (event) => {
    event.preventDefault()
    const nextErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      message: validateMessage(form.message),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setSending(true)
    try {
      await emailjs.send(
        'service_7n70gn7',
        'template_uqhimpu',
        { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() },
        'ZFHO95qXF7LMsiH80',
      )
      setForm({ name: '', email: '', message: '' })
      setErrors({})
      setToast('Message sent successfully!')
    } catch (error) {
      console.error('EmailJS Error:', error)
      setToast('Error sending message. Try again.')
    } finally {
      setSending(false)
      window.setTimeout(() => setToast(''), 3000)
    }
  }

  return (
    <>
      <nav id="main-nav" className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <div className="brand">P C</div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('services')}>Services</button>
            <button onClick={() => scrollToSection('works')}>Works</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button className="btn-contact" onClick={() => scrollToSection('contact')}>CONTACT ↗</button>
          </div>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="container hero-grid">
          <div className="hero-left animate-fade-up">
            <h1 className="hero-title">P CHANDU</h1>
            <p className="hero-description">Open to job opportunities worldwide. Passionate about building polished, intuitive, and thoughtful digital experiences that leave a mark.</p>
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>CONTACT ↗</button>
            <p className="availability-label">AVAILABLE FOR WORK</p>
            <p className="availability-date">JUN&apos;25</p>
          </div>
          <div className="hero-right animate-fade-in">
            <div className="hero-image image-hidden">
              <img src="/images/WhatsApp Image 2025-10-30 at 23.41.30_3413be52.jpg" alt="Chandu P at work" />
            </div>
          </div>
        </div>
        <div className="scroll-indicator"><button onClick={() => scrollToSection('services')} aria-label="Scroll to services">▼</button></div>
      </section>

      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-header observe-fade">
            <h2>WHAT I DO /</h2>
            <p className="section-subtitle">(SERVICES)</p>
            <p className="section-description">I specialize in building responsive web applications that are fast, reliable, and user-friendly. With a solid foundation in frontend technologies, I help bring ideas to life.</p>
          </div>
          <div className="services-grid">
            {services.map(([number, title, description, tags]) => (
              <article className="service observe-fade" key={number}>
                <div className="service-number">{number}</div>
                <div className="service-content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="section">
        <div className="container">
          <div className="section-header observe-fade">
            <h2>SELECTED WORKS /</h2>
            <p className="section-subtitle">(PROJECTS)</p>
            <p className="section-description">Beautiful, functional spaces built with thoughtful design and modern aesthetics, crafted to deliver a seamless user experience and created to inspire every visitor.</p>
          </div>
          <div className="projects">
            {projects.map(([number, title, subtitle, video]) => (
              <div className="project" key={number}>
                {number === '02' && (
                  <div className="project-info">
                    <div className="project-number">{number}</div>
                    <h3 className="project-title">{title}</h3>
                    <p className="project-subtitle">{subtitle}</p>
                    <div className="tags"><span>DEVELOPMENT</span><span>2025</span></div>
                  </div>
                )}
                {number !== '02' && (
                  <div className="project-media image-hidden">
                    <video src={video} controls autoPlay muted loop aria-label={`${title} project preview`} />
                  </div>
                )}
                {number === '02' ? (
                  <div className="project-media image-hidden">
                    <video src={video} controls autoPlay muted loop aria-label={`${title} project preview`} />
                  </div>
                ) : (
                  <div className="project-info">
                    <div className="project-number">{number}</div>
                    <h3 className="project-title">{title}</h3>
                    <p className="project-subtitle">{subtitle}</p>
                    <div className="tags"><span>DEVELOPMENT</span><span>2025</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section section-alt">
        <div className="container about-grid">
          <div className="about-left observe-fade">
            <h2 className="section-title">DEVELOPER<br />DESIGNER<br />CREATOR /</h2>
            <div className="about-text">
              <p>I&apos;m a developer with a knack for turning ideas into polished, purposeful, and user-friendly digital experiences.</p>
              <p>Whether it&apos;s building from scratch or refining what already exists, I bring curiosity, a solid technical foundation, and a collaborative mindset to every project.</p>
              <p>Beyond coding, I thrive in collaborative environments and enjoy tackling challenges with creative solutions. I aim to contribute to impactful projects that make a difference in users&apos; lives.</p>
            </div>
          </div>
          <div className="about-right observe-fade">
            <h3>Skills</h3>
            <div className="skills-grid">{skills.map((skill) => <div className="skill" key={skill}>{skill}</div>)}</div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="contact-form-wrapper observe-fade">
            <div className="contact-form-card">
              <h2 className="contact-main-title">MAKE IT HAPPEN</h2>
              <div className="form-container">
                <h3 className="form-title">Say Hello</h3>
                <form id="contactForm" className="contact-form" onSubmit={submitForm}>
                  <div className="form-group">
                    <input name="name" value={form.name} onChange={updateField} onBlur={validateField} type="text" placeholder="Drop a name" required maxLength={100} className={errors.name ? 'error' : form.name ? 'success' : ''} />
                    {errors.name && <span className="error-message show">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <input name="email" value={form.email} onChange={updateField} onBlur={validateField} type="email" placeholder="Wanna hear back? Add" required maxLength={255} className={errors.email ? 'error' : form.email ? 'success' : ''} />
                    {errors.email && <span className="error-message show">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <textarea name="message" value={form.message} onChange={updateField} onBlur={validateField} placeholder="Say hello or drop a note..." maxLength={1000} className={errors.message ? 'error' : form.message ? 'success' : ''} />
                    {errors.message && <span className="error-message show">{errors.message}</span>}
                  </div>
                  <button type="submit" className={`submit-btn${sending ? ' loading' : ''}`} disabled={sending}>
                    {sending ? <><span className="spinner" /> Sending...</> : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <footer className="footer-section">
            <div className="footer-grid observe-fade">
              <div className="footer-column">
                <h3 className="footer-heading">Menu</h3>
                <nav className="footer-nav">
                  <button onClick={() => scrollToSection('hero')}>Home</button>
                  <button onClick={() => scrollToSection('services')}>Services</button>
                  <button onClick={() => scrollToSection('works')}>Works</button>
                  <button onClick={() => scrollToSection('about')}>About</button>
                  <button onClick={() => scrollToSection('contact')}>Contact</button>
                </nav>
              </div>
              <div className="footer-column">
                <h3 className="footer-heading">Socials</h3>
                <nav className="footer-nav">
                  <a href="https://www.linkedin.com/in/chandu-p-813b6329b/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                  <a href="https://github.com/chanduyadav103" target="_blank" rel="noopener noreferrer">Github</a>
                </nav>
              </div>
            </div>
            <div className="local-time observe-fade">
              <p className="time-label">LOCAL TIME</p>
              <p className="time-display">{localTime}</p>
+            </div>
            <div className="footer-bottom"><p><strong>pchandu.com</strong> — © 2025 All rights reserved.</p></div>
          </footer>
        </div>
      </section>

      {toast && <div className="toast show">{toast}</div>}
    </>
  )
}
