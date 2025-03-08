import PropTypes from 'prop-types';
import { Video } from 'reactjs-media';
import "./VideoPlayer.css"

const VideoPlayer = ({ pathToVideo }) => {
  return (
    <div className="video-container">
      <Video src={pathToVideo} controls />
    </div>
  )
}

VideoPlayer.propTypes = {
  pathToVideo: PropTypes.string.isRequired
};

export default VideoPlayer