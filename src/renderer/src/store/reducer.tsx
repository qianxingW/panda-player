import { initialStateType } from "@common/types";

export const initialState: initialStateType = {
  openMenu: false,

	videoList: [],
	currentPlayerVideo: {}
}

export const reducer = (state: any, action: { type: any; data: any }) => {
  switch (action.type) {
		case 'setOpenMenu':
			return { ...state, openMenu: action.data }
		case 'setVideoList':
			return { ...state, videoList: action.data }
		case 'setCurrentPlayerVideo':
			return { ...state, currentPlayerVideo: action.data }
		default:
			throw new Error()
	}
}