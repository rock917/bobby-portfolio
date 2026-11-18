import type { FC, SVGProps } from "react";

interface TechIconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export const TechIcon: FC<TechIconProps> = ({ name, size = 18, className = "", ...props }) => {
  const norm = name.toLowerCase().trim();

  // Python (Official Blue & Yellow interlocking snakes)
  if (norm.includes("python")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#387EB8"
          d="M63.5 1.5c-15.5 0-25 6.5-25 18v12.5h25.5V36h-36C12.5 36 2 46.5 2 61.5s8.5 24 23 24h6v-14c0-8 6.5-15 15-15h25.5c7.5 0 14-6.5 14-14V20c0-11-8.5-18.5-22-18.5zm-13.5 7.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"
        />
        <path
          fill="#FFE052"
          d="M64.5 126.5c15.5 0 25-6.5 25-18V96H64V92h36c15.5 0 26-10.5 26-25.5s-8.5-24-23-24h-6v14c0 8-6.5 15-15 15H56.5c-7.5 0-14 6.5-14 14v22c0 11 8.5 18.5 22 18.5zm13.5-7.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
        />
      </svg>
    );
  }

  // TypeScript (Blue square TS)
  if (norm.includes("typescript")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <path
          fill="#FFFFFF"
          d="M30 52h34v11H48v44H35V63H30V52zm42 27c0-10 6-16 16-16 8 0 14 3 17 8l-8 7c-2-3-5-4-9-4-3 0-6 2-6 5 0 9 24 5 24 22 0 10-7 16-18 16-9 0-16-4-19-10l8-7c3 4 7 6 11 6 3 0 7-2 7-5 0-10-24-6-24-22z"
        />
      </svg>
    );
  }

  // JavaScript (Yellow square JS)
  if (norm.includes("javascript")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <rect width="128" height="128" rx="16" fill="#F7DF1E" />
        <path
          fill="#000000"
          d="M34 104c4 3 9 5 14 5 8 0 13-4 13-13V53H47v43c0 4-2 6-6 6-3 0-5-1-7-3l-4 5zm41-2c5 3 11 5 18 5 14 0 23-7 23-18 0-10-7-15-17-19-6-3-9-4-9-8 0-3 3-5 7-5 4 0 7 1 10 4l4-7c-4-3-8-4-14-4-13 0-21 7-21 17 0 9 6 14 16 18 6 3 10 5 10 9 0 4-4 6-9 6-5 0-9-2-12-5l-5 6z"
        />
      </svg>
    );
  }

  // C++
  if (norm.includes("c++")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#00599C"
          d="M64 4l52 30v60l-52 30-52-30V34z"
        />
        <path
          fill="#004482"
          d="M64 4v120l52-30V34z"
        />
        <path
          fill="#FFFFFF"
          d="M48 44c-12 0-20 8-20 20s8 20 20 20c8 0 15-4 18-10l-9-5c-2 4-5 6-9 6-6 0-10-4-10-11s4-11 10-11c4 0 7 2 9 6l9-5c-3-6-10-10-18-10zm32 15h5v-5h5v5h5v5h-5v5h-5v-5h-5v-5zm17 0h5v-5h5v5h5v5h-5v5h-5v-5h-5v-5z"
        />
      </svg>
    );
  }

  // C (Programming)
  if (norm === "c") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#A8B9CC"
          d="M64 4l52 30v60l-52 30-52-30V34z"
        />
        <path
          fill="#5C6F84"
          d="M64 4v120l52-30V34z"
        />
        <path
          fill="#FFFFFF"
          d="M64 36c-16 0-28 12-28 28s12 28 28 28c11 0 20-5 25-14l-12-7c-3 5-8 8-13 8-9 0-15-7-15-15s6-15 15-15c5 0 10 3 13 8l12-7c-5-9-14-14-25-14z"
        />
      </svg>
    );
  }

  // PyTorch (Orange flame with dot)
  if (norm.includes("pytorch")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#EE4C2C"
          d="M72 15L64 7l-8 8a34 34 0 1 0 45 45l6-6-6-6a25 25 0 0 1-29-33zM98 25a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
        />
      </svg>
    );
  }

  // TensorFlow
  if (norm.includes("tensorflow")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#FF6F00"
          d="M64 4L14 33v58l22 13V68l28 16V4z"
        />
        <path
          fill="#FFA800"
          d="M64 4l50 29v58l-22 13V68L64 84V4z"
        />
      </svg>
    );
  }

  // scikit-learn
  if (norm.includes("scikit") || norm.includes("sklearn")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#F7931E"
          d="M64 12c-29 0-52 23-52 52s23 52 52 52 52-23 52-52-23-52-52-52zm-8 75c-13 0-23-10-23-23s10-23 23-23 23 10 23 23-10 23-23 23z"
        />
        <circle cx="76" cy="52" r="14" fill="#3499CD" />
      </svg>
    );
  }

  // Hugging Face
  if (norm.includes("hugging face") || norm.includes("huggingface")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="58" fill="#FFD21E" />
        <circle cx="44" cy="54" r="6" fill="#000000" />
        <circle cx="84" cy="54" r="6" fill="#000000" />
        <path
          d="M42 76c6 8 13 12 22 12s16-4 22-12"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          fill="#FFAA00"
          d="M20 74c-4 12 4 22 14 20s14-14 8-22-18-10-22 2zm88 0c4 12-4 22-14 20s-14-14-8-22 18-10 22 2z"
        />
      </svg>
    );
  }

  // FastAPI (Teal lightning circle)
  if (norm.includes("fastapi")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="60" fill="#05998B" />
        <path
          fill="#FFFFFF"
          d="M68 18L34 72h28l-6 38 34-54H62z"
        />
      </svg>
    );
  }

  // Docker (Blue whale with containers)
  if (norm.includes("docker")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <rect x="36" y="44" width="12" height="12" rx="1" fill="#2496ED" />
        <rect x="52" y="44" width="12" height="12" rx="1" fill="#2496ED" />
        <rect x="68" y="44" width="12" height="12" rx="1" fill="#2496ED" />
        <rect x="52" y="30" width="12" height="12" rx="1" fill="#2496ED" />
        <rect x="68" y="30" width="12" height="12" rx="1" fill="#2496ED" />
        <rect x="84" y="44" width="12" height="12" rx="1" fill="#2496ED" />
        <path
          fill="#2496ED"
          d="M124 58c-4-1-12-1-18 4-2-12-12-16-16-16-1 0-2 0-3 1H20c-3 14 2 34 16 46 16 14 42 15 62 7 16-6 26-21 26-42z"
        />
      </svg>
    );
  }

  // React (Cyan atom)
  if (norm.includes("react")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="10" fill="#61DAFB" />
        <ellipse cx="64" cy="64" rx="54" ry="20" fill="none" stroke="#61DAFB" strokeWidth="6" />
        <ellipse cx="64" cy="64" rx="54" ry="20" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 64 64)" />
        <ellipse cx="64" cy="64" rx="54" ry="20" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 64 64)" />
      </svg>
    );
  }

  // Next.js (Black/white N)
  if (norm.includes("next")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="60" fill="#000000" stroke="#FFFFFF" strokeWidth="4" />
        <path
          fill="#FFFFFF"
          d="M48 42h10v44H48zm19 0h10l25 36V42h10v44H98L73 50v36H67z"
        />
      </svg>
    );
  }

  // Tailwind CSS (Teal water waves)
  if (norm.includes("tailwind")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#38BDF8"
          d="M64 36c-17 0-26 8.5-31 17 8.5-4.25 17-2.12 21.25 2.13C57 58 61 62 72 62c17 0 26-8.5 31-17-8.5 4.25-17 2.12-21.25-2.13C79 40 75 36 64 36zm-32 34c-17 0-26 8.5-31 17 8.5-4.25 17-2.12 21.25 2.13C25 92 29 96 40 96c17 0 26-8.5 31-17-8.5 4.25-17 2.12-21.25-2.13C47 74 43 70 32 70z"
        />
      </svg>
    );
  }

  // Three.js (Geometric 3D Triangle)
  if (norm.includes("three")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#FFFFFF"
          d="M64 14L16 98h96L64 14zm0 24l35 60H29l35-60z"
        />
        <polygon points="64,48 44,84 84,84" fill="#38BDF8" />
      </svg>
    );
  }

  // Framer Motion (Blue geometric shapes)
  if (norm.includes("framer") || norm.includes("motion")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path fill="#0055FF" d="M18 16h92v46H64z" />
        <path fill="#0055FF" d="M18 62h46v46H18z" />
        <path fill="#0055FF" d="M64 62l46 46H64z" />
      </svg>
    );
  }

  // State Management / Redux / Zustand
  if (norm.includes("state") || norm.includes("redux") || norm.includes("zustand")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <rect width="128" height="128" rx="24" fill="#764ABC" />
        <path
          fill="#FFFFFF"
          d="M64 36c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28zm0 46a18 18 0 1 1 0-36 18 18 0 0 1 0 36z"
        />
        <circle cx="64" cy="64" r="8" fill="#FFFFFF" />
      </svg>
    );
  }

  // Responsive Design / UI Architecture
  if (
    norm.includes("responsive") ||
    norm.includes("ui") ||
    norm.includes("architecture") ||
    norm.includes("component")
  ) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <rect x="14" y="24" width="76" height="52" rx="6" fill="none" stroke="#38BDF8" strokeWidth="8" />
        <rect x="70" y="52" width="42" height="52" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="8" />
        <line x1="40" y1="76" x2="64" y2="76" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
        <line x1="84" y1="92" x2="98" y2="92" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  // PostgreSQL (Blue elephant)
  if (norm.includes("postgres")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#336791"
          d="M64 8c-30 0-54 22-54 50 0 20 12 37 30 46v16l16-8c3 1 5 1 8 1 30 0 54-22 54-50S94 8 64 8zm24 64c-3 8-11 12-22 12-5 0-9-1-12-3l-4 6c-3-2-5-5-6-8l6-6c-2-3-3-7-3-11 0-13 10-24 23-24s23 11 23 24c0 4-2 7-5 10z"
        />
        <circle cx="60" cy="50" r="4" fill="#FFFFFF" />
      </svg>
    );
  }

  // Supabase (Emerald lightning)
  if (norm.includes("supabase")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#3ECF8E"
          d="M68 6L14 74h46l-6 48 54-68H62z"
        />
      </svg>
    );
  }

  // MySQL (Dolphin)
  if (norm.includes("mysql")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#00758F"
          d="M102 36c-12-16-32-20-46-12-16 9-22 28-18 45 3 13 12 24 24 30 18 9 40 5 48-10-8 6-18 8-28 6-14-3-24-15-24-30 0-13 8-25 20-28 10-3 20 1 24-1z"
        />
        <path fill="#F29111" d="M72 48a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
      </svg>
    );
  }

  // SQLite (Feather/database)
  if (norm.includes("sqlite")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#003B57"
          d="M24 16h80c8 0 14 6 14 14v68c0 8-6 14-14 14H24c-8 0-14-6-14-14V30c0-8 6-14 14-14z"
        />
        <path
          fill="#00ADEF"
          d="M32 36h64v12H32zm0 22h64v12H32zm0 22h42v12H32z"
        />
      </svg>
    );
  }

  // Redis (Red database cubes)
  if (norm.includes("redis")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path fill="#D82C20" d="M64 12l48 24v56L64 116 16 92V36z" />
        <path fill="#A3241C" d="M64 12v104l48-24V36z" />
        <path fill="#FFFFFF" d="M64 42l26 13-26 13-26-13z" opacity="0.4" />
      </svg>
    );
  }

  // Celery (Green celery leaf)
  if (norm.includes("celery")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="58" fill="#37814A" />
        <path
          fill="#86CE2A"
          d="M64 26c-18 0-26 22-14 36 6 7 12 18 14 28 2-10 8-21 14-28 12-14 4-36-14-36z"
        />
      </svg>
    );
  }

  // Microsoft Azure (Azure cloud/wave)
  if (norm.includes("azure")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#0089D6"
          d="M44 14l32 46-44 54h38l30-42 18 42h-36l-16-36 28-34z"
        />
      </svg>
    );
  }

  // Vercel (White/black triangle)
  if (norm.includes("vercel")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path fill="#FFFFFF" d="M64 16l54 94H10z" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes("git") || norm.includes("github")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="60" fill="#F05032" />
        <path
          fill="#FFFFFF"
          d="M64 26a38 38 0 0 0-12 74c2 0 3-1 3-2v-7c-11 2-13-5-13-5-2-4-4-6-4-6-3-2 0-2 0-2 4 0 6 4 6 4 3 6 9 4 11 3 0-3 1-5 2-6-9-1-18-4-18-19 0-4 2-8 4-11 0-1-2-5 0-11 0 0 3-1 11 4a38 38 0 0 1 20 0c8-5 11-4 11-4 2 6 0 10 0 11 3 3 5 7 5 11 0 15-9 18-18 19 1 1 2 4 2 8v12c0 1 1 2 3 2a38 38 0 0 0-12-74z"
        />
      </svg>
    );
  }

  // Jupyter (Orange rings)
  if (norm.includes("jupyter")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#F37626"
          d="M64 22c-28 0-46 14-46 14s16 8 46 8 46-8 46-8-18-14-46-14zm0 62c-30 0-46 8-46 8s18 14 46 14 46-14 46-14-16-8-46-8z"
        />
        <circle cx="34" cy="46" r="8" fill="#767677" />
        <circle cx="94" cy="82" r="8" fill="#767677" />
      </svg>
    );
  }

  // NumPy & Pandas
  if (norm.includes("numpy") || norm.includes("pandas")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <rect width="128" height="128" rx="16" fill="#013243" />
        <path
          fill="#4DABCF"
          d="M34 34h18v60H34zm42 0h18v60H76zm-24 16h24v14H52zm0 20h24v14H52z"
        />
      </svg>
    );
  }

  // pytest
  if (norm.includes("pytest")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path fill="#0A9EDC" d="M14 64h44V20H14z" />
        <path fill="#8DD2F2" d="M70 64h44V20H70z" />
        <path fill="#4B8BBE" d="M14 108h44V64H14z" />
        <path fill="#FED136" d="M70 108h44V64H70z" />
      </svg>
    );
  }

  // HTML / CSS
  if (norm.includes("html") || norm.includes("css")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path fill="#E34F26" d="M20 14l10 90 34 10 34-10 10-90z" />
        <path fill="#EF652A" d="M64 22v82l26-8 8-74z" />
        <path fill="#FFFFFF" d="M42 38h44l-2 16H44l2 16h38l-4 30-16 4-16-4-2-14h12l1 6 5 2 5-2 2-12H38z" />
      </svg>
    );
  }

  // Streamlit
  if (norm.includes("streamlit")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#FF4B4B"
          d="M64 20L10 98h108L92 56 78 80l-14-60z"
        />
      </svg>
    );
  }

  // RAG / Retrieval / Vector
  if (norm.includes("rag") || norm.includes("chromadb") || norm.includes("faiss")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="56" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="8 6" />
        <circle cx="64" cy="64" r="14" fill="#f59e0b" />
        <circle cx="28" cy="40" r="8" fill="#fde68a" />
        <circle cx="100" cy="40" r="8" fill="#fde68a" />
        <circle cx="40" cy="98" r="8" fill="#6366f1" />
        <circle cx="88" cy="98" r="8" fill="#6366f1" />
        <line x1="64" y1="64" x2="28" y2="40" stroke="#f59e0b" strokeWidth="3" />
        <line x1="64" y1="64" x2="100" y2="40" stroke="#f59e0b" strokeWidth="3" />
        <line x1="64" y1="64" x2="40" y2="98" stroke="#6366f1" strokeWidth="3" />
        <line x1="64" y1="64" x2="88" y2="98" stroke="#6366f1" strokeWidth="3" />
      </svg>
    );
  }

  // Claude / Groq / LLM
  if (norm.includes("claude") || norm.includes("groq") || norm.includes("model")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <circle cx="64" cy="64" r="58" fill="#D97706" />
        <polygon
          points="64,16 78,50 112,64 78,78 64,112 50,78 16,64 50,50"
          fill="#FEF3C7"
        />
      </svg>
    );
  }

  // REST APIs / JWT / OAuth / Security
  if (norm.includes("api") || norm.includes("jwt") || norm.includes("oauth")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={`tech-icon ${className}`}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="#3B82F6"
          d="M64 12l42 16v38c0 30-22 52-42 58-20-6-42-28-42-58V28z"
        />
        <path
          fill="#FFFFFF"
          d="M64 42a12 12 0 0 0-12 12v8h-4v24h32V62h-4v-8a12 12 0 0 0-12-12zm6 20h-12v-8a6 6 0 1 1 12 0z"
        />
      </svg>
    );
  }

  // Default fallback cosmic tech node
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon ${className}`}
      aria-hidden="true"
      {...props}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
};

