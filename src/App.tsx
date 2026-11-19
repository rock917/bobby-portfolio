import { lazy, Suspense, useLayoutEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Code2,
  FileSearch,
  Orbit,
  AudioLines,
  CodeXml as Github,
  UsersRound as Linkedin,
  Mail,
  FileText,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  GraduationCap,
  Briefcase,
  Layers,
  ShieldCheck,
} from "lucide-react";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import HoloCard3D from "./components/HoloCard3D";
import { TechIcon } from "./components/TechIcon";
const CyberBackground3D = lazy(() => import("./components/CyberBackground3D"));
import { credentials, profile, projects, skills } from "./data/content";
import type { Project } from "./data/content";
import imageDimensions from "./data/image-dimensions.json";

const icons = [Code2, FileSearch, Orbit, AudioLines];

const projectStatusBadges: Record<string, string> = {
  "codelens-ai": "RAG // AST SEMANTIC CHUNKING",
  "documind-ai": "LEGAL-BERT // CUAD BENCHMARK",
  ledgerly: "AI AGENT // DETERMINISTIC PO RULES",
  feedbackiq: "DISTILBERT // 95.01% TEST ACCURACY",
};

function External({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>
          <span className="tag-node" aria-hidden="true">#</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className="section"
      initial={false}
      whileInView={reduced ? {} : { opacity: [0.85, 1], y: [12, 0] }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.4 }}
    >
      <div className="section-heading">
        <p className="eyebrow cyber-kicker">
          <span className="kicker-light" />
          {kicker}
        </p>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function Media({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const dimensions = imageDimensions[src as keyof typeof imageDimensions];
  return failedSource === src ? (
    <div className={`media-fallback ${className}`}>
      <FileText size={36} />
      <p>Explore the project details below.</p>
    </div>
  ) : (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={dimensions?.width}
      height={dimensions?.height}
      onError={() => setFailedSource(src)}
    />
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const badge = projectStatusBadges[project.slug] || "INTELLIGENT SYSTEM";
  return (
    <HoloCard3D
      id={`card-${project.slug}`}
      className="project-card"
      glowColor={index % 2 === 0 ? "gold" : "amber"}
      maxTilt={6}
    >
      <Link
        to={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="project-image"
      >
        <Media src={project.image} alt="" />
        <span className="image-open" aria-label={`View ${project.name}`}>
          <ArrowUpRight size={18} />
        </span>
        <span className="project-hud-badge">{badge}</span>
      </Link>
      <div className="project-body">
        <p className="eyebrow project-index">
          <span>0{index + 1}</span> // {project.category.toUpperCase()}
        </p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <Tags items={project.stack.slice(0, 5)} />
        <div className="project-actions">
          <Link
            id={`project-link-${project.slug}`}
            className="button primary project-cta"
            to={`/projects/${project.slug}`}
          >
            Explore mission <ArrowUpRight size={16} />
            <span className="sr-only">: {project.name}</span>
          </Link>
          <External href={project.repo} className="button secondary-glass">
            <Github size={16} /> GitHub
          </External>
        </div>
      </div>
    </HoloCard3D>
  );
}

function Home() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <>
      <Hero />
      <div className="container">
        {/* Mission Dock Shortcuts */}
        <div
          className="mission-dock"
          role="navigation"
          aria-label="Featured project shortcuts"
        >
          {projects.map((p, i) => {
            const Icon = icons[i];
            return (
              <Link
                to={`/projects/${p.slug}`}
                key={p.slug}
                className="dock-panel-link"
              >
                <HoloCard3D
                  className="dock-panel"
                  maxTilt={8}
                  glowColor={i % 2 === 0 ? "gold" : "amber"}
                >
                  <span className="dock-index">
                    <span>0{i + 1}</span> // {p.category}
                    <ArrowUpRight size={14} />
                  </span>
                  <span className={`dock-art dock-${i}`} aria-hidden="true">
                    <i />
                    <i />
                    <Icon size={40} strokeWidth={1.2} />
                  </span>
                  <strong>{p.name}</strong>
                  <span className="dock-desc">{p.tagline}</span>
                </HoloCard3D>
              </Link>
            );
          })}
        </div>

        {/* Section 01: System Diagnostic / About */}
        <Section
          id="about"
          kicker="01 // OBSERVATORY DIAGNOSTIC"
          title="Curiosity meets engineering."
        >
          <div className="about-grid">
            <div className="prose">
              <p className="lead">
                An engineering mindset.
                <br />
                <span>A curiosity that goes beyond it.</span>
              </p>
              <p>
                I’m Bobby, a Chemical Engineering undergraduate at IIT
                Hyderabad. I’m drawn to the intersection where intuitive frontend
                design, robust full-stack architecture, and machine learning meet.
              </p>
              <p>
                From building interactive, responsive web applications with React
                and Next.js to training models and deploying production-ready APIs,
                I focus on delivering clean user experiences grounded in solid
                engineering.
              </p>
            </div>

            {/* 3D Telemetry Stats Grid */}
            <div className="telemetry-stats-grid">
              <HoloCard3D className="telemetry-card" glowColor="gold">
                <div className="telemetry-icon">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <span className="telemetry-label">ACADEMIC FOUNDATION</span>
                  <strong>IIT Hyderabad</strong>
                  <p>B.Tech · Chemical Engineering</p>
                </div>
              </HoloCard3D>

              <HoloCard3D className="telemetry-card" glowColor="amber">
                <div className="telemetry-icon">
                  <Sparkles size={22} />
                </div>
                <div>
                  <span className="telemetry-label">FRONTEND &amp; UI/UX</span>
                  <strong>Modern Web Interfaces</strong>
                  <p>React, Next.js, TypeScript, Tailwind CSS, Three.js &amp; Framer Motion</p>
                </div>
              </HoloCard3D>

              <HoloCard3D className="telemetry-card" glowColor="indigo">
                <div className="telemetry-icon">
                  <Layers size={22} />
                </div>
                <div>
                  <span className="telemetry-label">SPECIALIZED DOMAINS</span>
                  <strong>Generative AI &amp; RAG</strong>
                  <p>Deep Learning, Vector Embeddings, Hybrid Retrieval</p>
                </div>
              </HoloCard3D>

              <HoloCard3D className="telemetry-card" glowColor="gold">
                <div className="telemetry-icon">
                  <Code2 size={22} />
                </div>
                <div>
                  <span className="telemetry-label">ENGINEERING STACK</span>
                  <strong>Python &amp; Full-Stack</strong>
                  <p>PyTorch, FastAPI, React, TypeScript, Docker, Azure</p>
                </div>
              </HoloCard3D>
            </div>
          </div>
        </Section>

        {/* Section 02: Neural Constellation / Skills */}
        <Section
          id="skills"
          kicker="02 // CONSTELLATION MATRIX"
          title="Tools behind the work."
        >
          <p className="section-intro">
            A connected toolkit for turning data into models, and models into
            useful products.
          </p>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <HoloCard3D
                key={s.name}
                className="skill"
                glowColor={i % 2 === 0 ? "gold" : "amber"}
                maxTilt={6}
              >
                <div className="skill-header">
                  <span className="skill-node" aria-hidden="true">
                    ◈
                  </span>
                  <span className="skill-number">0{i + 1}</span>
                </div>
                <h3>{s.name}</h3>
                <ul className="skill-tools-list">
                  {s.tools.map((t) => (
                    <li key={t} className="skill-tool-item">
                      <TechIcon name={t} size={18} className="tool-tech-icon" />
                      <span className="tool-tech-name">{t}</span>
                    </li>
                  ))}
                </ul>
              </HoloCard3D>
            ))}
          </div>
        </Section>

        {/* Section 03: Space Missions / Projects */}
        <Section
          id="projects"
          kicker="03 // CELESTIAL MISSIONS"
          title="Ideas, engineered."
        >
          <div className="section-intro intro-row">
            <p>
              Four explorations in intelligent software.
              <br />
              Built around a problem. Grounded in evidence.
            </p>
            <External href={profile.github} className="button secondary-glass">
              All repositories <Github size={16} />
            </External>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Section>

        {/* Section 04: Execution Timeline / Experience */}
        <Section
          id="experience"
          kicker="04 // ORBITAL TIMELINE"
          title="Learning through building."
        >
          <div className="timeline">
            <HoloCard3D className="timeline-item" glowColor="gold">
              <div className="timeline-date">
                JUN — JUL 2026<span>INTERNSHIP</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-header-row">
                  <Briefcase size={20} className="timeline-icon" />
                  <div>
                    <h3>Software Trainee Intern</h3>
                    <p className="organization">360 Technology LLC</p>
                  </div>
                </div>
                <p>
                  Worked on an AI podcast outreach platform with six agents
                  covering RSS ingestion, analysis, opportunity discovery, pitch
                  generation, quality checks, and outreach.
                </p>
                <p>
                  Contributed across backend services, authentication,
                  asynchronous workflows, and a Next.js dashboard, with Claude
                  integration and Gmail OAuth.
                </p>
                <Tags
                  items={[
                    "FastAPI",
                    "PostgreSQL",
                    "Redis · Celery",
                    "Next.js",
                    "Supabase",
                  ]}
                />
              </div>
            </HoloCard3D>

            <HoloCard3D className="timeline-item" glowColor="indigo">
              <div className="timeline-date">
                2024 — 2025<span>LEADERSHIP</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-header-row">
                  <Sparkles size={20} className="timeline-icon" />
                  <div>
                    <h3>Operations Coordinator</h3>
                    <p className="organization">
                      International Relations Cell · IIT Hyderabad
                    </p>
                  </div>
                </div>
                <p>
                  Supported seminars, workshops, cultural exchanges, and
                  international delegate visits, collaborating across teams to
                  bring campus events together.
                </p>
              </div>
            </HoloCard3D>
          </div>
        </Section>

        {/* Section 05: Neural Foundations / Education */}
        <Section
          id="education"
          kicker="05 // CELESTIAL FOUNDATIONS"
          title="Always a student."
        >
          <div className="education-grid">
            <HoloCard3D className="education-card" glowColor="gold" maxTilt={4}>
              <div className="education-header">
                <div>
                  <p className="eyebrow">EXPECTED 2027 // UNDERGRADUATE</p>
                  <h3>Indian Institute of Technology Hyderabad</h3>
                  <p className="degree">B.Tech in Chemical Engineering</p>
                </div>
              </div>
              <p className="education-desc">
                Coursework across programming, AI/ML, computer vision, data
                science, numerical methods, and applied mathematics.
              </p>
            </HoloCard3D>
          </div>
        </Section>

        {/* Section 06: Verified Specializations / Credentials */}
        <Section
          id="credentials"
          kicker="06 // VERIFIED SPECIALIZATIONS"
          title="Certified ML & NLP architectures."
        >
          <p className="section-intro">
            Rigorously evaluated certifications from DeepLearning.AI and Stanford
            University, spanning generative sequence models, probabilistic natural
            language processing, and scalable learning algorithms.
          </p>

          <div className="credentials-grid">
            {credentials.map((cred) => (
              <HoloCard3D
                key={cred.id}
                className="credential-card"
                glowColor={cred.accent}
                maxTilt={6}
              >
                <div className="credential-header">
                  <div className="credential-badge">
                    <ShieldCheck size={14} className="credential-badge-icon" />
                    <span>VERIFIED // {cred.id}</span>
                  </div>
                  <span className="credential-issuer">{cred.issuer}</span>
                </div>

                <h3 className="credential-title">{cred.title}</h3>

                <div className="credential-skills-wrap">
                  <p className="credential-skills-label">
                    CORE COMPETENCIES & ARCHITECTURES:
                  </p>
                  <div className="credential-skills-list">
                    {cred.skills.map((skill) => (
                      <span key={skill} className="credential-skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="credential-footer">
                  <a
                    href={cred.url}
                    target="_blank"
                    rel="noreferrer"
                    className="credential-verify-link"
                    aria-label={`Verify ${cred.title} on Coursera`}
                  >
                    <span>Inspect Credential</span>
                    <span className="credential-pointer-circle">
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                </div>
              </HoloCard3D>
            ))}
          </div>
        </Section>

        {/* Section 07: Flight Log / Resume */}
        <HoloCard3D
          id="resume"
          className="resume-strip"
          glowColor="gold"
          maxTilt={4}
        >
          <div className="resume-scanner-line" aria-hidden="true" />
          <FileText size={42} strokeWidth={1.2} className="resume-icon" />
          <div className="resume-info">
            <p className="eyebrow">THE FLIGHT LOG // DATA STREAM</p>
            <h2 id="resume-title">The story, on one page.</h2>
            <p>Experience, projects, and the foundations behind them.</p>
          </div>
          <div className="actions">
            <External href={profile.resume} className="button primary">
              View Resume
            </External>
          </div>
        </HoloCard3D>

        {/* Section 08: Transmission Portal / Contact */}
        <Section
          id="contact"
          kicker="07 // TRANSMISSION PORTAL"
          title="Let’s build something extraordinary."
        >
          <div className="contact-shell">
            <p className="contact-lead">
              Have an idea, an opportunity, or a problem worth solving?
              <br />
              Open a direct frequency. I’d love to collaborate.
            </p>

            <div className="contact-actions-row">
              <a
                className="button primary contact-cta"
                href={`mailto:${profile.email}`}
              >
                Start a conversation <Mail size={18} />
              </a>

              <button
                type="button"
                className="button secondary-glass copy-email-btn"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? <Check size={16} color="#f59e0b" /> : <Copy size={16} />}
                <span>{copied ? "COPIED TO CLIPBOARD" : profile.email}</span>
              </button>
            </div>

            <div className="socials">
              <External href={profile.linkedin} className="button secondary-glass">
                <Linkedin size={18} /> LinkedIn
              </External>
              <External href={profile.github} className="button secondary-glass">
                <Github size={18} /> GitHub
              </External>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const p = projects.find((item) => item.slug === slug);
  if (!p) return <NotFound />;
  return (
    <article className="case-page container">
      <Link className="text-link back-link" to="/#projects">
        <ArrowLeft size={17} /> Back to missions
      </Link>
      <header className="case-heading">
        <p className="eyebrow cyber-kicker">
          <span className="kicker-light" />
          MISSION // {p.category.toUpperCase()}
        </p>
        <h1 tabIndex={-1}>{p.name}</h1>
        <p className="case-summary">{p.summary}</p>
        <div className="actions">
          <External href={p.repo} className="button primary">
            <Github size={18} /> Source code
          </External>
          {p.demo && (
            <External href={p.demo} className="button secondary-glass">
              Visit live app
            </External>
          )}
          {p.model && (
            <External href={p.model} className="button secondary-glass">
              Explore model
            </External>
          )}
        </div>
        {p.demoNote && <p className="small demo-note">{p.demoNote}</p>}
      </header>

      <HoloCard3D className="case-figure-wrap" glowColor="gold" maxTilt={3}>
        <figure className="case-figure">
          <a
            href={p.image}
            target="_blank"
            rel="noreferrer"
            aria-label={`View larger ${p.name} screenshot in new tab`}
          >
            <Media src={p.image} alt={p.alt} />
          </a>
          <figcaption>
            {p.caption} <ExternalLink size={12} aria-hidden="true" />
          </figcaption>
        </figure>
      </HoloCard3D>

      <div className="case-columns">
        <HoloCard3D className="case-info-card" glowColor="amber">
          <p className="eyebrow">THE PROBLEM</p>
          <h2>Where it started.</h2>
          <p>{p.problem}</p>
        </HoloCard3D>
        <HoloCard3D className="case-info-card" glowColor="gold">
          <p className="eyebrow">THE SOLUTION</p>
          <h2>A more useful workflow.</h2>
          <p>{p.solution}</p>
        </HoloCard3D>
      </div>

      <HoloCard3D className="case-section architecture-wrap" glowColor="indigo">
        <p className="eyebrow">UNDER THE HOOD // PIPELINE</p>
        <h2>From input to insight.</h2>
        <ol className="architecture">
          {p.flow.map((step, i) => (
            <li key={step}>
              <span>0{i + 1}</span>
              <strong>{step}</strong>
              {i < p.flow.length - 1 && (
                <ArrowUpRight size={18} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </HoloCard3D>

      <div className="case-columns">
        <HoloCard3D className="case-info-card" glowColor="amber">
          <h2>What it does.</h2>
          <ul className="feature-list">
            {p.features.map((f) => (
              <li key={f}>
                <span className="list-marker">▹</span> {f}
              </li>
            ))}
          </ul>
        </HoloCard3D>
        <HoloCard3D className="case-info-card" glowColor="gold">
          <h2>Engineering decisions.</h2>
          <ul className="feature-list">
            {p.decisions.map((d) => (
              <li key={d}>
                <span className="list-marker">▹</span> {d}
              </li>
            ))}
          </ul>
        </HoloCard3D>
      </div>

      <HoloCard3D className="result-panel" glowColor="gold">
        <p className="eyebrow">RESULTS &amp; EVIDENCE</p>
        <h2>{p.resultLabel}</h2>
        <p>{p.result}</p>
        <External href={p.evidence} className="button primary">
          Explore the evidence
        </External>
      </HoloCard3D>

      {p.gallery?.map((img) => (
        <HoloCard3D className="case-figure-wrap" glowColor="amber" key={img.src} maxTilt={3}>
          <figure className="case-figure">
            <a
              href={img.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`View larger image: ${img.alt} (new tab)`}
            >
              <Media src={img.src} alt={img.alt} />
            </a>
            <figcaption>{img.alt}</figcaption>
          </figure>
        </HoloCard3D>
      ))}

      <HoloCard3D className="case-section limitations" glowColor="indigo">
        <p className="eyebrow">TRADE-OFFS &amp; BOUNDARIES</p>
        <h2>Knowing the boundaries.</h2>
        <p>{p.limits}</p>
      </HoloCard3D>

      <HoloCard3D className="case-section toolkit-card" glowColor="amber">
        <h2>The toolkit.</h2>
        <Tags items={p.stack} />
      </HoloCard3D>

      <div className="next-mission">
        <p className="eyebrow">KEEP EXPLORING MISSIONS</p>
        <div className="next-mission-grid">
          {projects
            .filter((other) => other.slug !== p.slug)
            .map((other) => (
              <Link key={other.slug} to={`/projects/${other.slug}`}>
                <HoloCard3D className="next-mission-card" glowColor="gold" maxTilt={8}>
                  <span>{other.name}</span>
                  <ArrowUpRight size={18} />
                </HoloCard3D>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}

function NotFound() {
  return (
    <section className="not-found container">
      <p className="eyebrow">404 // OUTSIDE THIS ORBIT</p>
      <h1 tabIndex={-1}>A little off course.</h1>
      <p>This coordinate isn’t part of the constellation. Let’s get you back.</p>
      <Link className="button primary" to="/">
        Return to the universe <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}

function RouteEffects() {
  const location = useLocation();

  useLayoutEffect(() => {
    const project = projects.find(
      (p) => location.pathname === `/projects/${p.slug}`,
    );
    const title =
      location.pathname === "/"
        ? "Bobby Ahirwar — Beyond the Code"
        : project
          ? `${project.name} — Bobby Ahirwar`
          : "Page not found — Bobby Ahirwar";
    document.title = title;
    const desc =
      project?.summary ??
      "Bobby Ahirwar's universe of AI, machine learning, and software projects.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", desc);
    const origin = document
      .querySelector('meta[name="portfolio:origin"]')
      ?.getAttribute("content");
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (origin && (project || location.pathname === "/")) {
      const url = `${origin}${location.pathname}`;
      if (canonical) canonical.href = url;
      else {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = url;
        document.head.append(link);
      }
      ogUrl?.setAttribute("content", url);
    } else {
      canonical?.remove();
      ogUrl?.removeAttribute("content");
    }
    // Smooth scrolling to section hash or top of page
    if (location.pathname === "/" && location.hash) {
      const targetId = location.hash.replace("#", "");
      const scrollToTarget = () => {
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return true;
        }
        let el = document.getElementById(targetId);
        if (!el && targetId.startsWith("card-")) {
          el = document.getElementById("projects");
        }
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const interval = setInterval(() => {
          if (scrollToTarget()) {
            clearInterval(interval);
          }
        }, 40);
        const timeout = setTimeout(() => clearInterval(interval), 1500);
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }
    } else if (location.pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      {/* 3D Cyber Ambient Constellation Background */}
      <Suspense fallback={null}>
        <CyberBackground3D />
      </Suspense>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="container footer">
        <Link className="brand" to="/#home">
          <img src="/favicon.svg" alt="" width="26" height="26" />
          <span className="brand-text">b.orbit</span>
        </Link>
        <div className="footer-status">
          <span className="status-dot pulse-dot" />
          <span>STATUS: ALL SYSTEMS NOMINAL</span>
        </div>
        <p>
          © {new Date().getFullYear()} Bobby Ahirwar{" "}
          <span>Beyond the Code.</span>
        </p>
        <Link className="text-link" to="/#home">
          Back to orbit <ArrowUp size={16} />
        </Link>
      </footer>
    </>
  );
}
