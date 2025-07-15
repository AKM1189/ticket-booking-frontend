import type { IconProps } from "@tabler/icons-react";

export const GridIcon = (props: IconProps) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />
      <rect
        x="10"
        y="3"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />
      <rect
        x="17"
        y="3"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />

      <rect
        x="3"
        y="10"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />
      <rect
        x="10"
        y="10"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />
      <rect
        x="17"
        y="10"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />

      <rect
        x="3"
        y="17"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />
      <rect
        x="10"
        y="17"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />
      <rect
        x="17"
        y="17"
        width="5"
        height="5"
        rx="1.5"
        fill={props.color || "currentColor"}
      />
    </svg>
  );
};

export const ListIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "22"}
      height={props.size || "22"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  );
};
