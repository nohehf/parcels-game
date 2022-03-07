import dynamic from "next/dynamic";

const Viewer3dSSR = dynamic(() => import("../components/Viewer3dSSR"), {
  ssr: false,
});

const Viewer3dNoSSR: React.FC<{ file: string }> = ({ file }) => {
  return <Viewer3dSSR file={file}></Viewer3dSSR>;
};

export default Viewer3dNoSSR;
