export interface VideoFile {
  name?: string,
  path?: string
}

export interface VideoInfo {
  name?: string,
  path?: string,
  poster?: string,
  duration?: string,
  currentTime?: number | undefined | unknown,
  lastPlayTime?: number
}

export interface initialStateType {
  openMenu: boolean,
	videoList: Array<VideoInfo> | [],
	currentPlayerVideo: VideoInfo,
}