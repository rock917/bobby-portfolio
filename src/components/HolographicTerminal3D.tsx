import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type ActiveModule = "ai" | "dev" | "db" | "cloud" | null;

interface HolographicTerminal3DProps {
  running?: boolean;
  onReady?: () => void;
  onFail?: () => void;
}

// ---------------------------------------------------------------------------
// TERMINAL COMMAND SCRIPT & TYPING DATA
// ---------------------------------------------------------------------------
interface TerminalLine {
  type: "command" | "output" | "badge" | "blank";
  text: string;
  badge1?: string;
  badge2?: string;
}

const TERMINAL_LINES: TerminalLine[] = [
  { type: "command", text: "$ whoami" },
  { type: "output", text: "Bobby Ahirwar" },
  { type: "output", text: "> Final-Year Undergraduate @ IIT Hyderabad" },
  { type: "output", text: "> Frontend & Full-Stack Engineer" },
  { type: "output", text: "> React · Next.js · TypeScript" },
  { type: "output", text: "> AI / ML & Generative AI Systems" },
  { type: "blank", text: "" },
  { type: "command", text: "$ current_focus" },
  { type: "output", text: "> Crafting modern, responsive web apps" },
  { type: "output", text: "> Interactive 3D & client interfaces" },
  { type: "output", text: "> Full-stack intelligent systems" },
  { type: "blank", text: "" },
  { type: "command", text: "$ system_status" },
  { type: "badge", text: "", badge1: "[ ONLINE ]", badge2: "[ READY TO BUILD ]" },
];

const MODULE_FEEDBACK: Record<string, string> = {
  ai: ">> [NEURAL_CORE]: 41-Clause Legal-BERT & Groq LLM Weights Synced",
  dev: ">> [DEV_RUNTIME]: TypeScript, Python, PyTorch & AST Chunkers Compiled",
  db: ">> [DATA_STORE]: Vector Engine Ready - ChromaDB & FAISS Reciprocal Rank Active",
  cloud: ">> [CLOUD_MESH]: Multi-Agent Orchestration Nodes Online via Celery & Redis",
};

// ---------------------------------------------------------------------------
// DYNAMIC 2D CANVAS TEXTURE GENERATOR
// ---------------------------------------------------------------------------
function createTerminalCanvas(): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
} {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext("2d", { alpha: true })!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return { canvas, ctx, texture };
}

function renderTerminalToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  revealedCount: number,
  cursorVisible: boolean,
  activeModule: ActiveModule,
  moduleTime: number,
) {
  // Clear with subtle smoked glass tint
  ctx.clearRect(0, 0, width, height);

  // Background smoked base
  ctx.fillStyle = "rgba(7, 11, 16, 0.94)";
  ctx.fillRect(0, 0, width, height);

  // Holographic grid lines
  ctx.strokeStyle = "rgba(84, 200, 255, 0.05)";
  ctx.lineWidth = 1;
  const gridSize = 32;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Top Cyber HUD header bar
  ctx.fillStyle = "rgba(13, 22, 32, 0.95)";
  ctx.fillRect(0, 0, width, 52);

  // Terminal window status dots
  const dotColors = ["#f59e0b", "#fde68a", "#6366f1"];
  dotColors.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(28 + i * 20, 26, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Header Title
  ctx.font = "bold 13px 'JetBrains Mono', 'Space Grotesk', monospace";
  ctx.fillStyle = "#fde68a";
  ctx.fillText("OBSERVATORY://COSMIC-STATION // BOBBY.AHIRWAR", 100, 31);

  // System latency & status
  ctx.font = "12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#f59e0b";
  ctx.fillText("[ ORBITAL STATUS: NOMINAL ]", width - 360, 31);
  ctx.fillStyle = "#818cf8";
  ctx.fillText("RA 14h // DEC -62°", width - 150, 31);

  // Glowing divider below header
  const grad = ctx.createLinearGradient(0, 52, width, 52);
  grad.addColorStop(0, "rgba(245, 158, 11, 0.95)");
  grad.addColorStop(0.5, "rgba(253, 230, 138, 0.9)");
  grad.addColorStop(1, "rgba(99, 102, 241, 0.4)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 52);
  ctx.lineTo(width, 52);
  ctx.stroke();

  // Terminal text lines rendering
  let currentY = 96;
  const lineHeight = 30;
  let remainingChars = revealedCount;

  ctx.font = "16px 'JetBrains Mono', 'Courier New', monospace";

  for (let i = 0; i < TERMINAL_LINES.length; i++) {
    const item = TERMINAL_LINES[i];

    if (item.type === "blank") {
      currentY += 12;
      continue;
    }

    if (item.type === "command") {
      const fullText = item.text;
      const charsToShow = Math.max(0, Math.min(remainingChars, fullText.length));
      remainingChars -= charsToShow;

      if (charsToShow > 0) {
        const promptPart = "$ ";
        ctx.fillStyle = "#f59e0b";
        ctx.shadowColor = "rgba(245, 158, 11, 0.7)";
        ctx.shadowBlur = 6;
        ctx.fillText(promptPart, 36, currentY);
        ctx.shadowBlur = 0;

        const cmdPart = fullText.slice(2, charsToShow);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(cmdPart, 36 + ctx.measureText(promptPart).width, currentY);

        // If this is the active typing head
        if (remainingChars <= 0 && charsToShow < fullText.length && cursorVisible) {
          const cursorX = 36 + ctx.measureText(fullText.slice(0, charsToShow)).width + 2;
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(cursorX, currentY - 14, 10, 18);
        }
      }
      currentY += lineHeight;
    } else if (item.type === "output") {
      const fullText = item.text;
      const charsToShow = Math.max(0, Math.min(remainingChars, fullText.length));
      remainingChars -= charsToShow;

      if (charsToShow > 0) {
        const visibleSlice = fullText.slice(0, charsToShow);
        if (visibleSlice.startsWith("> ")) {
          ctx.fillStyle = "#fde68a";
          ctx.shadowColor = "rgba(253, 230, 138, 0.6)";
          ctx.shadowBlur = 5;
          ctx.fillText("> ", 46, currentY);
          ctx.shadowBlur = 0;

          ctx.fillStyle = "#D7E3EC";
          ctx.fillText(visibleSlice.slice(2), 46 + ctx.measureText("> ").width, currentY);
        } else {
          // Bobby Ahirwar prominent name line
          ctx.font = "bold 20px 'Space Grotesk', 'JetBrains Mono', monospace";
          ctx.fillStyle = "#f59e0b";
          ctx.shadowColor = "rgba(245, 158, 11, 0.85)";
          ctx.shadowBlur = 10;
          ctx.fillText(visibleSlice, 46, currentY);
          ctx.shadowBlur = 0;
          ctx.font = "16px 'JetBrains Mono', 'Courier New', monospace";
        }
      }
      currentY += lineHeight;
    } else if (item.type === "badge") {
      // Badges
      if (remainingChars >= 0) {
        // [ ONLINE ]
        const b1 = item.badge1 || "";
        const b2 = item.badge2 || "";

        ctx.font = "bold 14px 'JetBrains Mono', monospace";

        // Draw Badge 1 (Gold)
        const b1Width = ctx.measureText(b1).width + 24;
        ctx.fillStyle = "rgba(245, 158, 11, 0.16)";
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(46, currentY - 18, b1Width, 26, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#f59e0b";
        ctx.shadowColor = "rgba(245, 158, 11, 0.8)";
        ctx.shadowBlur = 8;
        ctx.fillText(b1, 58, currentY);
        ctx.shadowBlur = 0;

        // Draw Badge 2 (Amber)
        const b2X = 46 + b1Width + 14;
        const b2Width = ctx.measureText(b2).width + 24;
        ctx.fillStyle = "rgba(253, 230, 138, 0.16)";
        ctx.strokeStyle = "#fde68a";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(b2X, currentY - 18, b2Width, 26, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fde68a";
        ctx.shadowColor = "rgba(253, 230, 138, 0.8)";
        ctx.shadowBlur = 8;
        ctx.fillText(b2, b2X + 12, currentY);
        ctx.shadowBlur = 0;

        // Final flashing cursor
        if (cursorVisible) {
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(b2X + b2Width + 14, currentY - 14, 10, 18);
        }
      }
      currentY += lineHeight;
    }
  }

  // Active module feedback strip at the bottom
  if (activeModule && moduleTime > 0) {
    const feedback = MODULE_FEEDBACK[activeModule];
    ctx.fillStyle = "rgba(10, 26, 38, 0.95)";
    ctx.fillRect(0, height - 76, width, 40);

    ctx.strokeStyle = "#36F5A0";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, height - 76, width, 40);

    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#36F5A0";
    ctx.shadowColor = "rgba(54, 245, 160, 0.8)";
    ctx.shadowBlur = 8;
    ctx.fillText(feedback, 24, height - 51);
    ctx.shadowBlur = 0;
  }

  // Bottom footer info
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(180, 161, 255, 0.6)";
  ctx.fillText("SEC_LEVEL: 04 // PROTOCOL: RAG-NEURAL // SYSTEM_HASH: #9170-IITH", 36, height - 16);

  // Subtle scanline overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1.5);
  }

  // Corner HUD crosshairs
  ctx.strokeStyle = "rgba(84, 200, 255, 0.5)";
  ctx.lineWidth = 1.5;
  const bracketSize = 14;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(12, 12 + bracketSize);
  ctx.lineTo(12, 12);
  ctx.lineTo(12 + bracketSize, 12);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(width - 12 - bracketSize, height - 12);
  ctx.lineTo(width - 12, height - 12);
  ctx.lineTo(width - 12, height - 12 - bracketSize);
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// 3D FLOATING HOLOGRAPHIC MODULE 1: AI (Neural Brain & Synapse Nodes)
// ---------------------------------------------------------------------------
function AIModule({
  position,
  active,
  onClick,
}: {
  position: [number, number, number];
  active: boolean;
  onClick: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Node coordinates for 3D neural brain topology
  const nodes = useMemo(() => {
    return [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.38, 0.22, 0.18),
      new THREE.Vector3(-0.35, 0.25, -0.15),
      new THREE.Vector3(0.25, -0.32, 0.2),
      new THREE.Vector3(-0.28, -0.28, -0.18),
      new THREE.Vector3(0.42, -0.1, -0.2),
      new THREE.Vector3(-0.4, 0.05, 0.22),
    ];
  }, []);

  // Neural connection lines
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 1; i < nodes.length; i++) {
      points.push(nodes[0], nodes[i]);
      if (i > 1) {
        points.push(nodes[i - 1], nodes[i]);
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 1.5 + 0.5) * 0.08;
    group.current.rotation.y += delta * (active ? 1.8 : hovered ? 0.9 : 0.4);
    group.current.rotation.x = Math.sin(t * 0.8) * 0.12;

    if (coreRef.current) {
      const scale = active ? 1.25 + Math.sin(t * 12) * 0.15 : hovered ? 1.15 : 1.0;
      coreRef.current.scale.setScalar(scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (active ? 2.5 : 0.8);
    }
  });

  return (
    <group
      ref={group}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Outer Holographic Reticle Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[0.62, 0.65, 32]} />
        <meshBasicMaterial
          color={active ? "#36F5A0" : hovered ? "#54C8FF" : "#36F5A0"}
          transparent
          opacity={active ? 0.95 : hovered ? 0.85 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Central Neural Brain Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#36F5A0"
          emissive="#36F5A0"
          emissiveIntensity={active ? 2.8 : hovered ? 1.8 : 1.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Satellite Synaptic Nodes */}
      {nodes.slice(1).map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial
            color={active ? "#54C8FF" : "#36F5A0"}
            transparent
            opacity={active ? 1 : 0.8}
          />
        </mesh>
      ))}

      {/* Synaptic Network Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={active ? "#36F5A0" : "#54C8FF"}
          transparent
          opacity={active ? 0.9 : hovered ? 0.75 : 0.4}
          linewidth={2}
        />
      </lineSegments>

      {/* Floating Tag Card */}
      <group position={[0, -0.72, 0]}>
        <mesh>
          <planeGeometry args={[0.92, 0.22]} />
          <meshBasicMaterial color="#0A1824" transparent opacity={0.85} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.92, 0.22)]} />
          <lineBasicMaterial color={active ? "#36F5A0" : "#54C8FF"} />
        </lineSegments>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D FLOATING HOLOGRAPHIC MODULE 2: DEVELOPMENT (Code Brackets & Editor)
// ---------------------------------------------------------------------------
function DevModule({
  position,
  active,
  onClick,
}: {
  position: [number, number, number];
  active: boolean;
  onClick: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 1.3 + 1.2) * 0.07;
    group.current.rotation.y += delta * (active ? 2.2 : hovered ? 1.0 : 0.35);
    group.current.rotation.z = Math.cos(t * 0.9) * 0.08;
  });

  return (
    <group
      ref={group}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Mini Code Editor Glass Plate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.65, 0.04]} />
        <meshStandardMaterial
          color="#081420"
          roughness={0.2}
          metalness={0.85}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Glowing Border around Code Card */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.67, 0.05)]} />
        <lineBasicMaterial
          color={active ? "#54C8FF" : hovered ? "#36F5A0" : "#54C8FF"}
          linewidth={2}
        />
      </lineSegments>

      {/* Left Bracket < */}
      <group position={[-0.26, 0, 0.04]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.18, 0.035, 0.02]} />
          <meshBasicMaterial color="#36F5A0" />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.18, 0.035, 0.02]} />
          <meshBasicMaterial color="#36F5A0" />
        </mesh>
      </group>

      {/* Slash / */}
      <mesh position={[-0.04, -0.06, 0.04]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.03, 0.28, 0.02]} />
        <meshBasicMaterial color="#B4A1FF" />
      </mesh>

      {/* Right Bracket > */}
      <group position={[0.18, 0, 0.04]}>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.18, 0.035, 0.02]} />
          <meshBasicMaterial color="#54C8FF" />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.18, 0.035, 0.02]} />
          <meshBasicMaterial color="#54C8FF" />
        </mesh>
      </group>

      {/* Code Syntax Highlight Lines in Background */}
      <mesh position={[0, 0.16, 0.03]}>
        <planeGeometry args={[0.7, 0.03]} />
        <meshBasicMaterial color="#54C8FF" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.08, -0.2, 0.03]}>
        <planeGeometry args={[0.5, 0.03]} />
        <meshBasicMaterial color="#36F5A0" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D FLOATING HOLOGRAPHIC MODULE 3: DATABASE (Vector Cylinder & Data Particles)
// ---------------------------------------------------------------------------
function DatabaseModule({
  position,
  active,
  onClick,
}: {
  position: [number, number, number];
  active: boolean;
  onClick: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const cylinderStack = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  // Particle positions
  const particleCount = 28;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.26 + Math.random() * 0.12;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.7;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 1.4 + 2.2) * 0.08;
    group.current.rotation.y += delta * (active ? 2.5 : hovered ? 1.2 : 0.5);

    // Animate data stream particles rising up
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const speed = active ? delta * 1.8 : delta * 0.6;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += speed;
        if (positions[i * 3 + 1] > 0.45) {
          positions[i * 3 + 1] = -0.45;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group
      ref={group}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <group ref={cylinderStack}>
        {/* Tier 1 (Top Disc) */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 28]} />
          <meshStandardMaterial
            color="#081A26"
            emissive="#54C8FF"
            emissiveIntensity={active ? 1.4 : hovered ? 0.9 : 0.4}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
        {/* Tier 2 (Middle Disc) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 28]} />
          <meshStandardMaterial
            color="#061622"
            emissive="#36F5A0"
            emissiveIntensity={active ? 1.5 : hovered ? 0.9 : 0.45}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
        {/* Tier 3 (Bottom Disc) */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 28]} />
          <meshStandardMaterial
            color="#081A26"
            emissive="#54C8FF"
            emissiveIntensity={active ? 1.4 : hovered ? 0.9 : 0.4}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Glowing Neon Rings around Discs */}
      <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.345, 0.365, 32]} />
        <meshBasicMaterial color="#54C8FF" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.345, 0.365, 32]} />
        <meshBasicMaterial color="#36F5A0" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.345, 0.365, 32]} />
        <meshBasicMaterial color="#54C8FF" side={THREE.DoubleSide} />
      </mesh>

      {/* Swirling Data Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={active ? "#36F5A0" : "#54C8FF"}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D FLOATING HOLOGRAPHIC MODULE 4: CLOUD (Cloud Symbol & Sync Connections)
// ---------------------------------------------------------------------------
function CloudModule({
  position,
  active,
  onClick,
}: {
  position: [number, number, number];
  active: boolean;
  onClick: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 1.6 + 3.1) * 0.08;
    group.current.rotation.y += delta * (active ? 2.0 : hovered ? 1.0 : 0.4);
    group.current.rotation.x = Math.sin(t * 0.7) * 0.1;

    if (beaconRef.current) {
      const pulse = active ? 1.4 + Math.sin(t * 10) * 0.3 : 1.0;
      beaconRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group
      ref={group}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Main Holographic Cloud Rings Cluster */}
      {/* Center bubble */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial
          color="#081A2E"
          emissive="#54C8FF"
          emissiveIntensity={active ? 1.8 : hovered ? 1.2 : 0.6}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Left bubble */}
      <mesh position={[-0.18, -0.04, 0]}>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshStandardMaterial
          color="#081A2E"
          emissive="#36F5A0"
          emissiveIntensity={active ? 1.6 : hovered ? 1.1 : 0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Right bubble */}
      <mesh position={[0.2, -0.05, 0]}>
        <sphereGeometry args={[0.15, 18, 18]} />
        <meshStandardMaterial
          color="#081A2E"
          emissive="#54C8FF"
          emissiveIntensity={active ? 1.6 : hovered ? 1.1 : 0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Central Sync Beacon Light */}
      <mesh ref={beaconRef} position={[0, 0.04, 0.2]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={active ? "#36F5A0" : "#54C8FF"} />
      </mesh>

      {/* Holographic Sync Orbital Ring */}
      <mesh rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[0.42, 0.012, 16, 32]} />
        <meshBasicMaterial
          color={active ? "#36F5A0" : "#54C8FF"}
          transparent
          opacity={active ? 0.9 : 0.55}
        />
      </mesh>

      {/* Connection Ray toward Terminal */}
      <mesh position={[0.2, -0.4, -0.1]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.008, 0.008, 0.5, 8]} />
        <meshBasicMaterial
          color={active ? "#36F5A0" : "#54C8FF"}
          transparent
          opacity={active ? 0.9 : 0.35}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// MAIN 3D HOLOGRAPHIC TERMINAL SCREEN MESH
// ---------------------------------------------------------------------------
function MainTerminalScreen({
  running,
  activeModule,
  onModuleClick,
}: {
  running: boolean;
  activeModule: ActiveModule;
  onModuleClick: (mod: ActiveModule) => void;
}) {
  const terminalGroup = useRef<THREE.Group>(null);
  const [terminalHovered, setTerminalHovered] = useState(false);
  const { size, pointer } = useThree();

  // Setup dynamic offscreen canvas for crisp terminal rendering
  const { canvas, ctx, texture } = useMemo(() => createTerminalCanvas(), []);

  // Typing state
  const totalChars = useMemo(() => {
    return TERMINAL_LINES.reduce((acc, line) => acc + line.text.length, 0) + 20;
  }, []);

  const [revealedChars, setRevealedChars] = useState(0);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [moduleTime, setModuleTime] = useState(0);

  // Typewriter ticker
  useEffect(() => {
    if (!running) return;

    const typeTimer = setInterval(() => {
      setRevealedChars((prev) => {
        if (prev < totalChars) {
          return prev + 1;
        }
        return prev;
      });
    }, 38);

    const blinkTimer = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 480);

    return () => {
      clearInterval(typeTimer);
      clearInterval(blinkTimer);
    };
  }, [running, totalChars]);

  // Module interaction notification countdown
  useEffect(() => {
    if (!activeModule) return;
    setModuleTime(120);
    const interval = setInterval(() => {
      setModuleTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [activeModule]);

  // Redraw canvas on character updates, cursor blink, or module changes
  useEffect(() => {
    renderTerminalToCanvas(
      ctx,
      canvas.width,
      canvas.height,
      revealedChars,
      cursorBlink,
      activeModule,
      moduleTime,
    );
    texture.needsUpdate = true;
  }, [revealedChars, cursorBlink, activeModule, moduleTime, ctx, canvas, texture]);

  // Smooth mouse tilt & parallax loop
  useFrame((state) => {
    if (!terminalGroup.current) return;
    const t = state.clock.elapsedTime;

    // Subtle gentle floating / breathing motion
    const idleY = Math.sin(t * 0.9) * 0.06;

    // Mouse tilt targeting
    const targetRotY = (pointer.x * 0.22) * (size.width < 900 ? 0.4 : 1.0);
    const targetRotX = (-pointer.y * 0.16) * (size.width < 900 ? 0.4 : 1.0);

    terminalGroup.current.position.y = THREE.MathUtils.lerp(
      terminalGroup.current.position.y,
      idleY,
      0.08,
    );
    terminalGroup.current.rotation.y = THREE.MathUtils.lerp(
      terminalGroup.current.rotation.y,
      targetRotY,
      0.08,
    );
    terminalGroup.current.rotation.x = THREE.MathUtils.lerp(
      terminalGroup.current.rotation.x,
      targetRotX,
      0.08,
    );
  });

  return (
    <group ref={terminalGroup}>
      {/* 1. Main Terminal Screen Chassis (Metallic Dark Frame) */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setTerminalHovered(true);
        }}
        onPointerOut={() => setTerminalHovered(false)}
      >
        <boxGeometry args={[4.46, 2.96, 0.08]} />
        <meshStandardMaterial
          color="#060A0E"
          roughness={0.22}
          metalness={0.92}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* 2. Outer Beveled Smoked-Glass Layer (Real 3D Depth) */}
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[4.52, 3.02, 0.05]} />
        <meshPhysicalMaterial
          color="#0B1A24"
          roughness={0.08}
          metalness={0.15}
          transparent
          opacity={0.28}
          reflectivity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Glowing Starlight Gold Borders */}
      <lineSegments position={[0, 0, 0.05]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.5, 3.0, 0.09)]} />
        <lineBasicMaterial
          color={terminalHovered ? "#fde68a" : "#f59e0b"}
          transparent
          opacity={terminalHovered ? 0.95 : 0.75}
          linewidth={2}
        />
      </lineSegments>

      {/* 4. Amber Illuminated Corner Brackets */}
      {/* Top Left */}
      <group position={[-2.25, 1.5, 0.07]}>
        <mesh position={[0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.03, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.03, 0.3, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
      </group>
      {/* Top Right */}
      <group position={[2.25, 1.5, 0.07]}>
        <mesh position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.03, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.03, 0.3, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
      </group>
      {/* Bottom Left */}
      <group position={[-2.25, -1.5, 0.07]}>
        <mesh position={[0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.03, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.03, 0.3, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
      </group>
      {/* Bottom Right */}
      <group position={[2.25, -1.5, 0.07]}>
        <mesh position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.03, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.03, 0.3, 0.02]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
      </group>

      {/* 5. Terminal Display Face with Dynamic CanvasTexture */}
      <mesh position={[0, 0, 0.048]}>
        <planeGeometry args={[4.38, 2.88]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.98}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 6. Hardware LED Indicator (Pulsing Gold) */}
      <mesh position={[0, 1.44, 0.06]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* 7. Floating Holographic Emitter Ground Ring Below */}
      <mesh position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.2, 48]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.1, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 8. The 4 Floating Interactive Holographic Modules */}
      <AIModule
        position={[2.85, 1.35, 0.45]}
        active={activeModule === "ai"}
        onClick={() => onModuleClick("ai")}
      />
      <DevModule
        position={[2.95, -1.25, 0.38]}
        active={activeModule === "dev"}
        onClick={() => onModuleClick("dev")}
      />
      <DatabaseModule
        position={[-2.95, -1.25, 0.42]}
        active={activeModule === "db"}
        onClick={() => onModuleClick("db")}
      />
      <CloudModule
        position={[-2.85, 1.35, 0.35]}
        active={activeModule === "cloud"}
        onClick={() => onModuleClick("cloud")}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D SCENE ROOT CONTAINER
// ---------------------------------------------------------------------------
export default function HolographicTerminal3D({
  running = true,
  onReady,
  onFail,
}: HolographicTerminal3DProps) {
  const [activeModule, setActiveModule] = useState<ActiveModule>(null);

  const handleModuleClick = useCallback((mod: ActiveModule) => {
    setActiveModule((curr) => (curr === mod ? null : mod));
  }, []);

  return (
    <div className="holo-terminal-3d-wrap" style={{ width: "100%", height: "100%", minHeight: "520px" }}>
      <Canvas
        camera={{ position: [0, 0, 7.0], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={running ? "always" : "demand"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", () => onFail?.(), {
            once: true,
          });
          onReady?.();
        }}
      >
        {/* Cinematic Cosmic Observatory Lighting */}
        <ambientLight intensity={0.65} color="#1e1b4b" />
        <directionalLight position={[-4, 3, 3]} intensity={2.8} color="#fde68a" />
        <directionalLight position={[4, 2, -1.5]} intensity={3.5} color="#f59e0b" />
        <pointLight position={[0, -2.5, 2.5]} intensity={2.2} color="#6366f1" />
        <pointLight position={[0, 2.5, 2]} intensity={2.0} color="#f59e0b" />

        <Suspense fallback={null}>
          <MainTerminalScreen
            running={running}
            activeModule={activeModule}
            onModuleClick={handleModuleClick}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { default as HolographicTerminalFallback } from "./HolographicTerminalFallback";
