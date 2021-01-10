import React from "react";
export const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 14 2" fill="none" {...props}>
    <rect
      y={2}
      width={2}
      height={14}
      transform="rotate(-90 0 2)"
      fill={props.color || "#BABABA"}
    />
  </svg>
);
