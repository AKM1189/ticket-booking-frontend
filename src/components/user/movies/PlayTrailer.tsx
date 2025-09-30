import { useEffect, useMemo, useState } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";

import { Skeleton, Text, Title } from "@mantine/core";

import "@/styles/css/skeletonStyle.css";
import { IconError404, IconX } from "@tabler/icons-react";

interface PlayTrailerType {
  videoId: string;
  onClose: () => void;
}
const PlayTrailer = ({ videoId, onClose }: PlayTrailerType) => {
  const [loading, setLoading] = useState(true);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    setLoading(false);
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
          <IconX size={40} />
        </div>
        {videoId ? (
          <Skeleton visible={loading}>
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onPlayerReady}
              className="w-full h-full"
            />
          </Skeleton>
        ) : (
          <div className="w-full h-[500px] bg-surface flex flex-col justify-center items-center">
            <IconError404 size={50} color="var(--color-muted)" />
            <Text color="var(--color-muted)">Trailer Not Available</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayTrailer;
