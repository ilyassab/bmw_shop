import React from "react";
export const CrossIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.00002 0H6.00002V6H0V8H6.00002V14H8.00002V8H14V6H8.00002V0Z"
      fill={props.color || "#262626"}
    />
  </svg>
);
