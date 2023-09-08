import { useContext } from 'react'
import PlayerContext from '@renderer/store'
import { Empty } from 'antd'

import logoPng from '../../../../../../resources/icon.png'
import VideoJS from '@renderer/pages/video/components/Video'

const PlayerContainer: React.FC = () => {
  const { state, dispath } = useContext(PlayerContext)
  const { currentPlayerMusic } = state

  return (
    <div className="video-player-wrapper">
      <div className="player-container">
        {!currentPlayerMusic.path ? (
          <div className="player-empty">
            <Empty image={logoPng} imageStyle={{ height: 60 }}>
              熊猫播放器
            </Empty>
          </div>
        ) : (
          <VideoJS sources={currentPlayerMusic} onReady={() => {}}/>
        )}
      </div>
    </div>
  )
}

export default PlayerContainer
