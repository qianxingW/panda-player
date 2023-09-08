import React, { useEffect } from 'react'
import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import Player from './components/Player'
import PlayerList from './components/PlayerList'

import '../../assets/music.scss'

const MusicPlayer: React.FC = () => {
  const { state, dispath } = useContext(PlayerContext);
  useEffect(() => {
    
  }, [state])

  return (
    <div className='video-container'>
      <Player />
      <PlayerList />
    </div>
  )
}

export default MusicPlayer
