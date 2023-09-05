import { useContext, useRef } from 'react'
import PlayerContext from '@renderer/store'

import VideoJS from './Video';

const Player: React.FC = () => {
  const { state } = useContext(PlayerContext);
  const { currentPlayerVideo } = state;

  const playerRef = useRef<any>(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <div className="video-player-wrapper">
      <div className="player-container">
        {currentPlayerVideo.path && <VideoJS sources={currentPlayerVideo} onReady={handlePlayerReady} />}
      </div>
    </div>
  )
}

export default Player
