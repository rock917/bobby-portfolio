import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  Group,
  Mesh,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import { interstellarAudio } from "../utils/interstellarAudio";

// Calculate 3D Cartesian coordinates for IIT Hyderabad (Lat: 17.59° N, Lon: 78.12° E)
function latLonToVector3(lat: number, lon: number, radius: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function IITHBeacon({ radius }: { radius: number }) {
  const pos = useMemo(() => latLonToVector3(17.59, 78.12, radius), [radius]);
  const pulseRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.35;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={pos}>
      {/* Surface pin point */}
      <mesh>
        <sphereGeometry args={[0.038, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      {/* Pulsing beacon glow */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial
          color="#fde68a"
          transparent
          opacity={0.65}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function GlobeInner({
  running,
  onGlobeClick,
}: {
  running: boolean;
  onGlobeClick: () => void;
}) {
  const globeGroup = useRef<Group>(null);
  const earthMesh = useRef<Mesh>(null);
  const cloudsMesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load Earth surface and clouds textures
  const [earthMap, cloudsMap] = useLoader(TextureLoader, [
    "/images/earth/earth-day.webp",
    "/images/earth/earth_clouds_1024.png",
  ]);

  useEffect(() => {
    earthMap.colorSpace = SRGBColorSpace;
  }, [earthMap]);

  useFrame((_, delta) => {
    if (running) {
      const dt = Math.min(delta, 0.05);
      // Continuous axial rotation (Earth rotates once every day)
      if (earthMesh.current) {
        earthMesh.current.rotation.y += dt * 0.09;
      }
      // Atmospheric clouds drift slightly faster
      if (cloudsMesh.current) {
        cloudsMesh.current.rotation.y += dt * 0.11;
      }
    }
  });

  // Handle pointer hover and cursor change
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onGlobeClick();
  };

  return (
    <group
      ref={globeGroup}
      rotation={[0.32, 0, -0.15]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Earth Surface Sphere */}
      <mesh ref={earthMesh} rotation={[0, 2.2, 0]}>
        <sphereGeometry args={[1.72, 64, 64]} />
        <meshStandardMaterial
          map={earthMap}
          roughness={0.72}
          metalness={0.12}
        />
        {/* IITH Location Pin anchored on the rotating Earth sphere */}
        <IITHBeacon radius={1.725} />
      </mesh>

      {/* Atmospheric Clouds Layer */}
      <mesh ref={cloudsMesh} rotation={[0, 2.2, 0]}>
        <sphereGeometry args={[1.745, 48, 48]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.34}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Atmospheric Outer Glow Rim (Cosmic Cyan/Gold Halo) */}
      <mesh scale={1.03}>
        <sphereGeometry args={[1.74, 48, 48]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          side={BackSide}
          blending={AdditiveBlending}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float rim = max(0.0, 0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)));
              float intensity = pow(rim, 3.0);
              gl_FragColor = vec4(0.96, 0.65, 0.15, intensity * 0.9); // Supernova Gold Rim
            }
          `}
        />
      </mesh>

      {/* Inner Atmospheric Fresnel Soft Layer */}
      <mesh scale={1.012}>
        <sphereGeometry args={[1.72, 48, 48]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vec4 p = modelViewMatrix * vec4(position, 1.0);
              vPosition = p.xyz;
              gl_Position = projectionMatrix * p;
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(-vPosition)), 0.0), 3.5);
              gl_FragColor = vec4(0.38, 0.68, 1.0, rim * 0.4); // Earth Cyan Atmosphere Haze
            }
          `}
        />
      </mesh>

      {/* Thin Gold Starlight Orbit Ring */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[2.35, 2.37, 80]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.35}
          side={2}
        />
      </mesh>
    </group>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export default function Earth3D({
  running,
  onReady,
  onFail,
  onOpenBio,
}: {
  running: boolean;
  onReady: () => void;
  onFail: () => void;
  onOpenBio: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return interstellarAudio.subscribe(setIsPlaying);
  }, []);

  const handleGlobeClick = () => {
    // Open the bio telemetry profile modal (music plays only on explicit user click)
    onOpenBio();
  };

  return (
    <div
      className="earth-3d-stage"
      role="region"
      aria-label="Interactive 3D Earth Globe. Click to open Bobby Ahirwar profile."
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        dpr={[1, 1.75]}
        frameloop={running ? "always" : "demand"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", onFail, {
            once: true,
          });
        }}
        fallback={null}
      >
        <ambientLight intensity={0.25} color="#1e1b4b" />
        {/* Sun directional light illuminating the day hemisphere */}
        <directionalLight position={[-5, 3, 3]} intensity={3.8} color="#fffbeb" />
        {/* Deep space backlight */}
        <pointLight position={[5, -2, -3]} intensity={4.2} color="#6366f1" />

        <Suspense fallback={null}>
          <GlobeInner running={running} onGlobeClick={handleGlobeClick} />
          <Ready onReady={onReady} />
        </Suspense>
      </Canvas>

      {/* Floating Interactive Beacon Badge */}
      <button
        type="button"
        className="earth-hud-beacon"
        onClick={handleGlobeClick}
        aria-label="Open Bobby Ahirwar intro profile"
      >
        <div className="hud-beacon-pulse" />
        <div className="hud-beacon-copy">
          <span className="hud-kicker">
            <span className="live-dot" />
            IIT HYDERABAD // ORBIT ACTIVE
          </span>
          <strong>Click Earth for Intro</strong>
          <small className="hud-audio-hint">
            {isPlaying ? (
              <span className="audio-playing-indicator">
                <span className="equalizer-bar eq-1" />
                <span className="equalizer-bar eq-2" />
                <span className="equalizer-bar eq-3" />
                Playing Interstellar Theme ♫
              </span>
            ) : (
              "Click to view profile"
            )}
          </small>
        </div>
      </button>
    </div>
  );
}

