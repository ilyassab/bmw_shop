import React from "react";
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" {...props}>
    <rect width={20} height={20} />
    <circle
      cx={8}
      cy={8}
      r={7}
      stroke={props.color || "rgba(38, 38, 38, 1)"}
      strokeWidth={2}
    />
    <path
      d="M19 19L13 13"
      stroke={props.color || "rgba(38, 38, 38, 1)"}
      strokeWidth={2}
    />
  </svg>
);
