import React from "react";
export const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 10 16" fill="none" {...props}>
    <path
      d="M9 15L2 8.00003L9 1.00003"
      stroke={props.color || "white"}
      strokeWidth={2}
    />
  </svg>
);
