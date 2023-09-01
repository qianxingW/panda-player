import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import videoImg from '../../../assets/video.png'

const PlayerList: React.FC = () => {
  const {state} = useContext(PlayerContext);
  
  return (
    <div className="video-live-list">
      <div className="video-live-card active">
        <div className="card-inner">
          <img  className="lazy cover-img" loading="eager" src={videoImg} />
          <div className="title-container">
            <span className="title">字节跳动「云原生系列Meetup」第3期：从资源上云到深度用云</span>
          </div>
        </div>
      </div>
      <div className="video-live-card">
        <div className="card-inner">
          <img  className="lazy cover-img" loading="eager" src={videoImg} />
          <div className="title-container">
            <span className="title">字节跳动「云原生系列Meetup」第3期：从资源上云到深度用云</span>
          </div>
          <div className='mask'></div>
        </div>
      </div>
    </div>
  )
}

export default PlayerList
