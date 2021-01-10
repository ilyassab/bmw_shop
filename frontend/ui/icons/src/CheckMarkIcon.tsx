import React from "react";
export const CheckMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 17 13" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5 1.79936L6.04989 12.2495L0.5 6.69958L1.79936 5.40021L6.04989 9.65074L15.2006 0.5L16.5 1.79936Z"
      fill={props.color || "white"}
    />
  </svg>
);
