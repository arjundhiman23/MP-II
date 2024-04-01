import { useEffect, useRef, useState } from "react";
import "./CustomPlayer.css";
import {motion} from "framer-motion"
import { FaPlay, FaPause } from 'react-icons/fa';
import next from "../../assets/next-button.svg"
import prev from "../../assets/prev-button.svg"


export default function CustomPlayer() {
  const MUSIC_PATH_TEMP =
    "C:\\Users\\Rohan\\Downloads\\Future, Metro Boomin - Like That (Official Audio).mp3";
  const audioElem = useRef<HTMLAudioElement>(null);

  //Important variables needed to be kept in useState
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.1);

  //Updating the currentTime to be consumed while rendering the seekbar
  useEffect(() => {


    if(audioElem.current){
      audioElem.current.volume = volume;
    }

    function updateTime(){
      if(audioElem.current){
        setCurrentTime(audioElem.current.currentTime)
      }
    }

    function updateDuration(){
      if(audioElem.current){
        setDuration(audioElem.current.duration)
      }
    }

    function updateVolume(){
      if(audioElem.current){
        setVolume(audioElem.current.volume)
      }
    }

    audioElem.current?.addEventListener('timeupdate', updateTime);
    audioElem.current?.addEventListener('loadedmetadata', updateDuration);
    audioElem.current?.addEventListener('volumechange', updateVolume);

    return () => {
      audioElem.current?.removeEventListener('timeupdate', updateTime);
      audioElem.current?.removeEventListener('loadedmetadata', updateDuration);
      audioElem.current?.removeEventListener('volumechange', updateVolume);
    };

  }, []);

  //===========Working===============
  function handleMusicToggle() {
    if (isPlaying) {
      audioElem.current?.pause();
    } else {
      audioElem.current?.play();
    }
    setPlaying(!isPlaying);
  }

  const handleSeek = (e:React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if(audioElem.current){
      audioElem.current.currentTime = seekTime;
    }
  };

  const handleVolume = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const seekTime = parseFloat(e.target.value);
    setVolume(seekTime);
    console.log(audioElem.current?.volume)
    if(audioElem.current){
      audioElem.current.volume = volume
    }
  }

  function convertToHumanReadable(time:number){
    const minutes = Math.floor(time /60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds}`
  }

  //=====To=be=implemented==========
  function handleRepeat() {}
  function handleNext() {}
  function handlePrev() {}
  


  return (
    <motion.div className="custom-player" initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0,
      ease: [0, 0.71, 0.2, 1.01]
    }}>
          
        <p onPointerDownCapture={(e) => e.stopPropagation()}>Audio Name Here</p>
        <audio ref={audioElem} src={MUSIC_PATH_TEMP}></audio>
      
        <motion.div>
        <input  className="seekbar" onPointerDownCapture={(e) => e.stopPropagation()} type="range" min={0} max={duration} value={currentTime} onChange={handleSeek}></input>
        </motion.div>

        <div className="timestamp">
        <div className="current-time"> {convertToHumanReadable(currentTime)}</div>
        <div className="duration-time"> {convertToHumanReadable(duration)}</div>
        </div>

        <div className="control">
                <motion.button className="prev-next-buttons" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                  <img className="prev-butt" src={prev}></img>
                </motion.button>
                <div onPointerDownCapture={(e) => e.stopPropagation()} className="playpause-button"onClick={handleMusicToggle} style={{ cursor: 'pointer' }}>
                  <motion.div 
                    initial={false}
                    animate={{ scale: isPlaying ? 0.9 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isPlaying ? <FaPause size={32} /> : <FaPlay size={32} />}
                  </motion.div>
                </div>
                <motion.button className="prev-next-buttons" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                  <img className="next-butt" src={next}></img>
                </motion.button>
        </div>

            <motion.div onPointerDownCapture={(e) => e.stopPropagation()} className="vol-div" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <input type="range" min={0.0} max={1.0} step="0.01" value={volume} onChange={handleVolume} className="vol-bar"></input>
            </motion.div>
    </motion.div>
  );
}