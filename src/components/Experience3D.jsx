import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei/core/ContactShadows'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import RoomScene from './RoomScene'

export default function Experience3D({
  activeId,
  inputState,
  nearbyId,
  onClearSelection,
  onHoverChange,
  onNearbyChange,
  onSelect,
  projects,
  selectedId,
}) {
  return (
    <Canvas
      className="room-canvas"
      dpr={[1, 1.8]}
      gl={{ antialias: true }}
      onPointerMissed={() => {
        onHoverChange(null)
        onClearSelection?.()
      }}
      shadows
    >
      <PerspectiveCamera makeDefault fov={38} position={[7.8, 6.9, 8.2]} />
      <color args={['#232838']} attach="background" />
      <fog args={['#232838', 12, 24]} attach="fog" />

      <ambientLight intensity={1.3} />
      <directionalLight
        castShadow
        color="#eef4ff"
        intensity={1.45}
        position={[6, 9, 5]}
        shadow-bias={-0.00015}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      <pointLight color="#dca7ff" intensity={1.5} position={[-2.25, 1.35, 0.55]} />
      <pointLight color="#cde7d9" intensity={1.25} position={[1.3, 2.4, -3.15]} />

      <RoomScene
        activeId={activeId}
        inputState={inputState}
        nearbyId={nearbyId}
        onHoverChange={onHoverChange}
        onNearbyChange={onNearbyChange}
        onSelect={onSelect}
        projects={projects}
        selectedId={selectedId}
      />

      <ContactShadows blur={2.6} far={7.8} opacity={0.36} position={[0, 0.02, 0]} scale={14} />
    </Canvas>
  )
}
