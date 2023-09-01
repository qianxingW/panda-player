import { createContext } from 'react'
import { initialState } from './reducer'

const PlayerContext = createContext({state: initialState, dispath: value => {}})

export const Provider = PlayerContext.Provider
export const Consumer = PlayerContext.Consumer

export default PlayerContext;
