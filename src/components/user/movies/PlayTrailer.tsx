import { useEffect, useMemo } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";

import { CloseIcon } from "@/assets/svgs";

interface PlayTrailerType {
  videoId: string;
  onClose: () => void;
}
const PlayTrailer = ({ videoId, onClose }: PlayTrailerType) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const opts = useMemo<YouTubeProps["opts"]>(
    () => ({
      height: "450",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        // autoplay: 1,
      },
    }),
    [],
  );
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl p-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-0 right-0 cursor-pointer"
          onClick={onClose}
        >
          <CloseIcon size={40} />
        </div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default PlayTrailer;
