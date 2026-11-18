import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Mesh, TextureLoader, SRGBColorSpace } from "three";

function Globe({ running }: { running: boolean }) {
  const earth = useRef<Mesh>(null);
  const clouds = useRef<Mesh>(null);
  const [map, cloudMap] = useLoader(TextureLoader, [
    "/images/earth/earth-day.webp",
    "/images/earth/earth_clouds_1024.png",
  ]);
  useEffect(() => {
    map.colorSpace = SRGBColorSpace;
  }, [map]);
  useFrame((_, delta) => {
    if (running) {
      if (earth.current)
        earth.current.rotation.y += Math.min(delta, 0.05) * 0.052;
      if (clouds.current)
        clouds.current.rotation.y += Math.min(delta, 0.05) * 0.06;
    }
  });
  return (
    <group rotation={[0.15, 0, -0.23]}>
      <mesh ref={earth} rotation={[0, 2.5, 0]}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.83} />
      </mesh>
      <mesh ref={clouds} rotation={[0, 2.5, 0]}>
        <sphereGeometry args={[1.617, 48, 48]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[1.6, 48, 48]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexShader={
            "varying vec3 vNormal; varying vec3 vPosition; void main(){vNormal=normalize(normalMatrix*normal); vec4 p=modelViewMatrix*vec4(position,1.0); vPosition=p.xyz; gl_Position=projectionMatrix*p;}"
          }
          fragmentShader={
            "varying vec3 vNormal; varying vec3 vPosition; void main(){float rim=pow(1.0-max(dot(normalize(vNormal),normalize(-vPosition)),0.0),4.0); gl_FragColor=vec4(0.30,0.57,1.0,rim*0.30);}"
          }
        />
      </mesh>
    </group>
  );
}
export default function Planet({
  running,
  onReady,
  onFail,
}: {
  running: boolean;
  onReady: () => void;
  onFail: () => void;
}) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 5.6], fov: 43 }}
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFail, {
          once: true,
        });
      }}
      fallback={null}
    >
      <ambientLight intensity={0.16} />
      <directionalLight position={[-4, 3, 2]} intensity={3.5} />
      <pointLight position={[4, -1, -2]} intensity={6} color="#6889ff" />
      <Suspense fallback={null}>
        <Globe running={running} />
        <Ready onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}
