import { VideoInfo } from '@common/types'

/**
 * 获取本地视频信息
 * @param name 名称
 * @param path 路径
 * @returns VideoInfo
 */
export const getVideoInfo = (name: string | undefined, path: string | undefined): Promise<VideoInfo> => {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.setAttribute('src', `file:///${path}`)
    video.onloadedmetadata = (): void => {
      // 加载第一帧，防止黑屏
      video.currentTime = 1
    }

    // 视频加载到指定位置时触发
    video.onseeked = () => {
      const { duration, videoHeight, videoWidth } = video;
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');

      canvas.width = videoWidth ? videoWidth : 320;
      canvas.height = videoHeight ? videoHeight : 320;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      // 转换成base64形式
      const videoFirstImgsrc = ctx?.canvas.toDataURL('image/jpeg', 0.9) // 截取后的视频封面

      // 视频时长
      const min = Math.floor(duration / 60)
      const sec = Math.floor(duration % 60)
      
      video.remove()
      canvas.remove()

      resolve({
        name,
        path,
        poster: videoFirstImgsrc,
        duration: (min >= 10 ? min : `0${min}`) + ':' + (sec >= 10 ? sec : `0${sec}`),
      })
    }
  })
}