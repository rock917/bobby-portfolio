import { useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface HoloCard3DProps {
  children: ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number;
  glowColor?: "gold" | "amber" | "indigo" | "emerald" | "cyan" | "violet";
  style?: CSSProperties;
}

export default function HoloCard3D({
  children,
  className = "",
  id,
  maxTilt = 7,
  glowColor = "gold",
  style,
}: HoloCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [styleTransform, setStyleTransform] = useState<CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((centerY - y) / centerY) * maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyleTransform({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`,
      transition: "transform 0.08s ease-out",
      ["--glare-x" as string]: `${glareX.toFixed(1)}%`,
      ["--glare-y" as string]: `${glareY.toFixed(1)}%`,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setStyleTransform({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.45s ease-out",
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      className={`holo-card-3d holo-card-${glowColor} ${isHovered ? "is-hovered" : ""} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ ...style, ...styleTransform }}
    >
      {/* Specular Holographic Glare Overlay */}
      <div className="holo-glare-layer" aria-hidden="true" />

      {/* Cyber Corner Reticles */}
      <span className="corner-bracket top-left" aria-hidden="true" />
      <span className="corner-bracket top-right" aria-hidden="true" />
      <span className="corner-bracket bottom-left" aria-hidden="true" />
      <span className="corner-bracket bottom-right" aria-hidden="true" />

      {children}
    </div>
  );
}

