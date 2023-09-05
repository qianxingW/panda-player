import React, { useEffect } from 'react'
import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import { cloneDeep } from 'lodash'

import PlayerList from './components/PlayerList'
import Player from './components/Player'

import { GET_STORE, SELECT_VIDEO_FILE, SET_STORE } from '@common/events/constants'
import { getVideoInfo } from '@renderer/utils/_info'

import '../../assets/video.scss'
import { VideoFile, VideoInfo } from '@common/types'

const VideoPlayer: React.FC = () => {
  const { state, dispath } = useContext(PlayerContext);
  const { videoList } = state;

  useEffect(() => {
    window.electron.ipcRenderer.invoke(GET_STORE, 'videoList').then((videoLists: VideoInfo[]) => {
      dispath({type: 'setVideoList', data: videoLists})
    })

    window.electron.ipcRenderer.invoke(GET_STORE, 'currentPlayerVideo').then((currentPlayerVideo: VideoInfo) => {
      if(currentPlayerVideo) {
        dispath({ type: 'setCurrentPlayerVideo', data: currentPlayerVideo })
      }
    })
  }, [])

  useEffect(() => {
    // 监听打开文件
    window.electron.ipcRenderer.on(SELECT_VIDEO_FILE, (_, videos: VideoFile[]) => {
      const paths = videoList.map((v: VideoInfo) => v.path);
      const inexistenceVideos = videos.filter((v) => !paths.includes(v.path));
  
      const ps: Promise<VideoInfo>[] = [];
      
      inexistenceVideos.forEach((f) => {
        ps.push(getVideoInfo(f.name, f.path))
      })
  
      Promise.all(ps).then((results: any): any => {
        let videoLists = cloneDeep(videoList);
        if(results) {
          videoLists = videoList.concat(results);
        }
        
        window.electron.ipcRenderer.send(SET_STORE, 'videoList', videoLists )
        dispath({type: 'setVideoList', data: cloneDeep(videoLists)})
      })
    })
    return () => {
      window.electron.ipcRenderer.removeAllListeners(SELECT_VIDEO_FILE)
    }
  }, [state])

  return (
    <div className='video-container'>
      <Player />
      <PlayerList />
    </div>
  )
}

export default VideoPlayer
