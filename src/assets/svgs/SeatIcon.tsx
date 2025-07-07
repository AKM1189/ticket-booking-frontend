import type { IconProps } from "@tabler/icons-react";
import React from "react";

export const SeatIcon = ({
  color,
  fill,
  size,
}: {
  color?: string;
  fill?: string;
  size?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "30"}
      height={size || "30"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-armchair"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5" />
      <path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" />
      <path d="M6 19v2" />
      <path d="M18 19v2" />
    </svg>
  );
};

export const ReverseSeatIcon = ({
  color,
  fill,
  size,
  isSelected,
}: {
  color?: string;
  fill?: string;
  size?: string;
  isSelected?: boolean;
}) => {
  return (
    <svg
      width="45"
      height="50"
      viewBox="12 18 45 50"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect
        x="17"
        y="18"
        width="33"
        height="36"
        rx="8"
        fill={fill}
        stroke={color}
        strokeWidth="1.5"
      />

      <rect
        x="18.5"
        y="52"
        width="30"
        height="8"
        rx="5"
        fill={fill}
        stroke={color}
        strokeWidth="1.5"
      />

      <rect
        x="12"
        y="24"
        width="7"
        height="30"
        rx="5"
        fill={fill}
        stroke={color}
        strokeWidth="1.5"
      />

      <rect
        x="48"
        y="24"
        width="7"
        height="30"
        rx="5"
        fill={fill}
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};
