import { useEffect, useState } from "react";
import {
  X,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  Mail,
  Play,
  Pause,
  CodeXml as Github,
  UsersRound as Linkedin,
  Compass,
} from "lucide-react";
import { interstellarAudio } from "../utils/interstellarAudio";
import { profile } from "../data/content";

export default function BioModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return interstellarAudio.subscribe(setIsPlaying);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="bio-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bio-modal-title"
    >
      <div
        className="bio-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Holographic Frame Corner Brackets */}
        <div className="corner-bracket top-left" aria-hidden="true" />
        <div className="corner-bracket top-right" aria-hidden="true" />
        <div className="corner-bracket bottom-left" aria-hidden="true" />
        <div className="corner-bracket bottom-right" aria-hidden="true" />

        {/* Modal Header */}
        <div className="bio-modal-header">
          <div className="bio-telemetry-badge">
            <span className="live-dot" />
            <span>OBSERVATORY TELEMETRY // PERSONNEL PROFILE</span>
          </div>
          <button
            type="button"
            className="bio-modal-close"
            onClick={onClose}
            aria-label="Close intro profile"
          >
            <X size={20} />
          </button>
        </div>

        {/* Audio Player Strip: Interstellar Theme */}
        <div className="bio-audio-bar">
          <div className="bio-audio-info">
            <div className={`audio-equalizer ${isPlaying ? "active" : ""}`}>
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
              <span className="bar bar-4" />
            </div>
            <div>
              <span className="audio-label">ORBITAL SOUNDTRACK</span>
              <strong>Hans Zimmer — Interstellar Theme</strong>
              <small>Cornfield Chase (Cathedral Organ Synthesis)</small>
            </div>
          </div>
          <button
            type="button"
            className="button secondary-glass bio-audio-toggle"
            onClick={() => interstellarAudio.toggle()}
            aria-label={isPlaying ? "Pause Interstellar theme" : "Play Interstellar theme"}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? "Pause Music" : "Play Music"}</span>
          </button>
        </div>

        {/* Bio Content Body */}
        <div className="bio-modal-body">
          {/* Main Identity Banner */}
          <div className="bio-profile-hero">
            <div className="bio-avatar-ring">
              <span className="bio-avatar-letter">B</span>
              <div className="bio-avatar-orbit" />
            </div>
            <div className="bio-profile-text">
              <div className="bio-college-tag">
                <GraduationCap size={15} />
                <span>FINAL-YEAR UNDERGRADUATE STUDENT · IIT HYDERABAD</span>
              </div>
              <h2 id="bio-modal-title">Bobby Ahirwar</h2>
              <p className="bio-role">
                Final-Year Undergraduate Student · Frontend &amp; Full-Stack Engineer · AI/ML
              </p>
              <p className="bio-institution">
                Indian Institute of Technology Hyderabad · B.Tech in Chemical Engineering (Class of 2027)
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="bio-stats-grid">
            <div className="bio-stat-box">
              <span className="stat-label">ACADEMIC STANDING</span>
              <strong>Final-Year Undergraduate Student</strong>
              <p>IIT Hyderabad · Chemical Engineering (2023 – 2027)</p>
            </div>
            <div className="bio-stat-box">
              <span className="stat-label">FRONTEND &amp; WEB UI</span>
              <strong>React, Next.js &amp; TypeScript</strong>
              <p>Tailwind CSS, Three.js, responsive SPAs &amp; state management</p>
            </div>
            <div className="bio-stat-box">
              <span className="stat-label">AI &amp; FULL-STACK</span>
              <strong>Generative AI &amp; Cloud</strong>
              <p>PyTorch, FastAPI, RAG, Supabase, Docker &amp; Azure</p>
            </div>
          </div>

          {/* Featured Intelligent Systems */}
          <div className="bio-section">
            <h3 className="bio-section-title">
              <Compass size={17} />
              <span>DEPLOYED MISSIONS</span>
            </h3>
            <div className="bio-projects-list">
              <div className="bio-project-item">
                <div className="proj-dot" />
                <div>
                  <strong>CodeLens AI</strong>
                  <p>AST semantic code chunking, multi-repo indexing &amp; intelligent QA.</p>
                </div>
              </div>
              <div className="bio-project-item">
                <div className="proj-dot" />
                <div>
                  <strong>DocuMind AI</strong>
                  <p>Legal contract understanding using Legal-BERT and precision clause RAG.</p>
                </div>
              </div>
              <div className="bio-project-item">
                <div className="proj-dot" />
                <div>
                  <strong>Ledgerly</strong>
                  <p>Autonomous multi-agent financial invoice extraction with deterministic PO matching.</p>
                </div>
              </div>
              <div className="bio-project-item">
                <div className="proj-dot" />
                <div>
                  <strong>FeedbackIQ</strong>
                  <p>DistilBERT fine-tuned customer sentiment pipeline with 95.01% test accuracy.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience & Leadership */}
          <div className="bio-section">
            <h3 className="bio-section-title">
              <Sparkles size={17} />
              <span>EXPERIENCE &amp; CAMPUS LEADERSHIP</span>
            </h3>
            <div className="bio-experience-box">
              <div className="exp-row">
                <div>
                  <strong>Software Trainee Intern · 360 Technology LLC</strong>
                  <p>
                    Engineered backend services &amp; asynchronous workflows for an AI podcast outreach platform with 6 autonomous agents.
                  </p>
                </div>
                <span className="exp-date">JUN — JUL 2026</span>
              </div>
              <div className="exp-row">
                <div>
                  <strong>Operations Coordinator · International Relations Cell</strong>
                  <p>
                    Coordinated international delegate visits, seminars, and collaborative events at IIT Hyderabad.
                  </p>
                </div>
                <span className="exp-date">2024 — 2025</span>
              </div>
            </div>
          </div>

          {/* Actions & Links */}
          <div className="bio-modal-actions">
            <a
              href="/#projects"
              className="button primary"
              onClick={onClose}
            >
              Explore All Projects <ArrowUpRight size={17} />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="button secondary-glass"
            >
              View Resume <ArrowUpRight size={16} />
            </a>
            <div className="bio-social-links">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="button secondary-glass"
                aria-label="GitHub profile"
              >
                <Github size={17} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="button secondary-glass"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="button secondary-glass"
                aria-label="Email Bobby"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
