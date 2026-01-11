import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import { useRef, useState } from 'react';

function Phone() {
  const phoneRef = useRef<any>(null);

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      phoneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={phoneRef} position={[0.5, 0, 0]}>
      {/* iPhone-style body with flat edges */}
      <RoundedBox args={[2.2, 4.5, 0.18]} radius={0.2} smoothness={4}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Camera module (top) */}
      <RoundedBox args={[0.8, 0.15, 0.05]} radius={0.03} smoothness={4} position={[-0.5, 2, 0.12]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Camera lens 1 */}
      <mesh position={[-0.7, 2, 0.14]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Camera lens 2 */}
      <mesh position={[-0.3, 2, 0.14]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Screen with light blue */}
      <RoundedBox args={[2, 4.2, 0.02]} radius={0.15} smoothness={4} position={[0, 0, 0.1]}>
        <meshStandardMaterial 
          color="#E9F0F1" 
          emissive="#E9F0F1"
          emissiveIntensity={0.3}
        />
      </RoundedBox>
      
      {/* Dynamic Island */}
      <RoundedBox args={[0.35, 0.08, 0.01]} radius={0.04} smoothness={4} position={[0, 2.05, 0.11]}>
        <meshStandardMaterial color="#0a0a0a" />
      </RoundedBox>
      
      {/* Screen content - status bar */}
      <RoundedBox args={[1.8, 0.12, 0.01]} radius={0.02} smoothness={4} position={[0, 1.85, 0.11]}>
        <meshStandardMaterial color="#d0d0d0" emissive="#ffffff" emissiveIntensity={0.05} />
      </RoundedBox>
      
      {/* Screen content - header with green */}
      <RoundedBox args={[1.85, 0.35, 0.01]} radius={0.08} smoothness={4} position={[0, 1.4, 0.11]}>
        <meshStandardMaterial color="#a8baa5" emissive="#5e6c5b" emissiveIntensity={0.2} />
      </RoundedBox>
      
      {/* Screen content - large card with orange */}
      <RoundedBox args={[1.75, 1, 0.01]} radius={0.1} smoothness={4} position={[0, 0.5, 0.11]}>
        <meshStandardMaterial color="#ffc4a8" emissive="#ffa47d" emissiveIntensity={0.3} />
      </RoundedBox>
      
      {/* Screen content - small card 1 */}
      <RoundedBox args={[0.8, 0.7, 0.01]} radius={0.08} smoothness={4} position={[-0.45, -0.6, 0.11]}>
        <meshStandardMaterial color="#c8d3c6" emissive="#5e6c5b" emissiveIntensity={0.15} />
      </RoundedBox>
      
      {/* Screen content - small card 2 */}
      <RoundedBox args={[0.8, 0.7, 0.01]} radius={0.08} smoothness={4} position={[0.45, -0.6, 0.11]}>
        <meshStandardMaterial color="#ffd4be" emissive="#ffa47d" emissiveIntensity={0.15} />
      </RoundedBox>
      
      {/* Screen content - bottom navigation bar */}
      <RoundedBox args={[1.75, 0.5, 0.01]} radius={0.08} smoothness={4} position={[0, -1.5, 0.11]}>
        <meshStandardMaterial color="#e0e0e0" emissive="#ffffff" emissiveIntensity={0.1} />
      </RoundedBox>
      
      {/* Side buttons */}
      <RoundedBox args={[0.05, 0.3, 0.08]} radius={0.01} smoothness={4} position={[-1.12, 0.8, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </RoundedBox>
      
      <RoundedBox args={[0.05, 0.15, 0.08]} radius={0.01} smoothness={4} position={[1.12, 0.8, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </RoundedBox>
    </group>
  );
}

function FinancialCard() {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 0.15 + 0.5;
    }
  });

  return (
    <group
      ref={meshRef}
      position={[-4.5, 0.5, -1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main card body - white with soft shadow */}
      <RoundedBox args={[2.5, 3.5, 0.15]} radius={0.15} smoothness={4}>
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.05}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </RoundedBox>
      
      {/* Card details - lighter versions with light blue */}
      <RoundedBox args={[2, 0.4, 0.02]} radius={0.05} smoothness={4} position={[0, 1.2, 0.09]}>
        <meshStandardMaterial color="#d4e3e6" emissive="#E9F0F1" emissiveIntensity={0.3} />
      </RoundedBox>
      
      <RoundedBox args={[2.2, 0.7, 0.02]} radius={0.08} smoothness={4} position={[0, 0.3, 0.09]}>
        <meshStandardMaterial color="#ffd4be" emissive="#ffa47d" emissiveIntensity={0.3} />
      </RoundedBox>
      
      <RoundedBox args={[0.5, 0.5, 0.02]} radius={0.05} smoothness={4} position={[-0.5, -0.6, 0.09]}>
        <meshStandardMaterial color="#c8d3c6" emissive="#5e6c5b" emissiveIntensity={0.15} />
      </RoundedBox>
      
      <RoundedBox args={[0.5, 0.5, 0.02]} radius={0.05} smoothness={4} position={[0.5, -0.6, 0.09]}>
        <meshStandardMaterial color="#ffd4be" emissive="#ffa47d" emissiveIntensity={0.15} />
      </RoundedBox>
      
      <RoundedBox args={[2, 0.25, 0.02]} radius={0.05} smoothness={4} position={[0, -1.4, 0.09]}>
        <meshStandardMaterial color="#e0e0e0" emissive="#ffffff" emissiveIntensity={0.1} />
      </RoundedBox>
    </group>
  );
}

function FloatingCoins() {
  const coinsRef = useRef<any>(null);

  useFrame((state) => {
    if (coinsRef.current) {
      coinsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      coinsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 - 1;
    }
  });

  return (
    <group ref={coinsRef} position={[-3.5, 0, 2]}>
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.15, 32]} />
        <meshStandardMaterial 
          color="#ffe4d4" 
          metalness={0.6} 
          roughness={0.1}
          emissive="#ffa47d"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.15, 32]} />
        <meshStandardMaterial 
          color="#d4e3e6" 
          metalness={0.6} 
          roughness={0.1}
          emissive="#E9F0F1"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[-0.4, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.15, 32]} />
        <meshStandardMaterial 
          color="#d8e3d6" 
          metalness={0.6} 
          roughness={0.1}
          emissive="#5e6c5b"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function Chart() {
  const chartRef = useRef<any>(null);

  useFrame((state) => {
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={chartRef} position={[4.5, -0.5, -1]}>
      {/* Base platform - light blue */}
      <RoundedBox args={[2.2, 0.15, 1.6]} radius={0.05} smoothness={4} position={[0, -1.2, 0]}>
        <meshStandardMaterial 
          color="#d4e3e6" 
          emissive="#E9F0F1"
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Chart bars - rounded with glow */}
      <RoundedBox args={[0.4, 1.1, 0.4]} radius={0.08} smoothness={4} position={[-0.5, -0.7, 0]}>
        <meshStandardMaterial 
          color="#c8d3c6" 
          emissive="#5e6c5b"
          emissiveIntensity={0.25}
        />
      </RoundedBox>
      <RoundedBox args={[0.4, 1.9, 0.4]} radius={0.08} smoothness={4} position={[0, -0.3, 0]}>
        <meshStandardMaterial 
          color="#ffd4be" 
          emissive="#ffa47d"
          emissiveIntensity={0.35}
        />
      </RoundedBox>
      <RoundedBox args={[0.4, 2.7, 0.4]} radius={0.08} smoothness={4} position={[0.5, 0.1, 0]}>
        <meshStandardMaterial 
          color="#b8c9b5" 
          emissive="#5e6c5b"
          emissiveIntensity={0.3}
        />
      </RoundedBox>
    </group>
  );
}

export function ThreeDModel() {
  return (
    <div className="w-full h-full">
      <Canvas 
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        
        {/* Much brighter lighting setup */}
        <ambientLight intensity={2} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 5, 3]} intensity={1.5} color="#E9F0F1" />
        <pointLight position={[10, 0, 0]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, 0, 0]} intensity={1} color="#ffffff" />
        
        {/* Soft fill lights from below */}
        <pointLight position={[0, -5, 5]} intensity={1} color="#fafafa" />
        
        <Phone />
        <FinancialCard />
        <FloatingCoins />
        <Chart />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={6}
          maxDistance={18}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}