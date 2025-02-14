import { useRef, useState } from "react";
import "./VideoPlayer.css"
import VideoFile from "../../assets/video.mp4"

const VideoPlayer = () => {
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
      <video
        ref={videoRef}
        src={VideoFile}
        onTimeUpdate={handleProgress}
        style={{ width: "100%", maxWidth: "800px", borderRadius: "8px" }}
      ></video>
      <div className="controls" style={{ marginTop: "10px" }}>
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <input type="range" min="0" max="100" value={progress} onChange={seekVideo} />
        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
        <button onClick={toggleFullscreen}>Fullscreen</button>
      </div>
    </div>
  )
}

export default VideoPlayer
