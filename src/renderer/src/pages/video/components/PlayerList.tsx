import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import {
  DeleteOutlined,
} from '@ant-design/icons';

import { OpenFile } from '@renderer/components'
import { VideoInfo } from '@common/types'

import clsx from 'className';
import { SET_STORE } from '@common/events/constants';

const PlayerList: React.FC = () => {
  const { state, dispath } = useContext(PlayerContext);
  const { videoList, currentPlayerVideo } = state;

  const onSetPlayerVideo = (item: VideoInfo) => {
    window.electron.ipcRenderer.send(SET_STORE, 'currentPlayerVideo', item)
    dispath({ type: 'setCurrentPlayerVideo', data: item })
  }

  const handleClick = (item: VideoInfo) => {
    if (currentPlayerVideo.path !== item.path) {
      onSetPlayerVideo(item)
    }
  }

  const onDelVideo = (item: VideoInfo) => {
    const newVideoList = videoList.filter((it) => it.path !== item.path);

    if (currentPlayerVideo.path === item.path) {
      onSetPlayerVideo({})
    }

    window.electron.ipcRenderer.send(SET_STORE, 'videoList', newVideoList)
    dispath({ type: 'setVideoList', data: newVideoList })
  }

  return (
    <div className="video-live">
      <OpenFile />
      <div className='video-live-list'>
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
                  <DeleteOutlined
                    className='del-btn'
                    style={{ fontSize: '16px', color: 'red' }}
                    onClick={(e) => {
                      e.stopPropagation()

                      onDelVideo(item)
                    }}
                  />
                  <div className='mask'></div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PlayerList
