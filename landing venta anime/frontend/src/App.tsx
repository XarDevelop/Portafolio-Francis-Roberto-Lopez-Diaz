import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import './App.css'

// ─── Theme Context ──────────────────────────────────────────────
interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
})

function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext)

// ─── Icons ──────────────────────────────────────────────────────
function SunIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  )
}

function MoonIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function MailIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function ExternalLinkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

// ─── Data ───────────────────────────────────────────────────────
interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Dashboard Financiero',
    description: 'Sistema ERP de gestión de cuentas por cobrar, movimientos bancarios, arqueos de caja y saldos. Interfaz con Material UI y DataGrid custom.',
    tags: ['React', 'TypeScript', 'MUI', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/tuusuario/xilef-finanzas',
    demo: 'https://demo-xilef.vercel.app',
  },
  {
    id: 2,
    title: 'E-commerce Fullstack',
    description: 'Tienda online con carrito persistente, pasarela Stripe, autenticación JWT y panel de administración.',
    tags: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/tuusuario/ecommerce',
    demo: 'https://tienda-demo.vercel.app',
  },
  {
    id: 3,
    title: 'Landing Page Interactiva',
    description: 'Página de producto con animaciones CSS avanzadas, scroll-driven effects y optimización Core Web Vitals.',
    tags: ['Vite', 'TypeScript', 'GSAP', 'CSS Modules'],
    github: 'https://github.com/tuusuario/landing-interactiva',
    demo: 'https://landing-demo.vercel.app',
  },
  {
    id: 4,
    title: 'API REST de Gestión',
    description: 'Backend modular con NestJS, autenticación OAuth2, documentación Swagger y tests unitarios con Jest.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'Jest'],
    github: 'https://github.com/tuusuario/api-gestion',
  },
]

// ─── Components ─────────────────────────────────────────────────
function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        francis.dev
      </div>
      <div className="navbar-links">
        <button className="nav-link" onClick={() => scrollTo('projects')}>proyectos</button>
        <button className="nav-link" onClick={() => scrollTo('about')}>sobre mí</button>
        <button className="nav-link" onClick={() => scrollTo('contact')}>contacto</button>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
          {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          <span>{isDark ? 'claro' : 'oscuro'}</span>
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-photo">
        <img
          src="/tu-foto.jpg"
          alt="Francis - Desarrollador Fullstack"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const fallback = target.nextElementSibling as HTMLElement
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        <div className="photo-fallback" style={{ display: 'none' }}>
          <span>F</span>
        </div>
      </div>
      <div className="hero-content">
        <h1>Hola, soy <span className="accent">Francis</span></h1>
        <p className="hero-subtitle">
          Desarrollador <strong>fullstack</strong> con enfoque en frontend. Construyo productos
          digitales que resuelven problemas reales. Especializado en <strong>React</strong>,{' '}
          <strong>TypeScript</strong> y <strong>Node.js</strong>.
        </p>
        <p className="hero-location">
          📍 La Habana, Cuba · 🌍 Disponible para remoto e internacional
        </p>
        <div className="hero-tags">
          {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js', 'NestJS'].map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">Hablemos</a>
          <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <GithubIcon size={18} /> GitHub
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <LinkedinIcon size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-image">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="project-placeholder">
            <span>{project.title[0]}</span>
          </div>
        )}
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <GithubIcon size={16} /> Código
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLinkIcon size={16} /> Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Proyectos destacados</h2>
      <p className="section-subtitle">Algunas cosas que he construido. Cada una resuelve un problema real.</p>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about-detailed">
      <h2 className="section-title">Sobre mí</h2>
      <div className="about-grid">
        <div className="about-card">
          <h3>💻 Frontend</h3>
          <p>React, Vite, Next.js, TypeScript, Material UI, Tailwind CSS. Me enfoco en experiencias de usuario pulidas y accesibles.</p>
        </div>
        <div className="about-card">
          <h3>⚙️ Backend</h3>
          <p>Node.js, Express, NestJS, PostgreSQL, SQL. APIs RESTful, autenticación, arquitectura limpia.</p>
        </div>
        <div className="about-card">
          <h3>🎨 Diseño & Marketing</h3>
          <p>Conocimientos de UI/UX, diseño web responsive y marketing digital. Entiendo el producto más allá del código.</p>
        </div>
        <div className="about-card">
          <h3>🤖 IA & Prompting</h3>
          <p>Experiencia con prompting de IA para acelerar desarrollo, automatizar flujos y potenciar productos.</p>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-box">
        <h2>¿Trabajamos juntos?</h2>
        <p>Estoy buscando oportunidades <strong>remotas e internacionales</strong>. Si necesitás un desarrollador comprometido, con buena lógica y hambre de crecer, hablemos.</p>
        <div className="contact-actions">
          <a href="mailto:francis@email.com" className="btn btn-primary btn-large">
            <MailIcon size={20} /> Enviar email
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-large">
            <LinkedinIcon size={20} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Francis — Desarrollador Fullstack</p>
      <p className="footer-built">Hecho con React + Vite + ❤️</p>
    </footer>
  )
}

// ─── App ────────────────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <div className="container">
          <Navbar />
          <Hero />
          <Projects />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App