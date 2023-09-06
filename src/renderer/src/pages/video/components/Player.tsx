import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import { Empty } from 'antd'

import VideoJS from './Video';
import logoPng from '../../../../../../resources/icon.png'

const Player: React.FC = () => {
  const { state } = useContext(PlayerContext);
  const { currentPlayerVideo } = state;

  return (
    <div className="video-player-wrapper">
      <div className="player-container">
        {
          !currentPlayerVideo.path ?
            <div className='player-empty'>
              <Empty
                image={logoPng}
                imageStyle={{ height: 60 }}
              >
                熊猫播放器
              </Empty>
            </div> :
            <VideoJS sources={currentPlayerVideo} />
        }
      </div>
    </div>
  )
}

export default Player
