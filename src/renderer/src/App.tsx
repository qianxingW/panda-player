import React, { useReducer } from 'react'
import PlayerContext from './store'
import { initialState, reducer } from './store/reducer'

import { TitleBar } from './components'
import VideoPlayer from './pages/video'


const App: React.FC = () => {
  const [state, dispath] = useReducer(reducer, initialState);
  console.log(state.videoList, 'sdsadsa');
  return (
    <>
      <PlayerContext.Provider
        value={{ state, dispath }}
      >
        <TitleBar />
        <VideoPlayer />
      </PlayerContext.Provider>
    </>
  )
}

export default App
