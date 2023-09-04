import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import { OpenFile } from '@renderer/components'

import { VideoInfo } from '@common/types'

const PlayerList: React.FC = () => {
  const { state } = useContext(PlayerContext);
  const { videoList } = state;

  return (
    <div className="video-live-list">
      <OpenFile />
      {
        videoList.map((item: VideoInfo) => {
          return (
            <div className="video-live-card active">
              <div className="card-inner">
                <img className="lazy cover-img" loading="eager" src={item.poster} />
                <div className="title-container">
                  <span className="title">{item.name}</span>
                  <span className="duration">{item.duration}</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PlayerList
