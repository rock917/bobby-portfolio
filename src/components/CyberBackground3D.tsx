import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// Helper for drawing orbital trail ellipse
function OrbitLine({
  radiusX,
  radiusZ,
  color = "#f59e0b",
  opacity = 0.12,
}: {
  radiusX: number;
  radiusZ: number;
  color?: string;
  opacity?: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusX,
          Math.sin(theta * 0.5) * 0.35,
          Math.sin(theta) * radiusZ,
        ),
      );
    }
    return pts;
  }, [radiusX, radiusZ]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineLoop>
  );
}

// Interactive moving planet
function MovingPlanet({
  radiusX,
  radiusZ,
  size,
  speed,
  offset,
  color,
  emissive = "#000000",
  hasRings = false,
  hasMoon = false,
}: {
  radiusX: number;
  radiusZ: number;
  size: number;
  speed: number;
  offset: number;
  color: string;
  emissive?: string;
  hasRings?: boolean;
  hasMoon?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (groupRef.current) {
      const x = Math.cos(t) * radiusX;
      const z = Math.sin(t) * radiusZ;
      const y = Math.sin(t * 0.5) * 0.35;
      groupRef.current.position.set(x, y, z);
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.015;
    }
    if (moonRef.current) {
      const mt = state.clock.elapsedTime * 2.5;
      moonRef.current.position.set(
        Math.cos(mt) * (size * 2.4),
        Math.sin(mt * 0.8) * 0.15,
        Math.sin(mt) * (size * 2.4),
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Planet Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.35}
          roughness={0.65}
          metalness={0.2}
        />
      </mesh>

      {/* Saturn's Planetary Rings */}
      {hasRings && (
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[size * 1.5, size * 2.5, 32]} />
          <meshBasicMaterial
            color="#fde68a"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Earth's Orbiting Moon */}
      {hasMoon && (
        <mesh ref={moonRef}>
          <sphereGeometry args={[size * 0.28, 12, 12]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#94a3b8"
            emissiveIntensity={0.2}
            roughness={0.9}
          />
        </mesh>
      )}
    </group>
  );
}

// Deep Cosmic Stardust Particles
function StardustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#fde68a"
        transparent
        opacity={0.55}
      />
    </points>
  );
}

// Full Cosmic Solar System Scene
function CosmicSolarSystem() {
  const systemRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (systemRef.current) {
      // Gentle cursor parallax
      systemRef.current.rotation.y = t * 0.015 + pointer.x * 0.12;
      systemRef.current.rotation.x = -0.15 - pointer.y * 0.08;
    }
    if (sunRef.current) {
      sunRef.current.rotation.y = t * 0.03;
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      sunRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={systemRef} position={[1.5, 0.5, -4]}>
      {/* Central Supernova Star Anchor */}
      <mesh ref={sunRef} position={[0, 0, -2]}>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Sun Golden Coronal Halo */}
      <pointLight position={[0, 0, -2]} color="#fbbf24" intensity={2.8} distance={24} />

      {/* Ambient Celestial Light */}
      <ambientLight color="#6366f1" intensity={0.45} />
      <directionalLight position={[10, 10, 5]} color="#fde68a" intensity={0.8} />

      {/* Orbital Trails */}
      <OrbitLine radiusX={2.4} radiusZ={2.0} color="#f59e0b" opacity={0.15} />
      <OrbitLine radiusX={3.8} radiusZ={3.2} color="#fde68a" opacity={0.16} />
      <OrbitLine radiusX={5.2} radiusZ={4.4} color="#38bdf8" opacity={0.2} />
      <OrbitLine radiusX={6.8} radiusZ={5.6} color="#f87171" opacity={0.16} />
      <OrbitLine radiusX={8.6} radiusZ={7.0} color="#f59e0b" opacity={0.18} />
      <OrbitLine radiusX={10.5} radiusZ={8.6} color="#fbbf24" opacity={0.2} />

      {/* 1. Mercury */}
      <MovingPlanet
        radiusX={2.4}
        radiusZ={2.0}
        size={0.12}
        speed={0.4}
        offset={0.4}
        color="#d1d5db"
      />

      {/* 2. Venus */}
      <MovingPlanet
        radiusX={3.8}
        radiusZ={3.2}
        size={0.2}
        speed={0.28}
        offset={1.8}
        color="#fde047"
        emissive="#b45309"
      />

      {/* 3. Earth & Orbiting Moon */}
      <MovingPlanet
        radiusX={5.2}
        radiusZ={4.4}
        size={0.26}
        speed={0.2}
        offset={3.4}
        color="#38bdf8"
        emissive="#0369a1"
        hasMoon
      />

      {/* 4. Mars (Red Planet) */}
      <MovingPlanet
        radiusX={6.8}
        radiusZ={5.6}
        size={0.18}
        speed={0.16}
        offset={4.6}
        color="#f87171"
        emissive="#991b1b"
      />

      {/* 5. Jupiter (Great Gas Giant) */}
      <MovingPlanet
        radiusX={8.6}
        radiusZ={7.0}
        size={0.48}
        speed={0.1}
        offset={0.9}
        color="#ea580c"
        emissive="#c2410c"
      />

      {/* 6. Saturn with 3D Rings */}
      <MovingPlanet
        radiusX={10.5}
        radiusZ={8.6}
        size={0.4}
        speed={0.075}
        offset={2.3}
        color="#fef08a"
        emissive="#d97706"
        hasRings
      />

      {/* Background Stardust Particles */}
      <StardustParticles />
    </group>
  );
}

export default function CyberBackground3D() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="cyber-background-3d"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.9,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <CosmicSolarSystem />
        </Suspense>
      </Canvas>
    </div>
  );
}
