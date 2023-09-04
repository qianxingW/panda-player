import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import PlayerContext from '@renderer/store'

import { cloneDeep } from 'lodash'

import PlayerList from './components/PlayerList'
import Player from './components/Player'

import { SELECT_VIDEO_FILE } from '@common/events/constants'
import { useIpcRendererOn } from '@renderer/utils/_hooks'
import { getVideoInfo } from '@renderer/utils/_info'

import '../../assets/video.scss'
import { VideoFile, VideoInfo } from '@common/types'

const VideoPlayer: React.FC = () => {
  const { state, dispath } = useContext(PlayerContext);
  const { videoList } = state;
  const [dd, setDd] = useState(false)

useEffect(() => {
  debugger
  window.electron.ipcRenderer.on(SELECT_VIDEO_FILE, (_, videos: VideoFile[]) => {
    const paths = state.videoList.map((v: VideoInfo) => v.path);
    const inexistenceVideos = videos.filter((v) => !paths.includes(v.path));

    const ps: Promise<VideoInfo>[] = [];
    
    inexistenceVideos.forEach((f) => {
      ps.push(getVideoInfo(f.name, f.path))
    })

    Promise.all(ps).then((results: any): any => {
      let videoLists = cloneDeep(state.videoList);
      if(results) {
        videoLists = videoLists.concat(results);
      }
      
      dispath({type: 'setVideoList', data: cloneDeep(videoLists)})
    })
    dispath({type: 'setOpenMenu', data: true})
  })
  return () => {
    window.electron.ipcRenderer.removeAllListeners(SELECT_VIDEO_FILE)
  }
}, [])
console.log(videoList, 'videoList');
useEffect(() => {
  dispath({type: 'setOpenMenu', data: true})
}, [dd])
  // useIpcRendererOn(SELECT_VIDEO_FILE, (_, videos: VideoFile[]) => {
  //   const paths = videoList.map((v: VideoInfo) => v.path);
  //   const inexistenceVideos = videos.filter((v) => !paths.includes(v.path));

  //   const ps: Promise<VideoInfo>[] = [];
    
  //   inexistenceVideos.forEach((f) => {
  //     ps.push(getVideoInfo(f.name, f.path))
  //   })

  //   Promise.all(ps).then((results: any): any => {
  //     let videoLists = cloneDeep(videoList);
  //     if(results) {
  //       videoLists = videoList.concat(results);
  //     }
      
  //     dispath({type: 'setVideoList', data: cloneDeep(videoLists)})
  //   })
  // })

  return (
    <div className='video-container'>
      <div onClick={() => {
        setDd(!dd)
      }}>dsadsa</div>
      <Player />
      <PlayerList />
    </div>
  )
}

export default VideoPlayer
