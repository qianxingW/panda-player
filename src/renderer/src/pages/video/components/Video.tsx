import { useEffect, useRef } from 'react';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css'

const VideoJS = (props: { sources: any; }) => {
  const { sources } = props;
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = new Player({
        id: 'videoContainer',
        url: sources.path,
        fluid: true,
      });
    } else {
      playerRef.current.src = sources.path
    }

  }, [sources])

  return (
    <div id="videoContainer"></div>
  )
}

export default VideoJS;
