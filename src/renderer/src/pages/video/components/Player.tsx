import { useContext, useEffect, useRef } from 'react'
import PlayerContext from '@renderer/store'
import Player, { Events } from 'xgplayer'

import { Empty } from 'antd'

import VideoJS from './Video'
import logoPng from '../../../../../../resources/icon.png'
import { VideoInfo } from '@common/types'

const PlayerContainer: React.FC = () => {
  const { state, dispath } = useContext(PlayerContext)
  const { videoList, currentPlayerVideo } = state
  const currentPlayerRef = useRef<any>({})

  const onReady = (player: Player) => {
    // 播放时间变化
    player.on(Events.TIME_UPDATE, (timeupdate: { currentTime: any; player: any }) => {
      const { currentTime } = timeupdate;
      const urlKey = Object.keys(currentPlayerRef.current)[0]
      currentPlayerRef.current = {
        [urlKey]: currentTime
      }
    })

    // 播放资源变化
    player.on(Events.URL_CHANGE, () => {
      if (currentPlayerRef.current) {
        const urlKey = Object.keys(currentPlayerRef.current)[0]
        const currentTime = Object.values(currentPlayerRef.current)[0]
      
        const newVideoList = videoList.map((item: VideoInfo) => {
          if (item.path === urlKey) {
            item.currentTime = currentTime
          }

          return item
        })
        dispath({ type: 'setVideoList', data: newVideoList })
      }
    })
  }

  useEffect(() => {
    if(currentPlayerVideo.path) {
      currentPlayerRef.current = {
        [currentPlayerVideo.path]: currentPlayerRef.current[currentPlayerVideo.path] || 0
      }
    }
  }, [currentPlayerVideo])

  return (
    <div className="video-player-wrapper">
      <div className="player-container">
        {!currentPlayerVideo.path ? (
          <div className="player-empty">
            <Empty image={logoPng} imageStyle={{ height: 60 }}>
              熊猫播放器
            </Empty>
          </div>
        ) : (
          <VideoJS sources={currentPlayerVideo} onReady={onReady} />
        )}
      </div>
    </div>
  )
}

export default PlayerContainer
