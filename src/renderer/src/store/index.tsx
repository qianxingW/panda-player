import { createContext } from 'react'
import { initialState } from './reducer'

const PlayerContext = createContext({state: initialState, dispath: (_v: any) => {}})

export const Provider = PlayerContext.Provider
export const Consumer = PlayerContext.Consumer

export default PlayerContext;
