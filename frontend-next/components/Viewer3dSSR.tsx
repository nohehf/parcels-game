import TwemojiCoin from "./TwemojiCoin";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model(props: { file: string }) {
  const { scene } = useGLTF(props.file);
  return <primitive object={scene} />;
}

interface Props {
  file: string;
}

const Viewer3dSSR: React.FC<Props> = ({ file }) => {
  return (
    <Canvas pixelRatio={[1, 2]} camera={{ position: [-10, 15, 15], fov: 50 }}>
      {
      // <ambientLight intensity={0.5} />
      // <spotLight intensity={0.8} position={[5, 20, 20]} />
      }
      {
      <pointLight intensity={1.3} position={[10, 10, 10]} />
      }
      <hemisphereLight />
      <Suspense fallback={null}>
        <Model file={file} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Viewer3dSSR;
