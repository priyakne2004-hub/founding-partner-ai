import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

const BrainNode = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime + delay;
      meshRef.current.scale.setScalar(0.15 + Math.sin(t * 2) * 0.03);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.15, 16, 16]} position={position}>
      <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={0.5} />
    </Sphere>
  );
};

const NeuralNetwork = () => {
  const nodes: [number, number, number][] = [
    [0, 0, 0],
    [0.5, 0.5, 0.2],
    [-0.5, 0.5, -0.2],
    [0.5, -0.5, -0.2],
    [-0.5, -0.5, 0.2],
    [0, 0.7, 0],
    [0, -0.7, 0],
  ];

  const connections: Array<[[number, number, number], [number, number, number]]> = [
    [nodes[0], nodes[1]],
    [nodes[0], nodes[2]],
    [nodes[0], nodes[3]],
    [nodes[0], nodes[4]],
    [nodes[1], nodes[5]],
    [nodes[2], nodes[5]],
    [nodes[3], nodes[6]],
    [nodes[4], nodes[6]],
  ];

  return (
    <group>
      {nodes.map((pos, i) => (
        <BrainNode key={i} position={pos} delay={i * 0.2} />
      ))}
      {connections.map((points, i) => (
        <Line key={i} points={points} color="#60a5fa" lineWidth={1} opacity={0.3} transparent />
      ))}
    </group>
  );
};

const FloatingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox ref={meshRef} args={[0.4, 0.4, 0.4]} radius={0.05} position={position}>
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </RoundedBox>
    </Float>
  );
};

const OrbitRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[radius, 0.01, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </Torus>
      <Sphere args={[0.05, 16, 16]} position={[radius, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
};

const DashboardScene3D = () => {
  return (
    <div className="absolute top-0 right-0 w-1/3 h-64 opacity-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#60a5fa" />
        
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
          <NeuralNetwork />
        </Float>
        
        <OrbitRing radius={1.2} speed={0.3} color="#3b82f6" />
        <OrbitRing radius={1.5} speed={-0.2} color="#60a5fa" />
        
        <FloatingCube position={[1.5, 1, -1]} />
        <FloatingCube position={[-1.5, -1, -1]} />
      </Canvas>
    </div>
  );
};

export default DashboardScene3D;
