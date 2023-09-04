import { VideoInfo } from "@common/types";

export interface initialStateType {
  openMenu: boolean,
	videoList: Array<VideoInfo> | [],
}
export const initialState: initialStateType = {
  openMenu: false,

	videoList: [],
}

export const reducer = (state: any, action: { type: any; data: any }) => {
  switch (action.type) {
		case 'setOpenMenu':
			return { ...state, openMenu: action.data }
		case 'setVideoList':
			return { ...state, videoList: action.data }
		default:
			throw new Error()
	}
}