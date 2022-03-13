import { useEffect, useState } from "react";
import useSound from "use-sound";
import IcRoundMusicNote from "./IcRoundMusicNote";
import IcRoundMusicOff from "./IcRoundMusicOff";

interface Props {}
const AudioPlayer: React.FC<Props> = ({}) => {
  const soundUrl = "music.mp3";
  const [play, exposedData] = useSound(soundUrl);
  const callback = () => {
    if (isPlaying) {
      exposedData.pause();
      setisPlaying(false);
    } else {
      play();
      setisPlaying(true);
    }
  };

  const [isPlaying, setisPlaying] = useState(false);

  return (
    <button onClick={callback}>
      {isPlaying ? <IcRoundMusicNote /> : <IcRoundMusicOff />}
    </button>
  );
};

export default AudioPlayer;
