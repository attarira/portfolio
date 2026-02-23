"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════
   Simple hash-based noise for organic displacement
   ═══════════════════════════════════════════════════════ */
function hash(n: number): number {
  let x = Math.sin(n) * 43758.5453;
  return x - Math.floor(x);
}

function noise3D(x: number, y: number, z: number): number {
  const i = Math.floor(x) + Math.floor(y) * 157 + Math.floor(z) * 113;
  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);
  const fz = z - Math.floor(z);
  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);
  const uz = fz * fz * (3.0 - 2.0 * fz);

  const a = hash(i);
  const b = hash(i + 1);
  const c = hash(i + 157);
  const d = hash(i + 158);
  const e = hash(i + 113);
  const f = hash(i + 114);
  const g = hash(i + 270);
  const h = hash(i + 271);

  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  return lerp(
    lerp(lerp(a, b, ux), lerp(c, d, ux), uy),
    lerp(lerp(e, f, ux), lerp(g, h, ux), uy),
    uz
  ) * 2.0 - 1.0;
}

/* ═══════════════════════════════════════════════════════
   Configuration
   ═══════════════════════════════════════════════════════ */
const PARTICLE_COUNT = 18000;
const SPIRAL_ARMS = 6;
const MAX_RADIUS = 5.5;
const VOID_RADIUS = 0.15;
const DEPTH_RANGE = 1.8;

/* ═══════════════════════════════════════════════════════
   Color palette — vivid HDR teal → blue → violet → magenta
   Values pushed beyond sRGB for maximum additive-blend pop
   ═══════════════════════════════════════════════════════ */
const PALETTE = [
  new THREE.Color(0.0, 1.2, 0.95),  // electric teal (HDR)
  new THREE.Color(0.0, 1.0, 0.7),   // green-teal
  new THREE.Color(0.05, 0.85, 1.3), // vivid cyan-blue (HDR)
  new THREE.Color(0.15, 0.55, 1.4), // electric blue (HDR)
  new THREE.Color(0.45, 0.4, 1.3),  // bright indigo (HDR)
  new THREE.Color(0.65, 0.35, 1.2), // vivid violet (HDR)
  new THREE.Color(0.85, 0.3, 1.3),  // neon purple (HDR)
  new THREE.Color(1.1, 0.2, 1.0),   // hot magenta (HDR)
  new THREE.Color(1.2, 0.15, 0.6),  // neon pink (HDR)
];

function sampleColor(t: number): THREE.Color {
  const clamped = Math.max(0, Math.min(1, t));
  const idx = clamped * (PALETTE.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, PALETTE.length - 1);
  return new THREE.Color().lerpColors(PALETTE[lo], PALETTE[hi], idx - lo);
}

/* ═══════════════════════════════════════════════════════
   Mouse tracking
   ═══════════════════════════════════════════════════════ */
const mouse = { x: 0, y: 0, sx: 0, sy: 0 };

function MouseTracker() {
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / size.width - 0.5) * 2;
      mouse.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [size]);

  useFrame(() => {
    mouse.sx += (mouse.x - mouse.sx) * 0.03;
    mouse.sy += (mouse.y - mouse.sy) * 0.03;
  });

  return null;
}

/* ═══════════════════════════════════════════════════════
   Main Particle Vortex
   ═══════════════════════════════════════════════════════ */
function ParticleVortex() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes, meta } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const meta = new Float32Array(PARTICLE_COUNT * 3); // angle, radius, speed

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const arm = i % SPIRAL_ARMS;
      const armAngle = (arm / SPIRAL_ARMS) * Math.PI * 2;

      // Radius distribution: heavy concentration in the 0.5–3.0 range
      const t = Math.random();
      const radius = VOID_RADIUS + (MAX_RADIUS - VOID_RADIUS) * Math.pow(t, 0.45);

      // Tight spiral with arm-dependent winding
      const spiralWinds = 3.0;
      const angle =
        armAngle +
        (radius / MAX_RADIUS) * Math.PI * 2 * spiralWinds +
        (Math.random() - 0.5) * (0.4 + radius * 0.15);

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * DEPTH_RANGE * (0.3 + radius / MAX_RADIUS);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color: inner = bright teal, outer = purple/pink
      const colorT = Math.pow(radius / MAX_RADIUS, 0.65) + (Math.random() - 0.5) * 0.1;
      const col = sampleColor(colorT);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      // Inner particles slightly bigger and brighter for dense core
      const nearCore = 1.0 - Math.min(radius / 2.0, 1.0);
      sizes[i] = (1.5 + nearCore * 3.0 + Math.random() * 1.5) * (radius < 0.8 ? 1.8 : 1.0);

      // Speed: faster near center
      const speed = 0.6 + Math.random() * 0.8;
      meta[i * 3] = angle;
      meta[i * 3 + 1] = radius;
      meta[i * 3 + 2] = speed;
    }

    return { positions, colors, sizes, meta };
  }, []);

  /* Custom shader */
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = aColor;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          float dist = length(position.xy);

          // Core particles brighter, edge particles more visible
          float coreGlow = smoothstep(4.0, 0.15, dist);
          float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + dist * 3.0 + position.z * 2.0);
          vAlpha = 0.25 + coreGlow * 0.85 * (0.65 + pulse * 0.35);
          vAlpha = clamp(vAlpha, 0.12, 1.0);

          gl_PointSize = aSize * uPixelRatio * (180.0 / -mvPos.z);
          gl_PointSize = clamp(gl_PointSize, 0.8, 14.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;

          float core = 1.0 - smoothstep(0.0, 0.10, d);
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          float alpha = (core * 1.2 + glow * 0.45) * vAlpha;

          // Vivid HDR color boost on core
          vec3 finalColor = vColor * (1.2 + core * 1.8);
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const colorAttr = pointsRef.current.geometry.attributes.aColor as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const colorArray = colorAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let angle = meta[i * 3];
      let radius = meta[i * 3 + 1];
      const speed = meta[i * 3 + 2];

      // Angular velocity: much faster near core
      const angularSpeed = 0.12 * speed * (1.0 + 4.0 / (radius * radius + 0.3));
      angle += angularSpeed * 0.016;
      meta[i * 3] = angle;

      // Gentle inward pull
      radius -= 0.008 * 0.016 * (1.0 / (radius + 0.2));
      if (radius < VOID_RADIUS * 0.3) {
        // Respawn at outer edge
        radius = MAX_RADIUS * (0.75 + Math.random() * 0.25);
        angle = Math.random() * Math.PI * 2;
        meta[i * 3] = angle;
      }
      meta[i * 3 + 1] = radius;

      // Base spiral position
      let x = Math.cos(angle) * radius;
      let y = Math.sin(angle) * radius;
      let z = posArray[i * 3 + 2];

      // Noise displacement for organic feel
      const noiseAmp = 0.15 + radius * 0.04;
      const ns = 0.4;
      const nt = time * 0.08;
      x += noise3D(x * ns + nt, y * ns, z * ns) * noiseAmp;
      y += noise3D(x * ns, y * ns + nt, z * ns + 50) * noiseAmp;
      z += noise3D(x * ns + 100, y * ns, z * ns + nt * 0.5) * noiseAmp * 0.2;

      // Mouse parallax influence (stronger near center)
      const mouseInf = Math.max(0, 1.0 - radius / 4.0) * 0.35;
      x += mouse.sx * mouseInf;
      y += mouse.sy * mouseInf;

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      // Subtle color shift over time
      const colorT = Math.pow(radius / MAX_RADIUS, 0.65);
      const shift = Math.sin(time * 0.2 + i * 0.005) * 0.08;
      const col = sampleColor(Math.max(0, Math.min(1, colorT + shift)));
      colorArray[i * 3] = col.r;
      colorArray[i * 3 + 1] = col.g;
      colorArray[i * 3 + 2] = col.b;
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    shaderMaterial.uniforms.uTime.value = time;

    // Slow ambient rotation of entire vortex
    pointsRef.current.rotation.z = time * 0.015;
  });

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
    </points>
  );
}

/* ═══════════════════════════════════════════════════════
   Bright streamer particles — fast-moving bright dots
   on orbital paths for the "shooting star" effect
   ═══════════════════════════════════════════════════════ */
const STREAMER_COUNT = 200;

function Streamers() {
  const pointsRef = useRef<THREE.Points>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(STREAMER_COUNT * 3);
    const colors = new Float32Array(STREAMER_COUNT * 3);
    const sizes = new Float32Array(STREAMER_COUNT);
    const angles = new Float32Array(STREAMER_COUNT);
    const radii = new Float32Array(STREAMER_COUNT);
    const speeds = new Float32Array(STREAMER_COUNT);

    for (let i = 0; i < STREAMER_COUNT; i++) {
      const r = 0.5 + Math.random() * 5.0;
      const a = Math.random() * Math.PI * 2;
      radii[i] = r;
      angles[i] = a;
      speeds[i] = 2.0 + Math.random() * 4.0;
      sizes[i] = 3 + Math.random() * 5;

      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

      const col = sampleColor(Math.random() * 0.6);
      colors[i * 3] = col.r * 2.5;
      colors[i * 3 + 1] = col.g * 2.5;
      colors[i * 3 + 2] = col.b * 2.5;
    }
    return { positions, colors, sizes, angles, radii, speeds };
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vColor = aColor;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio * (120.0 / -mvPos.z);
          gl_PointSize = clamp(gl_PointSize, 1.0, 18.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          float core = 1.0 - smoothstep(0.0, 0.08, d);
          float alpha = glow * 0.5 + core * 0.5;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < STREAMER_COUNT; i++) {
      const angularSpeed = data.speeds[i] * (1.0 / (data.radii[i] + 0.3)) * 0.025;
      data.angles[i] += angularSpeed;
      posArray[i * 3] = Math.cos(data.angles[i]) * data.radii[i];
      posArray[i * 3 + 1] = Math.sin(data.angles[i]) * data.radii[i];
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
      </bufferGeometry>
    </points>
  );
}

/* ═══════════════════════════════════════════════════════
   Radial connection lines — faint lines from particles
   toward center for the web/network look
   ═══════════════════════════════════════════════════════ */
const LINE_COUNT = 80;

function RadialLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors, meta } = useMemo(() => {
    const positions = new Float32Array(LINE_COUNT * 6); // 2 vertices per line
    const colors = new Float32Array(LINE_COUNT * 6);
    const meta = new Float32Array(LINE_COUNT * 3); // angle, radius, speed

    for (let i = 0; i < LINE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const innerR = 0.4 + Math.random() * 1.0;
      const outerR = innerR + 1.0 + Math.random() * 3.0;
      const speed = 0.3 + Math.random() * 0.5;

      // Inner vertex
      positions[i * 6] = Math.cos(angle) * innerR;
      positions[i * 6 + 1] = Math.sin(angle) * innerR;
      positions[i * 6 + 2] = (Math.random() - 0.5) * 0.5;
      // Outer vertex
      positions[i * 6 + 3] = Math.cos(angle) * outerR;
      positions[i * 6 + 4] = Math.sin(angle) * outerR;
      positions[i * 6 + 5] = (Math.random() - 0.5) * 0.5;

      const col = sampleColor(Math.random() * 0.5);
      colors[i * 6] = col.r;
      colors[i * 6 + 1] = col.g;
      colors[i * 6 + 2] = col.b;
      colors[i * 6 + 3] = col.r * 0.3;
      colors[i * 6 + 4] = col.g * 0.3;
      colors[i * 6 + 5] = col.b * 0.3;

      meta[i * 3] = angle;
      meta[i * 3 + 1] = innerR;
      meta[i * 3 + 2] = speed;
    }

    return { positions, colors, meta };
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < LINE_COUNT; i++) {
      const speed = meta[i * 3 + 2];
      meta[i * 3] += speed * 0.008;
      const angle = meta[i * 3];
      const innerR = meta[i * 3 + 1];
      const outerR = innerR + 1.5 + Math.sin(time * 0.5 + i) * 0.5;

      posArray[i * 6] = Math.cos(angle) * innerR;
      posArray[i * 6 + 1] = Math.sin(angle) * innerR;
      posArray[i * 6 + 3] = Math.cos(angle) * outerR;
      posArray[i * 6 + 4] = Math.sin(angle) * outerR;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* ═══════════════════════════════════════════════════════
   Camera — subtle parallax
   ═══════════════════════════════════════════════════════ */
function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.sx * 0.6 - camera.position.x) * 0.012;
    camera.position.y += (mouse.sy * 0.4 - camera.position.y) * 0.012;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════
   Group that drifts the entire vortex toward the cursor
   ═══════════════════════════════════════════════════════ */
function VortexGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Convert mouse NDC (-1..1) to world-space target, clamped so vortex stays mostly centered
    const targetX = mouse.sx * 2.5;
    const targetY = mouse.sy * 1.8;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.008;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.008;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ═══════════════════════════════════════════════════════
   Scene
   ═══════════════════════════════════════════════════════ */
function Scene() {
  return (
    <>
      <MouseTracker />
      <CameraRig />
      <VortexGroup>
        <ParticleVortex />
        <Streamers />
        <RadialLines />
      </VortexGroup>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Exported component
   ═══════════════════════════════════════════════════════ */
export default function VortexField() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#000000",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#000000"]} />
        <Scene />
      </Canvas>
    </div>
  );
}
