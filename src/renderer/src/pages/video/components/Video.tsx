import { useEffect, useRef } from 'react';
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const VideoJS = (props: { sources: any; onReady: any}) => {
  const { sources, onReady } = props;
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = new Player({
        id: 'videoContainer',
        url: sources.path,
        width: '100%',
        height: '100%',
      });
      onReady(playerRef.current)
     
    } else {
      playerRef.current.src = sources.path
      playerRef.current.currentTime = sources.currentTime || 0
    }
  }, [sources])

  return (
    <div id="videoContainer"></div>
  )
}

export default VideoJS;
