import React from "react";
export const TriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 32 12" fill="none" {...props}>
    <path d="M16 0L32 12H0L16 0Z" fill={props.color || "white"} />
  </svg>
);
