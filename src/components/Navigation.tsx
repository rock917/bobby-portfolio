import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../data/content";

const items = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Credentials",
  "Contact",
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const button = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    const mq = matchMedia("(min-width:1000px)");
    const resize = () => {
      if (mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", key);
    mq.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", key);
      mq.removeEventListener("change", resize);
    };
  }, [open]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const update = () => {
      let current = "home";
      for (const name of items) {
        const el = document.getElementById(name.toLowerCase());
        if (el && el.getBoundingClientRect().top <= 180) current = el.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [location.pathname]);

  const handleNavClick = (
    _e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    setOpen(false);
    const targetId = item.toLowerCase();

    if (location.pathname === "/") {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-shell">
          <nav
            id="navigation"
            className={open ? "nav-links open" : "nav-links"}
            aria-label="Main navigation"
          >
            {items.map((item) => (
              <Link
                key={item}
                to={`/#${item.toLowerCase()}`}
                aria-current={
                  location.pathname === "/" && active === item.toLowerCase()
                    ? "location"
                    : undefined
                }
                onClick={(e) => handleNavClick(e, item)}
              >
                {item}
              </Link>
            ))}
            <a
              className="mobile-resume"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume <ArrowUpRight size={14} />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </nav>
          <a
            className="nav-resume button"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume <ArrowUpRight size={15} />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <button
            ref={button}
            className="menu-button button"
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}{" "}
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
    </>
  );
}
