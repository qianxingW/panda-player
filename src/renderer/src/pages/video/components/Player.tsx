import { useContext, useRef } from 'react'
import PlayerContext from '@renderer/store'

import VideoJS from './Video';

const Player: React.FC = () => {
  const { state } = useContext(PlayerContext);
  const { currentPlayerVideo } = state;

  return (
    <div className="video-player-wrapper">
      <div className="player-container">
        {currentPlayerVideo.path && <VideoJS sources={currentPlayerVideo} />}
      </div>
    </div>
  )
}

export default Player
