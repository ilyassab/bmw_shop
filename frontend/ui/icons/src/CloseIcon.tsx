import React from "react";
export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 18 18" fill="none" {...props}>
    <path
      d="M10.3846 9L18 1.38462L16.6154 0L9 7.61538L1.38462 0L0 1.38462L7.61538 9L0 16.6154L1.38462 18L9 10.3846L16.6154 18L18 16.6154L10.3846 9Z"
      fill={props.color || "#BABABA"}
    />
  </svg>
);
