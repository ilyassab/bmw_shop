import React from "react";
export const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 10 16" fill="none" {...props}>
    <path
      d="M1 0.999878L8 7.99988L1 14.9999"
      stroke={props.color || "white"}
      strokeWidth={2}
    />
  </svg>
);
