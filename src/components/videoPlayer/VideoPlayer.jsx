import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from 'lucide-react';
import "./VideoPlayer.css";

// Use a function to get token, rather than global variable
const getToken = () => localStorage.getItem("user-token");

const VideoPlayer = ({courseId, videoId, onLoadStart, onLoadedData, onError}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const controlsTimeoutRef = useRef();

  // Generate the video URL
  const videoUrl = `https://backend-ortho-site-api-66d73427bd8c.herokuapp.com/api/v1.0/vidoes/stream?token=${getToken()}&course_id=${courseId}&video_id=${videoId}`;

  // Reset states when video source changes
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(true);
    setError(null);
    onLoadStart?.();
    
    console.log('Video stream URL set:', videoUrl);

    // Return cleanup function (no need to revoke anything)
    return () => {};
  }, [courseId, videoId, videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      onLoadedData?.();
    };

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isDragging, onLoadedData]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (videoRef.current) {
            const newTime = Math.max(0, videoRef.current.currentTime - 5);
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (videoRef.current) {
            const newTime = Math.min(duration, videoRef.current.currentTime + 5);
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          adjustVolume(-0.1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [duration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(error => {
        console.error('Play error:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const adjustVolume = (delta) => {
    setVolume(prev => Math.max(0, Math.min(1, prev + delta)));
    setIsMuted(false);
  };

  const updateVideoTime = (clientX) => {
    const progressBar = progressRef.current;
    if (!progressBar || !videoRef.current) return;

    const rect = progressBar.getBoundingClientRect();
    const position = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = position * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    const handleMouseMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        const rect = progressRef.current.getBoundingClientRect();
        const position = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = position * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    };

    const handleMouseUp = (e) => {
      e.preventDefault();
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Initial update
    handleMouseMove(e);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDoubleClick = () => {
    toggleFullscreen();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="video-container"
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
    >
      {isLoading && !error && (
        <div className="video-skeleton">
          <div className="skeleton-title"></div>
          <div className="skeleton-thumbnail"></div>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {videoUrl && (
        <>
          <video
            ref={videoRef}
            key={videoUrl}
            src={videoUrl}
            className="video-player"
            onClick={togglePlay}
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            controlsList="nodownload"
            onError={(e) => {
              console.error('Video error:', e, videoRef.current?.error);
              setError('Error loading video');
              setIsLoading(false);
              onError?.();
            }}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsBuffering(false);
              setIsLoading(false);
            }}
          />
          {isBuffering && isPlaying && (
            <div className="buffering-indicator">
              <div className="spinner"></div>
              <span>Loading...</span>
            </div>
          )}
          {!isPlaying && showControls && (
            <div className="play-overlay" onClick={togglePlay}>
              <Play className="overlay-play-icon" />
            </div>
          )}
        </>
      )}

      {showControls && videoUrl && (
        <div className={`controls-container ${!showControls ? 'hidden' : ''}`}>
          <div className="controls-wrapper">
            <div
              ref={progressRef}
              className="progress-bar"
              onClick={handleProgressClick}
              onMouseDown={handleMouseDown}
              onMouseMove={(e) => isDragging && updateVideoTime(e.clientX)}
            >
              <div
                className="progress-fill"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div 
                className={`progress-handle ${isDragging ? 'dragging' : ''}`}
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
              {isDragging && (
                <div 
                  className="time-tooltip"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                >
                  {formatTime(currentTime)}
                </div>
              )}
            </div>

            <div className="controls">
              <div className="left-controls">
                <button
                  onClick={togglePlay}
                  className="control-button"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <div className="volume-control">
                  <button
                    onClick={toggleMute}
                    className="control-button"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setVolume(value);
                      setIsMuted(value === 0);
                    }}
                    className="volume-slider"
                  />
                </div>

                <span className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                onClick={toggleFullscreen}
                className="control-button"
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;