export interface initialStateType {
  openMenu: boolean,
}
export const initialState: initialStateType = {
  openMenu: false,
}

export const reducer = (state: any, action: { type: any; data: any }) => {
  switch (action.type) {
		case 'setOpenMenu':
			return { ...state, openMenu: action.data }
		default:
			throw new Error()
	}
}