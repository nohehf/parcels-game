import type { NextPage } from "next";
import styles from "../styles/clouds.module.css";

import Grid from "../components/Grid";
import ParcelMenu from "../components/ParcelMenu";
const Home: NextPage = () => {
  return (
    <div className={styles.cloud}>
      <div className="flex items-center w-full h-full justify-center">
        <div className="flex justify-center p-1 rounded-xl bg-white bg-opacity-50 backdrop-blur-md">
          <Grid />
        </div>
        <div className="w-1/2">
          <ParcelMenu isOwner={false} posX={0} posY={0} />
        </div>
      </div>
    </div>
  );
};

export default Home;
