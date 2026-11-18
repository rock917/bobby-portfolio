import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/content";
import { interstellarAudio } from "../utils/interstellarAudio";
import BioModal from "./BioModal";

const Earth3D = lazy(() => import("./Earth3D"));

class EarthBoundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? this.props.children : this.props.children;
  }
}

function EarthFallback({ onOpenBio }: { onOpenBio: () => void }) {
  return (
    <div className="earth-fallback-shell">
      <button
        type="button"
        className="earth-fallback-btn"
        onClick={() => {
          onOpenBio();
        }}
        aria-label="Click Earth to view Bobby Ahirwar intro profile"
      >
        <img
          src="/images/earth-square.webp"
          alt="3D Earth Orbital Station"
          className="earth-fallback-img"
          width="380"
          height="380"
          loading="eager"
        />
        <div className="earth-hud-beacon static">
          <div className="hud-beacon-pulse" />
          <div className="hud-beacon-copy">
            <span className="hud-kicker">
              <span className="live-dot" />
              IIT HYDERABAD // ORBIT ACTIVE
            </span>
            <strong>Click Earth for Intro</strong>
            <small>Click to view profile</small>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [eligible, setEligible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    return interstellarAudio.subscribe(setIsAudioPlaying);
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  const onFail = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setEligible(!!gl);
    } catch {
      setEligible(false);
    }
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (ref.current) obs.observe(ref.current);
    const change = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", change);
    };
  }, []);

  const show3d = eligible && !reduced && !failed;

  const handleOpenBio = () => {
    setIsBioOpen(true);
  };

  return (
    <>
      <section
        id="home"
        ref={ref}
        className={`hero ${show3d && ready ? "has-earth-3d" : ""}`}
        aria-label="Introduction"
      >
        {/* Background Atmosphere */}
        <div className="cyber-ambient" aria-hidden="true" />
        <div className="nebula" aria-hidden="true" />

        <div className="hero-grid-container">
          {/* Left Column: Hero Introduction */}
          <div className="hero-copy">
            <p className="identity">
              <span /> BOBBY AHIRWAR <b>/</b> FRONTEND &amp; FULL-STACK DEVELOPER
            </p>

            <h1 tabIndex={-1}>
              BUILDING
              <br />
              INTELLIGENT <em>SYSTEMS</em>
              <br />
              FOR THE REAL WORLD.
            </h1>

            <p className="intro">
              Hi, I’m Bobby, a final-year undergraduate student at IIT Hyderabad
              crafting responsive frontend web applications, interactive 3D interfaces,
              and intelligent full-stack AI/ML systems.
            </p>

            <div className="actions">
              <Link to="/#projects" className="button primary">
                Explore Projects <ArrowUpRight size={18} />
              </Link>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="button secondary-glass"
              >
                View Resume <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="hero-links-row">
              <Link className="text-link hero-contact" to="/#contact">
                Let’s connect <ArrowUpRight size={16} />
              </Link>
              <button
                type="button"
                className="hero-open-bio-pill"
                onClick={() => {
                  handleOpenBio();
                }}
              >
                <span>◈ Open Observatory Profile</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Earth Globe Stage */}
          <div
            className="hero-earth-stage"
            aria-label="3D Interactive Earth Globe"
          >
            {show3d ? (
              <EarthBoundary onFail={onFail}>
                <Suspense fallback={<EarthFallback onOpenBio={handleOpenBio} />}>
                  <Earth3D
                    running={visible && tabVisible && !paused}
                    onReady={onReady}
                    onFail={onFail}
                    onOpenBio={handleOpenBio}
                  />
                </Suspense>
              </EarthBoundary>
            ) : (
              <EarthFallback onOpenBio={handleOpenBio} />
            )}
          </div>
        </div>

        {/* Hero Bottom Bar with Audio & Controls */}
        <div className="hero-bottom">
          <Link to="/#about">SCROLL TO EXPLORE ↓</Link>

          <div className="hero-bottom-actions">
            {/* Interstellar Soundtrack Control */}
            <button
              type="button"
              className={`hero-audio-btn ${isAudioPlaying ? "is-playing" : ""}`}
              onClick={() => interstellarAudio.toggle()}
              aria-label={
                isAudioPlaying
                  ? "Pause Interstellar soundtrack"
                  : "Play Interstellar soundtrack"
              }
            >
              {isAudioPlaying ? (
                <Volume2 size={15} className="audio-icon-pulse" />
              ) : (
                <VolumeX size={15} />
              )}
              <span className="audio-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>
                {isAudioPlaying
                  ? "INTERSTELLAR ♫ PLAYING"
                  : "PLAY INTERSTELLAR THEME ♫"}
              </span>
            </button>

            {show3d && ready && (
              <button
                type="button"
                className="hero-rotation-toggle"
                onClick={() => setPaused(!paused)}
                aria-label={
                  paused ? "Resume Earth rotation" : "Pause Earth rotation"
                }
              >
                {paused ? <Play size={13} /> : <Pause size={13} />}
                <span>{paused ? "Resume Earth" : "Pause Earth"}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Biographical Info Modal */}
      <BioModal isOpen={isBioOpen} onClose={() => setIsBioOpen(false)} />
    </>
  );
}
