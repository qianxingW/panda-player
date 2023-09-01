import React from 'react'
import PlayerList from './components/PlayerList'
import Player from './components/Player'

import '../../assets/video.scss'

const VideoPlayer: React.FC = () => {
  return (
    <div className='video-container'>
      <Player />
      <PlayerList />
    </div>
  )
}

export default VideoPlayer
