import React, { useMemo, useReducer } from 'react'
import PlayerContext from './store'
import { initialState, reducer } from './store/reducer'

import { TitleBar } from './components'
import VideoPlayer from './pages/video'


const App: React.FC = () => {
  const [state, dispath] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return {
      state,
      dispath
    }
  }, [state, dispath])

  return (
    <>
      <PlayerContext.Provider
        value={contextValue}
      >
        <TitleBar />
        <VideoPlayer />
      </PlayerContext.Provider>
    </>
  )
}

export default App
