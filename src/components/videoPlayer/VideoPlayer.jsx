import { useRef, useState } from "react";
import { Video } from 'reactjs-media';
import "./VideoPlayer.css"

import { MdPlayArrow } from "react-icons/md";
import { MdOutlinePause } from "react-icons/md";
import { MdVolumeUp } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";

const VideoPlayer = ({ pathToVideo }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleProgress = () => {
    const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progressValue);
  };

  const seekVideo = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const toggleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="video-container" style={{ textAlign: "center" }}>
      <Video src={pathToVideo} poster='' />
      {/* <video
        controlsList="nodownload"
        ref={videoRef}
        src={pathToVideo}
        onTimeUpdate={handleProgress}
        style={{ width: "100%", borderRadius: "8px" }}
      ></video> */}

      {/* <div className="controls flex" style={{ marginTop: "10px" }}>
        <button onClick={togglePlay} className="play-pause-btn">{isPlaying ? <MdOutlinePause /> : <MdPlayArrow />}</button>

        <div className="flex"> <MdVolumeUp className="vol-icon"/>  <input className="vol-input" type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} /> </div>

        <input type="range" min="0" max="100" value={progress} onChange={seekVideo} className="seekVideo-icon"/>
        <MdFullscreen onClick={toggleFullscreen} className="fullscreen-icon"/>
      </div> */}

    </div>
  )
}

export default VideoPlayer


// when you click on the new video the seekVideo input starts in the middle of bar (and thats ok)
// the play pause btn dosent resets to "paused" after the video has finished playing 