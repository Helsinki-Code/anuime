import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Box3, Vector3 } from "three";
import type { Group } from "three";

import { worlds } from "@/lib/anuime/worlds";
import type { WorldId, WorldTheme } from "@/lib/anuime/worlds";

interface CanvasProps {
  worldId: WorldId;
  theme: WorldTheme;
  animate: boolean;
  quality: "low" | "high";
  onFailure: () => void;
  onSlow: () => void;
}

function GraphicsLifecycle({
  onFailure,
  onSlow,
  animate,
}: Pick<CanvasProps, "onFailure" | "onSlow" | "animate">) {
  const gl = useThree((state) => state.gl);
  const sample = useRef({ frames: 0, elapsed: 0, slowWindows: 0 });
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useFrame((_, delta) => {
    if (!animate || delta > 0.5) return;
    const current = sample.current;
    current.frames++;
    current.elapsed += delta;
    if (current.elapsed < 3) return;
    current.slowWindows = current.frames / current.elapsed < 30 ? current.slowWindows + 1 : 0;
    if (current.slowWindows >= 2) onSlow();
    current.frames = 0;
    current.elapsed = 0;
  });
  return null;
}

function Block({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color={color} roughness={0.65} />
    </mesh>
  );
}

function CharacterModel({ worldId }: { worldId: WorldId }) {
  const { scene } = useGLTF(worlds[worldId].assets.character.source.src);
  const bounds = new Box3().setFromObject(scene);
  const size = bounds.getSize(new Vector3());
  const largestDimension = Math.max(size.x, size.y, size.z, 0.01);
  const scale = 3.6 / largestDimension;
  return <primitive object={scene} position={[0, -2.35, 0.6]} scale={scale} />;
}

/** Modular environment blocking. Detailed art assets are a separate production gate. */
function Environment({
  worldId,
  theme,
  animate,
}: Pick<CanvasProps, "worldId" | "theme" | "animate">) {
  const world = worlds[worldId];
  const colors = world.palettes[theme];
  const moving = useRef<Group>(null);
  const phase = useRef(0);
  useFrame((_, delta) => {
    if (!animate || !moving.current) return;
    phase.current += Math.min(delta, 0.05);
    moving.current.rotation.y = Math.sin(phase.current * 0.12) * 0.035;
  });
  return (
    <>
      <color attach="background" args={[colors.sky]} />
      <fog attach="fog" args={[colors.sky, 12, 36]} />
      <hemisphereLight
        args={[world.lighting[theme].key, colors.structure, world.lighting[theme].ambient]}
      />
      <directionalLight position={[4, 9, 6]} color={world.lighting[theme].key} intensity={2} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color={colors.surface} roughness={0.45} metalness={0.2} />
      </mesh>
      {worldId === "kira" && (
        <>
          {Array.from({ length: 19 }, (_, i) => {
            const height = 2 + ((i * 7) % 9);
            return (
              <group key={i}>
                <Block
                  position={[(i - 9) * 1.65, height / 2 - 2.5, -12 - (i % 3) * 2]}
                  scale={[1.2, height, 1.4]}
                  color={i % 2 ? colors.structure : colors.surface}
                />
                <Block
                  position={[(i - 9) * 1.65, height / 2, -11.25 - (i % 3) * 2]}
                  scale={[0.05, height * 0.6, 0.025]}
                  color={colors.secondary}
                />
              </group>
            );
          })}
          <Block position={[0, -1.1, -3]} scale={[26, 0.08, 0.08]} color={colors.structure} />
          {[-10, -6, -2, 2, 6, 10].map((x) => (
            <Block
              key={x}
              position={[x, -1.8, -3]}
              scale={[0.08, 1.4, 0.08]}
              color={colors.structure}
            />
          ))}
        </>
      )}
      {worldId === "mochi" && (
        <>
          <mesh position={[5, 4, -13]}>
            <sphereGeometry args={[2, 32, 24]} />
            <meshBasicMaterial color={colors.secondary} />
          </mesh>
          <mesh position={[3, 0.3, -5]}>
            <torusGeometry args={[3.4, 0.18, 12, 48, Math.PI]} />
            <meshStandardMaterial color={colors.structure} />
          </mesh>
          {[-0.4, 6.4].map((x) => (
            <Block
              key={x}
              position={[x, -1.1, -5]}
              scale={[0.36, 2.8, 0.36]}
              color={colors.structure}
            />
          ))}
          <Block position={[-5, -1.1, -2]} scale={[5, 0.18, 2]} color={colors.structure} />
          <group ref={moving}>
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh key={i} position={[i * 2 - 4, 2.5 + Math.sin(i), -5]}>
                <octahedronGeometry args={[0.16, 0]} />
                <meshStandardMaterial color={colors.accent} />
              </mesh>
            ))}
          </group>
        </>
      )}
      {worldId === "atlas" && (
        <>
          {[-9, -4, 1, 6, 11].map((x) => (
            <group key={x}>
              <Block position={[x, 1.7, -8]} scale={[0.3, 8.4, 0.5]} color={colors.structure} />
              <Block position={[x + 2.4, 5.8, -8]} scale={[5, 0.3, 0.5]} color={colors.structure} />
              <Block position={[x + 2.4, 1, -11]} scale={[3.5, 3, 2]} color={colors.surface} />
              <Block
                position={[x + 2.4, 1.8, -9.95]}
                scale={[2.8, 0.08, 0.03]}
                color={colors.accent}
              />
            </group>
          ))}
          <group ref={moving} position={[5, 0, -4]}>
            <mesh>
              <torusGeometry args={[1.5, 0.24, 8, 24]} />
              <meshStandardMaterial color={colors.structure} metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        </>
      )}
    </>
  );
}

export default function WorldCanvas(props: CanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 11], fov: 42 }}
      dpr={props.quality === "low" ? 1 : [1, 1.5]}
      frameloop={props.animate ? "always" : "demand"}
      gl={{ alpha: false, antialias: props.quality === "high", powerPreference: "low-power" }}
      fallback={null}
    >
      <GraphicsLifecycle
        onFailure={props.onFailure}
        onSlow={props.onSlow}
        animate={props.animate}
      />
      <Environment worldId={props.worldId} theme={props.theme} animate={props.animate} />
      {props.quality === "high" ? <CharacterModel worldId={props.worldId} /> : null}
    </Canvas>
  );
}
