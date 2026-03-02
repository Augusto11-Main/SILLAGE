/*
 * FragranceCanvas — Interactive 3D scene
 * Design: Floating glass perfume bottles in a warm void
 * Philosophy: Restrained luxury — bottles as sculptural objects
 * Tech: React Three Fiber + @react-three/drei
 *
 * Mouse Parallax:
 *   - Global mouse position (normalized -1..1) is captured via a DOM listener
 *   - useFrame smoothly lerps a "target" group rotation toward the mouse
 *   - Each bottle also has a subtle individual offset for depth layering
 *   - On mobile / touch devices the effect is disabled
 */

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Shared mouse state (module-level, updated by DOM listener) ────
const mouse = { x: 0, y: 0 };

// ── Bottle shape: lathe geometry ─────────────────────────────────
function PerfumeBottle({
  position = [0, 0, 0] as [number, number, number],
  liquidColor = "#C4975A",
  glassColor = "#e8dfd0",
  scale = 1,
  rotationOffset = 0,
  bottleStyle = "classic",
}: {
  position?: [number, number, number];
  liquidColor?: string;
  glassColor?: string;
  scale?: number;
  rotationOffset?: number;
  bottleStyle?: "classic" | "round" | "tall";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    if (bottleStyle === "classic") {
      pts.push(new THREE.Vector2(0.0, 0.0));
      pts.push(new THREE.Vector2(0.36, 0.0));
      pts.push(new THREE.Vector2(0.38, 0.04));
      pts.push(new THREE.Vector2(0.4, 0.25));
      pts.push(new THREE.Vector2(0.4, 0.8));
      pts.push(new THREE.Vector2(0.38, 1.1));
      pts.push(new THREE.Vector2(0.34, 1.35));
      pts.push(new THREE.Vector2(0.25, 1.5));
      pts.push(new THREE.Vector2(0.15, 1.62));
      pts.push(new THREE.Vector2(0.1, 1.72));
      pts.push(new THREE.Vector2(0.09, 1.9));
      pts.push(new THREE.Vector2(0.09, 2.05));
      pts.push(new THREE.Vector2(0.13, 2.08));
      pts.push(new THREE.Vector2(0.15, 2.12));
      pts.push(new THREE.Vector2(0.15, 2.55));
      pts.push(new THREE.Vector2(0.13, 2.58));
      pts.push(new THREE.Vector2(0.0, 2.58));
    } else if (bottleStyle === "round") {
      pts.push(new THREE.Vector2(0.0, 0.0));
      pts.push(new THREE.Vector2(0.3, 0.0));
      pts.push(new THREE.Vector2(0.42, 0.1));
      pts.push(new THREE.Vector2(0.48, 0.4));
      pts.push(new THREE.Vector2(0.5, 0.8));
      pts.push(new THREE.Vector2(0.48, 1.2));
      pts.push(new THREE.Vector2(0.42, 1.5));
      pts.push(new THREE.Vector2(0.3, 1.7));
      pts.push(new THREE.Vector2(0.15, 1.82));
      pts.push(new THREE.Vector2(0.1, 1.95));
      pts.push(new THREE.Vector2(0.09, 2.1));
      pts.push(new THREE.Vector2(0.13, 2.13));
      pts.push(new THREE.Vector2(0.14, 2.16));
      pts.push(new THREE.Vector2(0.14, 2.5));
      pts.push(new THREE.Vector2(0.12, 2.53));
      pts.push(new THREE.Vector2(0.0, 2.53));
    } else {
      pts.push(new THREE.Vector2(0.0, 0.0));
      pts.push(new THREE.Vector2(0.28, 0.0));
      pts.push(new THREE.Vector2(0.3, 0.04));
      pts.push(new THREE.Vector2(0.32, 0.3));
      pts.push(new THREE.Vector2(0.32, 1.4));
      pts.push(new THREE.Vector2(0.3, 1.65));
      pts.push(new THREE.Vector2(0.22, 1.8));
      pts.push(new THREE.Vector2(0.12, 1.92));
      pts.push(new THREE.Vector2(0.09, 2.05));
      pts.push(new THREE.Vector2(0.09, 2.2));
      pts.push(new THREE.Vector2(0.12, 2.23));
      pts.push(new THREE.Vector2(0.13, 2.26));
      pts.push(new THREE.Vector2(0.13, 2.8));
      pts.push(new THREE.Vector2(0.11, 2.83));
      pts.push(new THREE.Vector2(0.0, 2.83));
    }
    return pts;
  }, [bottleStyle]);

  const liquidPoints = useMemo(() => {
    if (bottleStyle === "classic") {
      return [
        new THREE.Vector2(0.0, 0.02),
        new THREE.Vector2(0.34, 0.02),
        new THREE.Vector2(0.36, 0.06),
        new THREE.Vector2(0.37, 0.28),
        new THREE.Vector2(0.37, 0.85),
        new THREE.Vector2(0.35, 1.05),
        new THREE.Vector2(0.3, 1.3),
        new THREE.Vector2(0.2, 1.45),
        new THREE.Vector2(0.12, 1.58),
        new THREE.Vector2(0.08, 1.68),
        new THREE.Vector2(0.0, 1.68),
      ];
    }
    return [
      new THREE.Vector2(0.0, 0.02),
      new THREE.Vector2(0.26, 0.02),
      new THREE.Vector2(0.35, 0.1),
      new THREE.Vector2(0.38, 0.45),
      new THREE.Vector2(0.36, 0.9),
      new THREE.Vector2(0.28, 1.2),
      new THREE.Vector2(0.12, 1.35),
      new THREE.Vector2(0.0, 1.35),
    ];
  }, [bottleStyle]);

  const geometry = useMemo(() => new THREE.LatheGeometry(points, 64), [points]);
  const liquidGeometry = useMemo(() => new THREE.LatheGeometry(liquidPoints, 48), [liquidPoints]);

  // Slow self-rotation (Y axis only)
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + rotationOffset;
    meshRef.current.rotation.y = t * 0.25;
    if (liquidRef.current) liquidRef.current.rotation.y = t * 0.25;
  });

  const capHeight = bottleStyle === "tall" ? 0.58 : 0.48;
  const capY = bottleStyle === "tall" ? 2.55 : bottleStyle === "round" ? 2.3 : 2.32;

  return (
    <group position={position} scale={scale}>
      <mesh ref={liquidRef} geometry={liquidGeometry}>
        <meshStandardMaterial color={liquidColor} transparent opacity={0.75} roughness={0.1} metalness={0.0} />
      </mesh>
      <mesh ref={meshRef} geometry={geometry} castShadow>
        <MeshTransmissionMaterial
          color={glassColor}
          transmission={0.95}
          thickness={0.4}
          roughness={0.02}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.02}
          ior={1.5}
          backside={false}
          transparent={true}
          opacity={0.92}
          envMapIntensity={1.8}
        />
      </mesh>
      <mesh position={[0, capY, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.17, capHeight, 32]} />
        <meshStandardMaterial color="#C8A96E" metalness={0.95} roughness={0.08} envMapIntensity={2} />
      </mesh>
    </group>
  );
}

// ── Floating dust particles ────────────────────────────────────────
function Particles({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 9,
      z: (Math.random() - 0.5) * 8,
      speed: Math.random() * 0.25 + 0.08,
      offset: Math.random() * Math.PI * 2,
      size: Math.random() * 0.035 + 0.008,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.4,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.5,
        p.z + Math.sin(t * p.speed * 0.5 + p.offset * 2) * 0.2
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="#C4975A" opacity={0.35} transparent />
    </instancedMesh>
  );
}

// ── Parallax group — wraps all bottles and particles ──────────────
// Smoothly lerps toward mouse position each frame.
// `depthMultiplier` controls how strongly this layer reacts:
//   1.0 = base (center bottle), 1.4 = left (mid layer), 1.7 = right (back layer)
function ParallaxGroup({
  children,
  depthMultiplier = 1.0,
  lerpFactor = 0.045,
}: {
  children: React.ReactNode;
  depthMultiplier?: number;
  lerpFactor?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const current = useRef({ rx: 0, ry: 0, px: 0, py: 0 });

  useFrame(() => {
    if (!groupRef.current) return;
    const c = current.current;
    const m = depthMultiplier;

    const targetRy =  mouse.x * 0.18 * m;
    const targetRx = -mouse.y * 0.12 * m;
    const targetPx =  mouse.x * 0.25 * m;
    const targetPy = -mouse.y * 0.15 * m;

    c.ry += (targetRy - c.ry) * lerpFactor;
    c.rx += (targetRx - c.rx) * lerpFactor;
    c.px += (targetPx - c.px) * lerpFactor;
    c.py += (targetPy - c.py) * lerpFactor;

    groupRef.current.rotation.y = c.ry;
    groupRef.current.rotation.x = c.rx;
    groupRef.current.position.x = c.px;
    groupRef.current.position.y = c.py;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── Scene ─────────────────────────────────────────────────────────
function Scene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  return (
    <>
      <color attach="background" args={["#1A1A1A"]} />
      <fog attach="fog" args={["#1A1A1A", 12, 30]} />

      <ambientLight intensity={0.8} color="#f5e6d0" />
      <directionalLight position={[4, 8, 4]} intensity={2.5} color="#ffffff" castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={1.2} color="#C4975A" />
      <pointLight position={[0, 6, 4]} intensity={2} color="#ffffff" />
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#C4975A" />
      <Environment preset="studio" />

      {/* Particles — base layer, slow parallax */}
      <ParallaxGroup depthMultiplier={0.6} lerpFactor={0.03}>
        <Particles count={isMobile ? 40 : 80} />
      </ParallaxGroup>

      {/* Center bottle — 1× parallax (base) */}
      <ParallaxGroup depthMultiplier={1.0} lerpFactor={0.045}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
          <PerfumeBottle
            position={[0, -0.6, 0]}
            liquidColor="#C4975A"
            glassColor="#e8dfd0"
            scale={isMobile ? 0.52 : 0.68}
            rotationOffset={0}
            bottleStyle="classic"
          />
        </Float>
      </ParallaxGroup>

      {!isMobile && (
        <>
          {/* Left bottle — 1.4× parallax (mid depth) */}
          <ParallaxGroup depthMultiplier={1.4} lerpFactor={0.038}>
            <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
              <PerfumeBottle
                position={[-3.8, -0.4, -1.5]}
                liquidColor="#E8A0A8"
                glassColor="#f0e8e8"
                scale={0.46}
                rotationOffset={2.1}
                bottleStyle="round"
              />
            </Float>
          </ParallaxGroup>

          {/* Right bottle — 1.7× parallax (back layer) */}
          <ParallaxGroup depthMultiplier={1.7} lerpFactor={0.032}>
            <Float speed={1.7} rotationIntensity={0.35} floatIntensity={0.9}>
              <PerfumeBottle
                position={[3.8, -0.3, -2]}
                liquidColor="#3A2A1A"
                glassColor="#d8d0c8"
                scale={0.5}
                rotationOffset={4.2}
                bottleStyle="tall"
              />
            </Float>
          </ParallaxGroup>
        </>
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────
export default function FragranceCanvas() {
  // Attach a single mousemove listener to the document; update module-level mouse state
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 .. 1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    // Smoothly reset when mouse leaves the window
    const handleMouseLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Canvas
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 1, 9] }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Scene />
    </Canvas>
  );
}
