import type { IconProps } from "@tabler/icons-react";

const CloseIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "24"}
      height={props.size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

export default CloseIcon;
