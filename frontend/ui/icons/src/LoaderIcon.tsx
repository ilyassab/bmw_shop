import React from "react";
export const LoaderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="loading"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <circle
      cx={10}
      cy={10}
      r={9}
      stroke="white"
      strokeOpacity={0.24}
      strokeWidth={2}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2V0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2Z"
      fill="white"
    />
  </svg>
);
