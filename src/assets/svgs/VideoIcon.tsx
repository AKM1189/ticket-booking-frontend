import type { IconProps } from "@tabler/icons-react";

const VideoIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "24"}
      height={props.size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-parsinta"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M21 12a9 9 0 0 0 -9 -9" opacity="0.5" />
      <path d="M10 9v6l5 -3z" />
    </svg>
  );
};

export default VideoIcon;
