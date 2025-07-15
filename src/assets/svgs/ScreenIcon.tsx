import type { IconProps } from "@tabler/icons-react";
import React from "react";

const ScreenIcon = (props: IconProps) => {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-theater"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h16" />
      <path d="M20 16v-10a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v10l4 -6c2.667 1.333 5.333 1.333 8 0l4 6z" />
    </svg>
  );
};

export default ScreenIcon;
