import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJS = (props: { sources: any; onReady: any; }) => {
  const videoRef = useRef<any>(null);
  const playerRef = useRef<any>(null);
  const { sources, onReady } = props;

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fill: true
  }

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, {
        ...videoJsOptions,
        sources: [sources],
      }, () => {
        onReady && onReady(player);
      });
    } else {
      const player = playerRef.current;
      player.src(sources.path);      
      // player.autoplay(true);
    }
  }, [sources, videoRef]);

  useEffect(() => {
    // const player = playerRef.current;

    // return () => {
    //   if (player) {
    //     player.dispose();
    //     // playerRef.current = null;
    //   }
    // };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

export default VideoJS;
