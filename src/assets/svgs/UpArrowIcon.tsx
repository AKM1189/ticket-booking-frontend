import type { IconProps } from "@tabler/icons-react";

const UpArrowIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill={props.color || "currentColor"}
      className="icon icon-tabler icons-tabler-filled icon-tabler-circle-chevron-up"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-4.293 5.953a1 1 0 0 0 -1.414 0l-3 3a1 1 0 0 0 0 1.414l.094 .083a1 1 0 0 0 1.32 -.083l2.293 -2.292l2.293 2.292a1 1 0 0 0 1.414 -1.414z" />
    </svg>
  );
};

export default UpArrowIcon;
