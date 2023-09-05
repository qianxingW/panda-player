import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import { OpenFile } from '@renderer/components'

import { VideoInfo } from '@common/types'

import clsx from 'className';
import { SET_STORE } from '@common/events/constants';

const PlayerList: React.FC = () => {
  const { state, dispath } = useContext(PlayerContext);
  const { videoList, currentPlayerVideo } = state;

  const handleClick = (item: VideoInfo) => {
    if (currentPlayerVideo.path !== item.path) {
      window.electron.ipcRenderer.send(SET_STORE, 'currentPlayerVideo', item)
      dispath({ type: 'setCurrentPlayerVideo', data: item })
    }
  }

  return (
    <div className="video-live-list">
      <OpenFile />
      {
        videoList.map((item: VideoInfo) => {
          return (
            <div
              key={item.path}
              className={clsx("video-live-card", {
                active: item.path === currentPlayerVideo.path
              })}
              onClick={() => handleClick(item)}
            >
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
