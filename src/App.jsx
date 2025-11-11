import React, { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import {
  Github,
  Linkedin,
  SunMedium,
  Moon,
  Code2,
  Leaf,
  Database,
  Cloud,
  Box,
  Workflow,
  Atom,
  GitBranch,
  Mail,
  Download,
  Quote,
} from 'lucide-react'

const phrases = [
  'Engineering backend systems that scale effortlessly',
  'Building clean APIs with purpose and precision',
  'Turning ideas into resilient cloud-native solutions',
  'Automating the boring, architecting the essential',
]

function useTypingCycle(items, options = {}) {
  const { typeSpeed = 50, deleteSpeed = 30, holdTime = 1400 } = options
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | holding | deleting
  const frame = useRef(null)

  useEffect(() => {
    const current = items[index % items.length]

    if (phase === 'typing') {
      if (display.length < current.length) {
        frame.current = setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1))
        }, typeSpeed)
      } else {
        setPhase('holding')
      }
    }

    if (phase === 'holding') {
      frame.current = setTimeout(() => setPhase('deleting'), holdTime)
    }

    if (phase === 'deleting') {
      if (display.length > 0) {
        frame.current = setTimeout(() => {
          setDisplay(display.slice(0, -1))
        }, deleteSpeed)
      } else {
        setPhase('typing')
        setIndex((i) => (i + 1) % items.length)
      }
    }

    return () => frame.current && clearTimeout(frame.current)
  }, [items, index, phase, display, typeSpeed, deleteSpeed, holdTime])

  return display
}

function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : 'light'
  )

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme]
}

const Nav = ({ active, onToggleTheme, theme }) => {
  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Tech' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certs', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 bg-white/70 dark:bg-gray-900/70 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="font-semibold tracking-tight text-gray-900 dark:text-white text-lg">Alankar Jamle</a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link ${
                active === l.id ? 'nav-active' : ''
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://github.com/" aria-label="GitHub" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
            <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
            <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </a>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="relative inline-flex h-9 w-16 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <span
              className={`absolute left-1 top-1 h-7 w-7 rounded-full bg-white dark:bg-gray-900 shadow transition-all duration-300 ${
                theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
              }`}
              style={{ boxShadow: theme === 'dark' ? '0 0 0 2px var(--teal) inset, 0 4px 12px rgba(0,0,0,.3)' : '0 0 0 2px var(--coral) inset, 0 4px 12px rgba(0,0,0,.15)' }}
            />
            <SunMedium className={`h-4 w-4 absolute left-3 ${theme === 'dark' ? 'opacity-0 scale-75' : 'opacity-100'} transition-all`} />
            <Moon className={`h-4 w-4 absolute right-3 ${theme === 'dark' ? 'opacity-100' : 'opacity-0 scale-75'} transition-all`} />
          </button>
        </div>
      </div>
    </header>
  )
}

const QuoteCard = ({ text, author }) => (
  <figure className="relative p-6 card">
    <Quote className="absolute -top-3 -left-3 h-6 w-6 text-teal-400" />
    <blockquote className="text-gray-700 dark:text-gray-200">{text}</blockquote>
    <figcaption className="mt-3 text-sm text-gray-500 dark:text-gray-400">— {author}</figcaption>
  </figure>
)

const Badge = ({ icon: Icon, label }) => (
  <div className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ring-2 ring-teal-400/30 blur-[2px]" />
    <Icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
  </div>
)

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {title && (
        <h2 className="title">
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
)

export default function App() {
  const [theme, setTheme] = useTheme()
  const typed = useTypingCycle(phrases, { typeSpeed: 40, deleteSpeed: 24, holdTime: 1400 })
  const [active, setActive] = useState('hero')
  const sections = useMemo(() => ['hero', 'about', 'stack', 'skills', 'experience', 'certs', 'contact'], [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <Nav active={active} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

      {/* Hero */}
      <section id="hero" className="relative pt-24 pb-16 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-10 h-48 w-48 rounded-full bg-teal-300/30 blur-3xl" />
          <div className="absolute top-32 right-10 h-40 w-40 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(255, 112, 88, 0.3)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="eyebrow">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" /> Open to backend & cloud roles
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Hi, I’m Alankar Jamle
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #00C8A0, #FF7058)' }}>Software Engineer</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700/90 dark:text-gray-300">
              {typed}
              <span className="border-r-2 border-gray-800 dark:border-gray-100 ml-1 animate-pulse" />
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
              <a href="#" className="btn-ghost">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <QuoteCard text="Any fool can write code that a computer can understand. Good programmers write code that humans can understand." author="Martin Fowler" />
              <QuoteCard text="Code is like humor. When you have to explain it, it's bad." author="Cory House" />
              <QuoteCard text="The function of good software is to make the complex appear to be simple." author="Grady Booch" />
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
            <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About Me">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          <div className="relative w-48 h-56 md:w-64 md:h-72 mx-auto">
            <div className="absolute inset-0 rotate-3 rounded-xl" style={{ backgroundImage: 'linear-gradient(135deg, #00C8A0, #FF7058)' }} />
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 dark:ring-white/10">
              <div className="w-full h-full bg-black clip-hexagon" />
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Backend-focused engineer with 2.5 years of experience designing robust APIs, crafting microservices, and deploying to cloud environments.
            </p>
            <p>
              I enjoy transforming complex requirements into elegant systems with thoughtful abstractions, observability, and automation.
            </p>
            <div className="p-4 soft rounded-lg">
              <p className="text-sm italic">
                "I believe software should be like a well-written sentence — clear, purposeful, and readable. I aim to build systems that don’t just work but evolve gracefully."
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section id="stack" title="Tech Stack">
        <div className="flex flex-wrap gap-3">
          <Badge icon={Code2} label="Java" />
          <Badge icon={Leaf} label="Spring Boot" />
          <Badge icon={Database} label="PostgreSQL" />
          <Badge icon={Cloud} label="AWS" />
          <Badge icon={Box} label="Docker" />
          <Badge icon={Workflow} label="Jenkins" />
          <Badge icon={Atom} label="React" />
          <Badge icon={GitBranch} label="Git" />
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Microservices & REST API design',
            'Cloud deployments (AWS ECS/EKS, Lambda)',
            'CI/CD pipelines & Infrastructure as Code',
            'SQL/NoSQL data modeling and tuning',
            'Observability (logs, metrics, traces)',
            'Containerization & orchestration',
          ].map((s) => (
            <div key={s} className="p-4 soft rounded-lg hover:border-teal-300 transition">
              <span className="text-sm text-gray-800 dark:text-gray-200">{s}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="space-y-6">
          <div className="relative p-6 card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Software Engineer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Backend · Cloud · APIs</p>
              </div>
              <span className="chip">2022 — Present</span>
            </div>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Designed and shipped scalable REST services with Java + Spring Boot.</li>
              <li>Implemented CI/CD with Jenkins and Git, reducing release friction.</li>
              <li>Deployed containerized workloads to AWS with robust monitoring.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certs" title="Certifications">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'AWS Certified Cloud Practitioner (in progress)',
            'Oracle Certified Java Programmer (OCJP)',
            'Docker Essentials & Kubernetes Basics',
          ].map((c) => (
            <div key={c} className="p-4 card">
              <span className="text-sm">{c}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects (commented out for later enable) */}
      {false && (
        <Section id="projects" title="Projects">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* project cards go here */}
          </div>
        </Section>
      )}
      {/* 
<section id="projects">
  <h2>Projects</h2>
  <!-- project cards go here -->
</section>
*/}

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Let’s build something reliable.</h3>
            <p className="text-gray-600 dark:text-gray-300">Have an opportunity or idea? I’m all ears.</p>
            <div className="flex gap-3 pt-2">
              <a href="https://github.com/" className="btn bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/" className="btn-ghost">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-10 border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Crafted with logic and caffeine ☕</p>
          <div className="flex items-center gap-3">
            <a href="#hero" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-300">Back to top</a>
            <a href="https://github.com/" aria-label="GitHub"><Github className="h-5 w-5 text-gray-700 dark:text-gray-300" /></a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('sent')
  }

  return (
    <form onSubmit={onSubmit} className="p-6 card space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300" htmlFor="name">Name</label>
          <input id="name" required placeholder="Your name" className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400 transition" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
          <input id="email" type="email" required placeholder="you@example.com" className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400 transition" />
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300" htmlFor="message">Message</label>
        <textarea id="message" required rows={5} placeholder="Tell me about your project or role" className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400 transition" />
      </div>
      <button type="submit" disabled={status !== 'idle'} className="btn-primary disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Message'}
      </button>
    </form>
  )
}
